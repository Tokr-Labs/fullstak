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

export interface WithCreateInvestmentDaoResponse {
    realm: PublicKey,
    limitedPartnerGovernance: PublicKey,
    delegateMintGovernance: PublicKey,
    distributionMintGovernance: PublicKey,
    capitalSupplyTreasury: PublicKey,
    treasuryStockTreasury: PublicKey,
    distributionTreasury: PublicKey
}


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

        // if (!this.validate(config)) {
        //     throw new Error("validation failed")
        // }

        const instructions: TransactionInstruction[][] = []
        const delegateMint = Keypair.generate()
        const distributionMint = Keypair.generate()
        const lpMint = Keypair.generate()
        const name = config.name !== "" ? config.name : config.name = generateSlug(3, {format: "title"});
        const maxRaise = config.details.maxRaise > 0 ? config.details.maxRaise : 1;

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

        const addresses = await this.withCreateInvestmentDao(
            this.connection,
            this.wallet.publicKey!,
            this.wallet.publicKey!,
            instructions,
            delegateMint.publicKey,
            USDC_DEVNET,
            distributionMint.publicKey,
            lpMint.publicKey,
            GOVERNANCE_PROGRAM_ID,
            realmConfig,
            name,
            maxRaise
        )

        // await this.simulateTransactions(name, delegateMint, distributionMint, lpMint, realmConfig, maxRaise)

        const transactionSignatures = await this.sendTransactions(
            instructions,
            [[delegateMint, distributionMint, lpMint], [], [], []]
        )

        console.log(transactionSignatures);

        await this.confirmTransactions(transactionSignatures)

        await this.saveConfig(
            config,
            {
                lpMint: lpMint.publicKey,
                distributionMint: distributionMint.publicKey,
                delegateMint: delegateMint.publicKey
            },
            addresses
        )

        console.log("Complete.");

    }

    /**
     * Simulate the deposit liquidity transaction
     */
    async simulate(): Promise<SimulatedTransactionResponse> {

        return Promise.reject("not implemented")

    }

    // ============================================================
    // === Private API ============================================
    // ============================================================

    private validate(config): boolean {
        return !!(
            isString(config.name) &&
            isString(config.governanceProgramId) &&
            isString(config.usdcMint) &&
            isNumber(config.governance.voteThresholdPercentage) &&
            isNumber(config.governance.minCommunityTokensToCreateProposal) &&
            isNumber(config.governance.minInstructionHoldUpTime) &&
            isNumber(config.governance.maxVotingTime) &&
            isNumber(config.governance.voteTipping) &&
            isNumber(config.governance.proposalCoolOffTime) &&
            isNumber(config.governance.minCouncilTokensToCreateProposal)
        );
    }

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

        for (let i = 0; i < instructionSet.length; i++) {

            const instructions = instructionSet[i]
            const signers = signerSet[i]

            if (instructions.length === 0) {
                continue
            }

            const transaction = new Transaction({recentBlockhash: block.blockhash})
            transaction.feePayer = this.wallet.publicKey!
            transaction.add(...instructions);

            if (signers.length > 0) {
                transaction.partialSign(...signers)
            }

            transactions.push(transaction)

        }

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

    private async simulateTransactions(name: string, delegateMint: Keypair, distributionMint: Keypair, lpMint: Keypair, realmConfig: GovernanceConfig, maxRaise: number): Promise<void> {

        console.log("Simulating transactions...")

        const simulatedSigner = Keypair.generate()

        const instructionSet: TransactionInstruction[][] = []
        const signerSet: Keypair[][] = [[delegateMint, distributionMint, lpMint, simulatedSigner], [simulatedSigner], [simulatedSigner], [simulatedSigner]]
        const transactions: Transaction[] = []

        await this.withCreateInvestmentDao(
            this.connection,
            simulatedSigner.publicKey,
            simulatedSigner.publicKey,
            instructionSet,
            delegateMint.publicKey,
            USDC_DEVNET,
            distributionMint.publicKey,
            lpMint.publicKey,
            GOVERNANCE_PROGRAM_ID,
            realmConfig,
            name,
            maxRaise
        )

        const block = await this.connection.getLatestBlockhash(this.connection.commitment)

        for (let i = 0; i < instructionSet.length; i++) {

            const instructions = instructionSet[i]
            const signers = signerSet[i]

            if (instructions.length === 0) {
                continue
            }

            const transaction = new Transaction({recentBlockhash: block.blockhash})
            transaction.feePayer = simulatedSigner.publicKey
            transaction.add(...instructions);

            if (signers.length > 0) {
                transaction.partialSign(...signers)
            }

            transactions.push(transaction)

        }

        const simulatedTransactionPromises = transactions.map((transaction, index) => {
            const signers = signerSet[index].length > 0 ? signerSet[index] : [];
            return this.connection.simulateTransaction(transaction, [...signers, simulatedSigner])
        })

        await Promise.all(simulatedTransactionPromises)

        console.log("Simulation complete.");

    }

    private async saveConfig(config, mints, addresses): Promise<void> {

        console.log("Saving config...")

        config["addresses"] = {
            "realm": addresses.realm.toBase58(),
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

        return Promise.resolve()

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


    async withCreateInvestmentDao(
        connection: Connection,
        owner: PublicKey,
        delegate: PublicKey,
        instructionSets: TransactionInstruction[][],
        delegateMint: PublicKey,
        usdcMint: PublicKey,
        distributionMint: PublicKey,
        lpMint: PublicKey,
        governanceProgramId: PublicKey,
        realmConfig: GovernanceConfig,
        name: string,
        lpTokenSupply: number
    ): Promise<WithCreateInvestmentDaoResponse> {

        const mintInstructions: TransactionInstruction[] = [];
        const delegateInstructions: TransactionInstruction[] = [];
        const realmInstructions: TransactionInstruction[] = [];
        const treasuryInstructions: TransactionInstruction[] = [];

        instructionSets.push(
            mintInstructions,
            delegateInstructions,
            realmInstructions,
            treasuryInstructions
        )

        // ============================================================
        // === Mint Instructions ======================================
        // ============================================================

        const mintRentExempt = await connection.getMinimumBalanceForRentExemption(
            MintLayout.span
        )

        // create lp token account for mint

        mintInstructions.push(
            SystemProgram.createAccount({
                fromPubkey: owner,
                newAccountPubkey: lpMint,
                lamports: mintRentExempt,
                space: MintLayout.span,
                programId: TOKEN_PROGRAM_ID
            })
        )

        // create lp mint

        mintInstructions.push(
            createInitializeMintInstruction(
                lpMint,
                0,
                owner,
                null
            )
        )

        // create delegate account for mint

        mintInstructions.push(
            SystemProgram.createAccount({
                fromPubkey: owner,
                newAccountPubkey: delegateMint,
                lamports: mintRentExempt,
                space: MintLayout.span,
                programId: TOKEN_PROGRAM_ID
            })
        )

        // create delegate mint

        mintInstructions.push(
            createInitializeMintInstruction(
                delegateMint,
                0,
                owner,
                null
            )
        )

        // create distribution account for mint

        mintInstructions.push(
            SystemProgram.createAccount({
                fromPubkey: owner,
                newAccountPubkey: distributionMint,
                lamports: mintRentExempt,
                space: MintLayout.span,
                programId: TOKEN_PROGRAM_ID
            })
        )

        // create distribution mint

        mintInstructions.push(
            createInitializeMintInstruction(
                distributionMint,
                0,
                owner,
                null
            )
        )

        // ============================================================
        // === Delegate Instructions ==================================
        // ============================================================

        // get the pubkey of what will be the delegates ata for the delegate mint

        const delegateAta = await getAssociatedTokenAddress(
            delegateMint,
            delegate
        )

        // create the associated token account for the delegate

        delegateInstructions.push(
            createAssociatedTokenAccountInstruction(
                owner,
                delegateAta,
                delegate,
                delegateMint,
                TOKEN_PROGRAM_ID,
                ASSOCIATED_TOKEN_PROGRAM_ID
            )
        )

        // mint 1 delegate token to the delegate

        delegateInstructions.push(
            createMintToInstruction(
                delegateMint,
                delegateAta,
                owner,
                1
            )
        )

        // ============================================================
        // === Realm Instructions =====================================
        // ============================================================

        // create the realm

        const realmAddress = await withCreateRealm(
            realmInstructions,
            governanceProgramId,
            2,
            name,
            owner,
            lpMint,
            owner,
            delegateMint,
            MintMaxVoteWeightSource.FULL_SUPPLY_FRACTION,
            new BN(LAMPORTS_PER_SOL * 1000000)
        )

        const [tokenOwnerRecordAddress] = await PublicKey.findProgramAddress(
            [
                governanceProgramId.toBuffer(),
                realmAddress.toBuffer(),
                delegate.toBuffer(),
                owner.toBuffer(),
            ],
            governanceProgramId,
        );

        // create the lp governance for the realm

        const limitedPartnerGovernancePublicKey = await withCreateGovernance(
            realmInstructions,
            governanceProgramId,
            2,
            realmAddress,
            undefined,
            realmConfig,
            tokenOwnerRecordAddress,
            owner,
            owner
        )

        // create the delegate mint governance for the realm

        const delegateMintGovernancePublicKey = await withCreateMintGovernance(
            realmInstructions,
            governanceProgramId,
            2,  // why does program 2 work and not program 1
            realmAddress,
            delegateMint,
            realmConfig,
            !!owner,
            owner,
            tokenOwnerRecordAddress,
            owner,
            owner
        )

        // create the distribution mint governance for the real

        const distributionMintGovernancePublicKey = await withCreateMintGovernance(
            realmInstructions,
            governanceProgramId,
            2,  // why does program 2 work and not program 1
            realmAddress,
            distributionMint,
            realmConfig,
            !!owner,
            owner,
            tokenOwnerRecordAddress,
            owner,
            owner
        )

        // transfer authority of the realm from the owner to the lp governance

        withSetRealmAuthority(
            realmInstructions,
            governanceProgramId,
            2,
            realmAddress,
            owner,
            limitedPartnerGovernancePublicKey,
            1
        )

        // deposit the delegate's delegate token into the realm for them

        /*
            instructions: TransactionInstruction[],
            programId: PublicKey,
            programVersion: number,
            realm: PublicKey,
            governingTokenSource: PublicKey,
            governingTokenMint: PublicKey,
            governingTokenOwner: PublicKey,
            transferAuthority: PublicKey,
            payer: PublicKey,
            amount: BN,
        */

        await withDepositGoverningTokens(
            realmInstructions,
            governanceProgramId,
            2, // why does program 2 work and not program 1
            realmAddress,
            delegateAta,
            delegateMint,
            delegate,
            delegate,
            delegate,
            new BN(1)
        )

        // ============================================================
        // === Treasury Instructions ==================================
        // ============================================================

        // get pk of what the usdc treasury for the lp governance will be

        const capitalSupplyTreasuryPubkey = await getAssociatedTokenAddress(
            usdcMint,
            limitedPartnerGovernancePublicKey,
            true,
        )

        // create the ata for the lp governance usdc mint

        treasuryInstructions.push(
            createAssociatedTokenAccountInstruction(
                owner,
                capitalSupplyTreasuryPubkey,
                limitedPartnerGovernancePublicKey,
                usdcMint
            )
        )

        // get the reference for ata of the lp token mint

        const treasuryStockTreasuryPubkey = await getAssociatedTokenAddress(
            lpMint,
            delegateMintGovernancePublicKey,
            true,
        )

        // create the ata for the lp token mint and set the owner as the authority oif the delegate governance

        treasuryInstructions.push(
            createAssociatedTokenAccountInstruction(
                owner,
                treasuryStockTreasuryPubkey,
                delegateMintGovernancePublicKey,
                lpMint
            )
        )

        // create ata for the distribution usdc mint

        const distributionTreasuryPubkey = await getAssociatedTokenAddress(
            usdcMint,
            distributionMintGovernancePublicKey,
            true,
        )

        // create the usdc treasury for usdc distributions

        treasuryInstructions.push(
            createAssociatedTokenAccountInstruction(
                owner,
                distributionTreasuryPubkey,
                distributionMintGovernancePublicKey,
                usdcMint
            )
        )

        // mint the initial supply of lp tokens to the owner

        treasuryInstructions.push(
            createMintToInstruction(
                lpMint, // mint
                treasuryStockTreasuryPubkey, // destination
                owner, // authority
                lpTokenSupply // amount
            )
        )

        // set the mint authority to null so the lp token count is fixed

        treasuryInstructions.push(
            createSetAuthorityInstruction(
                lpMint,
                owner,
                AuthorityType.MintTokens,
                null
            )
        )

        return {
            realm: realmAddress,
            limitedPartnerGovernance: limitedPartnerGovernancePublicKey,
            delegateMintGovernance: delegateMintGovernancePublicKey,
            distributionMintGovernance: distributionMintGovernancePublicKey,
            capitalSupplyTreasury: capitalSupplyTreasuryPubkey,
            treasuryStockTreasury: treasuryStockTreasuryPubkey,
            distributionTreasury: distributionTreasuryPubkey
        }

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

