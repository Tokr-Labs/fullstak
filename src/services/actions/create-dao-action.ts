import {
    Connection,
    Keypair, LAMPORTS_PER_SOL, PublicKey, RpcResponseAndContext, SignatureStatus,
    SimulatedTransactionResponse, SystemProgram,
    Transaction,
    TransactionInstruction,
    TransactionSignature
} from "@solana/web3.js";
import {WalletContextState} from "@solana/wallet-adapter-react";
import {ActionProtocol} from "../../models/action-protocol";
import {
    GOVERNANCE_PROGRAM_ID,
    GOVERNANCE_PROGRAM_LOCALNET_ID,
    USDC_DEVNET,
    USDC_LOCALNET
} from "../../models/constants";
import {isNumber, isString} from "underscore";
import {
    GovernanceConfig, MintMaxVoteWeightSource,
    VoteThresholdPercentage, withCreateGovernance, withCreateMintGovernance, withCreateRealm,
    withDepositGoverningTokens,
    withSetRealmAuthority
} from "@tokr-labs/governance";
import BN from "bn.js";
import {generateSlug} from "random-word-slugs";
import {sleep} from "@project-serum/common";
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    AuthorityType,
    createAssociatedTokenAccountInstruction, createInitializeMintInstruction,
    createMintToInstruction,
    createSetAuthorityInstruction, getAssociatedTokenAddress, MintLayout, TOKEN_PROGRAM_ID
} from "@solana/spl-token";

export class CreateDaoAction implements ActionProtocol {

    // ============================================================
    // === Internal API ===========================================
    // ============================================================

    /**
     * Constructor
     * @param connection
     * @param wallet
     */
    constructor(
        private connection: Connection,
        private wallet: WalletContextState
    ) {
    }

    /**
     * Create a dao based on the config passed
     * @param config json object
     */
    async execute(config): Promise<TransactionSignature | void> {

        if (!this.validate(config)) {
            throw new Error("validation failed")
        }

        console.log("Executing create dao action...")

        const councilMint = Keypair.generate()
        const communityMint = Keypair.generate()

        const mintInstructions: TransactionInstruction[] = [];
        const delegateInstructions: TransactionInstruction[] = [];
        const realmInstructions: TransactionInstruction[] = [];
        const treasuryInstructions: TransactionInstruction[] = [];

        const instructionSet: TransactionInstruction[][] = [
            mintInstructions,
            delegateInstructions,
            realmInstructions,
            treasuryInstructions
        ]

        const daoAddresses = await this.createInstructions(
            instructionSet,
            this.wallet.publicKey!,
            this.wallet.publicKey!,
            communityMint.publicKey,
            councilMint.publicKey,
            config
        )

        const transactionSignatures = await this.sendTransactions(
            instructionSet,
            [[councilMint, communityMint], [], [], []]
        )

        console.log("Transactions:");
        console.log(transactionSignatures);

        // await this.saveConfig(
        //     config,
        //     {
        //         lpMint: lpMint.publicKey,
        //         distributionMint: distributionMint.publicKey,
        //         delegateMint: delegateMint.publicKey
        //     },
        //     daoAddresses
        // )

        console.log("Complete.");

    }

    /**
     * Simulate the deposit liquidity transaction
     */
    async simulate(
        name: string,
        delegateMint: Keypair,
        distributionMint: Keypair,
        lpMint: Keypair,
        realmConfig: GovernanceConfig,
        maxRaise: number
    ): Promise<SimulatedTransactionResponse | void> {

        //
        //     console.log("Simulating transactions...")
        //
        //     const simulatedSigner = Keypair.generate()
        //
        //     const instructionSet: TransactionInstruction[][] = []
        //     const signerSet: Keypair[][] = [[delegateMint, distributionMint, lpMint, simulatedSigner], [simulatedSigner], [simulatedSigner], [simulatedSigner]]
        //     const transactions: Transaction[] = []
        //
        //     // @TODO - create instructions
        //
        //     const block = await this.connection.getLatestBlockhash(this.connection.commitment)
        //
        //     for (let i = 0; i < instructionSet.length; i++) {
        //
        //         const instructions = instructionSet[i]
        //         const signers = signerSet[i]
        //
        //         if (instructions.length === 0) {
        //             continue
        //         }
        //
        //         const transaction = new Transaction({recentBlockhash: block.blockhash})
        //         transaction.feePayer = simulatedSigner.publicKey
        //         transaction.add(...instructions);
        //
        //         if (signers.length > 0) {
        //             transaction.partialSign(...signers)
        //         }
        //
        //         transactions.push(transaction)
        //
        //     }
        //
        //     const simulatedTransactionPromises = transactions.map((transaction, index) => {
        //         const signers = signerSet[index].length > 0 ? signerSet[index] : [];
        //         return this.connection.simulateTransaction(transaction, [...signers, simulatedSigner])
        //     })
        //
        //     await Promise.all(simulatedTransactionPromises)
        //
        //     console.log("Simulation complete.");
        //

    }

    // ============================================================
    // === Private API ============================================
    // ============================================================

    // Private Methods

    private async sendTransactions(
        instructionSet: TransactionInstruction[][],
        signerSet: Keypair[][]
    ): Promise<TransactionSignature[]> {

        if (this.wallet === undefined || !this.wallet.connected) {
            throw new Error("Wallet not connected")
        }

        console.log("Sending transactions...")

        const block = await this.connection.getLatestBlockhash(this.connection.commitment)

        const transactions: Transaction[] = []

        let fees = 0;

        for (let i = 0; i < instructionSet.length; i++) {

            const instructions = instructionSet[i]
            const signers = signerSet[i]

            if (instructions.length === 0) {
                continue
            }

            const transaction = new Transaction({recentBlockhash: block.blockhash})
            transaction.feePayer = this.wallet.publicKey!
            transaction.add(...instructions);

            const estimatedFee = await transaction.getEstimatedFee(this.connection);

            fees += estimatedFee / LAMPORTS_PER_SOL;

            if (signers.length > 0) {
                transaction.partialSign(...signers)
            }

            transactions.push(transaction)

        }

        console.log(fees)

        const signedTransactions = await this.wallet!.signAllTransactions!(transactions)

        const signatures = await Promise.all(
            signedTransactions.map(signedTransaction => {

                const rawTransaction = signedTransaction.serialize()

                return this.connection.sendRawTransaction(
                    rawTransaction,
                    {
                        skipPreflight: true,
                    }
                )

            })
        )

        console.log("Transactions sent.")

        return signatures;

    }

    private async confirmTransactions(signatures: TransactionSignature[]): Promise<void> {

        console.log("Confirming transactions...")

        let signatureStatuses: RpcResponseAndContext<(SignatureStatus | null)[]> = {
            context: {slot: 0},
            value: []
        }

        let confirmed = false

        while (!confirmed) {

            signatureStatuses = await this.connection.getSignatureStatuses(signatures)

            if (signatureStatuses.value[0] !== null) {
                console.log("continue")
                confirmed = true
            }

            await sleep(500)

        }

        console.log(signatureStatuses);

        signatureStatuses.value.forEach(status => {
            if (status?.err) {
                throw new Error("Something went wrong. Please try again.")
            }
        })

        console.log("Transactions confirmed.")

        return Promise.resolve()

    }

    /**
     *
     * @param instructionSet
     * @param payer
     * @param delegate
     * @param lpMint
     * @param delegateMint
     * @param distributionMint
     * @param config
     * @private
     */
    private async createInstructions(
        instructionSet: TransactionInstruction[][],
        payer: PublicKey,
        delegate: PublicKey,
        lpMint: PublicKey,
        delegateMint: PublicKey,
        // distributionMint: PublicKey,
        config
    ): Promise<{
        realmAddress: PublicKey,
        communityMintGovernance: PublicKey,
        councilMintGovernance: PublicKey,
        capitalSupplyTreasury: PublicKey,
        treasuryStockTreasury: PublicKey
    }> {

        console.log("Creating instructions...")

        const maxRaise = config.details.maxRaise > 0 ? config.details.maxRaise : 1;

        console.log("Creating mint instructions...")

        await this.createMintInstructions(instructionSet[0], this.wallet.publicKey!, lpMint)
        await this.createMintInstructions(instructionSet[0], this.wallet.publicKey!, delegateMint)
        // await this.createMintInstructions(instructionSet[0], this.wallet.publicKey!, distributionMint)

        await this.createDelegateInstructions(
            instructionSet[1],
            payer,
            delegateMint,
            delegate
        )

        const {
            realmAddress,
            councilMintGovernance,
            communityMintGovernance,
        } = await this.createRealmInstructions(
            instructionSet[2],
            GOVERNANCE_PROGRAM_ID,
            payer,
            delegate,
            lpMint,
            delegateMint,
            // distributionMint,
            config
        )

        const {
            capitalSupplyTreasury,
            treasuryStockTreasury,
            // distributionTreasury
        } = await this.createTreasuryInstructions(
            instructionSet[3],
            lpMint,
            communityMintGovernance,
            councilMintGovernance,
            // distributionMintGovernance,
            maxRaise
        )

        return {
            realmAddress,
            councilMintGovernance,
            communityMintGovernance,
            treasuryStockTreasury,
            capitalSupplyTreasury
        }

    }

    /**
     *
     * @param instructions
     * @param payer
     * @param mint
     * @private
     */
    private async createMintInstructions(
        instructions: TransactionInstruction[],
        payer: PublicKey,
        mint: PublicKey
    ): Promise<void> {

        const rent = await this.connection.getMinimumBalanceForRentExemption(
            MintLayout.span
        )

        // create lp token account for mint

        instructions.push(
            SystemProgram.createAccount({
                fromPubkey: payer,
                newAccountPubkey: mint,
                lamports: rent,
                space: MintLayout.span,
                programId: TOKEN_PROGRAM_ID
            })
        )

        // create lp mint

        instructions.push(
            createInitializeMintInstruction(
                mint,
                0,
                payer,
                null
            )
        )

    }

    /**
     *
     * @param instructions
     * @param payer
     * @param delegateMint
     * @param delegate
     * @private
     */
    private async createDelegateInstructions(
        instructions: TransactionInstruction[],
        payer: PublicKey,
        delegateMint: PublicKey,
        delegate: PublicKey
    ): Promise<void> {

        const delegateAta = await getAssociatedTokenAddress(
            delegateMint,
            delegate
        )

        // create the associated token account for the delegate

        instructions.push(
            createAssociatedTokenAccountInstruction(
                payer,
                delegateAta,
                delegate,
                delegateMint,
                TOKEN_PROGRAM_ID,
                ASSOCIATED_TOKEN_PROGRAM_ID
            )
        )

        // mint 1 delegate token to the delegate

        instructions.push(
            createMintToInstruction(
                delegateMint,
                delegateAta,
                payer,
                1
            )
        )

    }

    /**
     *
     * @param instructions
     * @param governanceProgramId
     * @param payer
     * @param delegate
     * @param lpMint
     * @param delegateMint
     * @param distributionMint
     * @param config
     * @private
     */
    private async createRealmInstructions(
        instructions: TransactionInstruction[],
        governanceProgramId: PublicKey,
        payer: PublicKey,
        delegate: PublicKey,
        communityMint: PublicKey,
        councilMint: PublicKey,
        // distributionMint: PublicKey,
        config
    ): Promise<{
        realmAddress: PublicKey,
        communityMintGovernance: PublicKey,
        councilMintGovernance: PublicKey
    }> {

        console.log("Create realm instructions...")

        const name = config.name !== "" ? config.name : config.name = generateSlug(3, {format: "title"});

        const realmConfig = new GovernanceConfig({
            voteThresholdPercentage: new VoteThresholdPercentage({
                value: config.governance.voteThresholdPercentage,
            }),
            minCommunityTokensToCreateProposal: new BN(config.governance.minCommunityTokensToCreateProposal),
            minInstructionHoldUpTime: config.governance.minInstructionHoldUpTime,
            maxVotingTime: config.governance.maxVotingTime,
            voteTipping: config.governance.voteTipping,
            proposalCoolOffTime: config.governance.proposalCoolOffTime,
            minCouncilTokensToCreateProposal: new BN(config.governance.minCouncilTokensToCreateProposal),
        });

        const delegateAta = await getAssociatedTokenAddress(
            councilMint,
            delegate
        )

        const realmAddress = await withCreateRealm(
            instructions,
            governanceProgramId,
            2,
            name,
            payer,
            communityMint,
            payer,
            councilMint,
            MintMaxVoteWeightSource.FULL_SUPPLY_FRACTION,
            new BN(LAMPORTS_PER_SOL * 1000000)
        )

        const [tokenOwnerRecordAddress] = await PublicKey.findProgramAddress(
            [
                governanceProgramId.toBuffer(),
                realmAddress.toBuffer(),
                delegate.toBuffer(),
                payer.toBuffer(),
            ],
            governanceProgramId,
        );

        // create the lp governance for the realm

        // const limitedPartnerGovernance = await withCreateGovernance(
        //     instructions,
        //     governanceProgramId,
        //     2,
        //     realmAddress,
        //     undefined,
        //     realmConfig,
        //     tokenOwnerRecordAddress,
        //     payer,
        //     payer
        // )

        // create the delegate mint governance for the realm

        const councilMintGovernance = await withCreateMintGovernance(
            instructions,
            governanceProgramId,
            2,  // why does program 2 work and not program 1
            realmAddress,
            councilMint,
            realmConfig,
            !!payer,
            payer,
            tokenOwnerRecordAddress,
            payer,
            payer
        )

        // create the distribution mint governance for the real

        const communityMintGovernance = await withCreateMintGovernance(
            instructions,
            governanceProgramId,
            2,  // why does program 2 work and not program 1
            realmAddress,
            communityMint,
            realmConfig,
            !!payer,
            payer,
            tokenOwnerRecordAddress,
            payer,
            payer
        )

        // const distributionMintGovernance = await withCreateMintGovernance(
        //     instructions,
        //     governanceProgramId,
        //     2,  // why does program 2 work and not program 1
        //     realmAddress,
        //     distributionMint,
        //     realmConfig,
        //     !!payer,
        //     payer,
        //     tokenOwnerRecordAddress,
        //     payer,
        //     payer
        // )

        // transfer authority of the realm from the owner to the lp governance

        withSetRealmAuthority(
            instructions,
            governanceProgramId,
            2,
            realmAddress,
            payer,
            communityMintGovernance,
            1
        )

        // deposit the delegate's delegate token into the realm for them

        if (payer === delegate) {

            await withDepositGoverningTokens(
                instructions,
                governanceProgramId,
                2, // why does program 2 work and not program 1
                realmAddress,
                delegateAta,
                councilMint,
                delegate,
                delegate,
                delegate,
                new BN(1)
            )

        }

        return {
            realmAddress,
            communityMintGovernance,
            councilMintGovernance,
            // distributionMintGovernance
        }

    }

    /**
     *
     * @param instructions
     * @param lpMint
     * @param limitedPartnerGovernance
     * @param delegateMintGovernance
     * @param distributionMintGovernance
     * @param maxRaise
     * @private
     */
    private async createTreasuryInstructions(
        instructions: TransactionInstruction[],
        communityMint: PublicKey,
        councilMintGovernance: PublicKey,
        communityMintGovernance: PublicKey,
        // distributionMintGovernance: PublicKey,
        maxRaise: number
    ): Promise<{
        capitalSupplyTreasury: PublicKey,
        treasuryStockTreasury: PublicKey,
        // distributionTreasury: PublicKey
    }> {

        console.log("Create treasury instructions...")

        const capitalSupplyTreasury = await this.createTreasuryAccountInstructions(
            instructions,
            this.wallet.publicKey!,
            USDC_DEVNET,
            communityMintGovernance
        )

        const treasuryStockTreasury = await this.createTreasuryAccountInstructions(
            instructions,
            this.wallet.publicKey!,
            communityMint,
            councilMintGovernance
        )

        // const distributionTreasury = await this.createTreasuryAccountInstructions(
        //     instructions,
        //     this.wallet.publicKey!,
        //     USDC_DEVNET,
        //     distributionMintGovernance
        // )

        instructions.push(
            createMintToInstruction(
                communityMint, // mint
                treasuryStockTreasury, // destination
                this.wallet.publicKey!, // authority
                maxRaise // amount
            )
        )

        instructions.push(
            createSetAuthorityInstruction(
                communityMint,
                this.wallet.publicKey!,
                AuthorityType.MintTokens,
                null
            )
        )

        return {
            capitalSupplyTreasury,
            treasuryStockTreasury,
            // distributionTreasury
        }

    }

    /**
     *
     * @param instructions
     * @param payer
     * @param mint
     * @param governance
     * @private
     */
    private async createTreasuryAccountInstructions(
        instructions: TransactionInstruction[],
        payer: PublicKey,
        mint: PublicKey,
        governance: PublicKey
    ): Promise<PublicKey> {

        const treasuryAta = await getAssociatedTokenAddress(
            mint,
            governance,
            true,
        )

        instructions.push(
            createAssociatedTokenAccountInstruction(
                payer,
                treasuryAta,
                governance,
                mint
            )
        )

        return treasuryAta
    }

    /**
     *
     * @param config
     * @private
     */
    private validate(config): boolean {

        return true

        // return !!(
        //     isString(config.name) &&
        //     isString(config.governanceProgramId) &&
        //     isString(config.usdcMint) &&
        //     isNumber(config.governance.voteThresholdPercentage) &&
        //     isNumber(config.governance.minCommunityTokensToCreateProposal) &&
        //     isNumber(config.governance.minInstructionHoldUpTime) &&
        //     isNumber(config.governance.maxVotingTime) &&
        //     isNumber(config.governance.voteTipping) &&
        //     isNumber(config.governance.proposalCoolOffTime) &&
        //     isNumber(config.governance.minCouncilTokensToCreateProposal)
        // );
    }

    /**
     *
     * @param config
     * @param mints
     * @param addresses
     * @private
     */
    private async saveConfig(
        config,
        mints,
        addresses
    ): Promise<void> {

        console.log("Saving config...")

        config["addresses"] = {
            "realm": addresses.realmAddress.toBase58(),
            "governance": {
                "lp_token_governance": addresses.limitedPartnerGovernance.toBase58(),
                "distribution_token_mint_governance": addresses.distributionMintGovernance.toBase58(),
                "delegate_token_mint_governance": addresses.delegateMintGovernance.toBase58()
            },
            "mint": {
                "lp_token_mint": mints.lpMint.toBase58(),
                "distribution_token_mint": mints.distributionMint.toBase58(),
                "delegate_token_mint": mints.delegateMint.toBase58()
            },
            "treasury": {
                "capital_supply": addresses.capitalSupplyTreasury.toBase58(),
                "distributions": addresses.distributionTreasury.toBase58(),
                "stock_supply": addresses.treasuryStockTreasury.toBase58()
            }
        }

        console.log("Save config complete.")

        console.log(config);

        return Promise.resolve()

    }

    // /////////////////////////////////////////
    // private async sendTransactions(
    //     connection: Connection,
    //     wallet: WalletSigner,
    //     instructionSet: TransactionInstruction[][],
    //     signersSet: Keypair[][],
    //     sequenceType: SequenceType = SequenceType.Parallel,
    //     commitment: Commitment = 'singleGossip',
    //     successCallback: (txid: string, ind: number) => void = (_txid, _ind) => null,
    //     failCallback: (reason: string, ind: number) => boolean = (_txid, _ind) =>
    //         false,
    //     block?: {
    //         blockhash: string
    //         feeCalculator: FeeCalculator
    //     }
    // ): Promise<number> {
    //     if (!wallet.publicKey) throw new Error('Wallet not connected!')
    //
    //     const unsignedTxns: Transaction[] = []
    //
    //     if (!block) {
    //         block = await connection.getRecentBlockhash(commitment)
    //     }
    //
    //     for (let i = 0; i < instructionSet.length; i++) {
    //         const instructions = instructionSet[i]
    //         const signers = signersSet[i]
    //
    //         if (instructions.length === 0) {
    //             continue
    //         }
    //
    //         const transaction = new Transaction()
    //         instructions.forEach((instruction) => transaction.add(instruction))
    //         transaction.recentBlockhash = block.blockhash
    //         transaction.setSigners(
    //             // fee payed by the wallet owner
    //             wallet.publicKey,
    //             ...signers.map((s) => s.publicKey)
    //         )
    //
    //         if (signers.length > 0) {
    //             transaction.partialSign(...signers)
    //         }
    //
    //         unsignedTxns.push(transaction)
    //     }
    //
    //     const signedTxns = await wallet.signAllTransactions(unsignedTxns)
    //
    //     const pendingTxns: Promise<{ txid: string; slot: number }>[] = []
    //
    //     const breakEarlyObject = {breakEarly: false}
    //     for (let i = 0; i < signedTxns.length; i++) {
    //         const signedTxnPromise = sendSignedTransaction({
    //             connection,
    //             signedTransaction: signedTxns[i],
    //         })
    //
    //         signedTxnPromise
    //             .then(({txid}) => {
    //                 successCallback(txid, i)
    //             })
    //             .catch((_reason) => {
    //                 // @ts-ignore
    //                 failCallback(signedTxns[i], i)
    //                 if (sequenceType == SequenceType.StopOnFailure) {
    //                     breakEarlyObject.breakEarly = true
    //                 }
    //             })
    //
    //         if (sequenceType != SequenceType.Parallel) {
    //             await signedTxnPromise
    //             if (breakEarlyObject.breakEarly) {
    //                 return i // REturn the txn we failed on by index
    //             }
    //         } else {
    //             pendingTxns.push(signedTxnPromise)
    //         }
    //     }
    //
    //     if (sequenceType != SequenceType.Parallel) {
    //         await Promise.all(pendingTxns)
    //     }
    //
    //     return signedTxns.length
    // }
    //
    // private async sendSignedTransaction(
    //     signedTransaction,
    //     connection,
    //     timeout = 30000,
    // ): Promise<{ txid: string; slot: number }> {
    //     const rawTransaction = signedTransaction.serialize()
    //     const startTime = getUnixTs()
    //     let slot = 0
    //     const txid: TransactionSignature = await connection.sendRawTransaction(
    //         rawTransaction,
    //         {
    //             skipPreflight: true,
    //         }
    //     )
    //
    //     console.log('Started awaiting confirmation for', txid)
    //
    //     let done = false
    //     ;(async () => {
    //         while (!done && getUnixTs() - startTime < timeout) {
    //             connection.sendRawTransaction(rawTransaction, {
    //                 skipPreflight: true,
    //             })
    //             await sleep(500)
    //         }
    //     })()
    //     try {
    //         const confirmation = await awaitTransactionSignatureConfirmation(
    //             txid,
    //             timeout,
    //             connection,
    //             'recent',
    //             true
    //         )
    //
    //         if (confirmation.err) {
    //             console.error(confirmation.err)
    //             throw new Error('Transaction failed: Custom instruction error')
    //         }
    //
    //         slot = confirmation?.slot || 0
    //     } catch (err) {
    //         if (err.timeout) {
    //             throw new Error('Timed out awaiting confirmation on transaction')
    //         }
    //         let simulateResult: SimulatedTransactionResponse | null = null
    //         try {
    //             simulateResult = (
    //                 await simulateTransaction(connection, signedTransaction, 'single')
    //             ).value
    //         } catch (e) {
    //             //
    //         }
    //         if (simulateResult && simulateResult.err) {
    //             if (simulateResult.logs) {
    //                 for (let i = simulateResult.logs.length - 1; i >= 0; --i) {
    //                     const line = simulateResult.logs[i]
    //                     if (line.startsWith('Program log: ')) {
    //                         throw new Error(
    //                             'Transaction failed: ' + line.slice('Program log: '.length)
    //                         )
    //                     }
    //                 }
    //             }
    //             throw new Error(JSON.stringify(simulateResult.err))
    //         }
    //         // throw new Error('Transaction failed');
    //     } finally {
    //         done = true
    //     }
    //
    //     console.log('Latency', txid, getUnixTs() - startTime)
    //     return {txid, slot}
    // }

    // export enum SequenceType {
//     Sequential,
//     Parallel,
//     StopOnFailure,
// }


}


