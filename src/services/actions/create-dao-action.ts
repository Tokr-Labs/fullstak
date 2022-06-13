import {
    Blockhash,
    BlockheightBasedTransactionConfirmationStrategy, Commitment,
    Connection,
    Keypair, LAMPORTS_PER_SOL, PublicKey, RpcResponseAndContext, SignatureResult, SignatureStatus,
    SimulatedTransactionResponse, SystemProgram,
    Transaction, TransactionError,
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
        const lpMint = Keypair.generate()

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

        const addresses = await this.createInstructions(
            instructionSet,
            this.wallet.publicKey!,
            this.wallet.publicKey!,
            councilMint.publicKey,
            lpMint.publicKey,
            config
        )

        const transactionSignatures = await this.sendTransactions(
            instructionSet,
            [[councilMint, lpMint], [], [], []]
        )

        console.log("Transactions:");
        console.log(transactionSignatures);

        console.log("Addresses:")
        console.log("realmAddress", addresses.realmAddress?.toBase58() ?? "unknown");
        console.log("councilGovernance", addresses.councilGovernance?.toBase58() ?? "unknown");
        console.log("usdcTreasury", addresses.usdcTreasury?.toBase58() ?? "unknown");
        console.log("lpGovernance", addresses.lpGovernance?.toBase58() ?? "unknown");
        console.log("lpStockTreasury", addresses.lpStockTreasury?.toBase58() ?? "unknown");

    }

    /**
     * Simulate the deposit liquidity transaction
     */
    async simulate(): Promise<SimulatedTransactionResponse | void> {

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

    /**
     *
     * @param instructionSet
     * @param signerSet
     * @private
     */
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

        const txsigs: TransactionSignature[] = [];

        await signedTransactions.reduce(
            (p, tx) => p.then(() => {
                return this.sendSignedTransaction(tx).then(value => txsigs.push(value))
            }),
            Promise.resolve()
        )

        console.log("Transactions sent.")

        return txsigs;

    }

    /**
     *
     * @param transaction
     * @private
     */
    private async sendSignedTransaction(transaction: Transaction): Promise<TransactionSignature> {

        const rawTransaction = transaction.serialize()

        const signature = await this.connection.sendRawTransaction(
            rawTransaction,
            {
                skipPreflight: true
            }
        )

        await this.confirmTransaction(signature)

        await sleep(500)

        return signature

    }

    /**
     *
     * @param instructionSet
     * @param payer
     * @param delegate
     * @param lpMint
     * @param councilMint
     * @param config
     * @private
     */
    private async createInstructions(
        instructionSet: TransactionInstruction[][],
        payer: PublicKey,
        delegate: PublicKey,
        councilMint: PublicKey,
        lpMint: PublicKey,
        config
    ): Promise<{
        realmAddress?: PublicKey,
        councilGovernance?: PublicKey,
        lpGovernance?: PublicKey,
        usdcTreasury?: PublicKey,
        lpStockTreasury?: PublicKey
    }> {

        console.log("Creating instructions...")

        const maxRaise = config.details.maxRaise > 0 ? config.details.maxRaise : 1;

        await this.createMintInstructions(instructionSet[0], this.wallet.publicKey!, lpMint)
        await this.createMintInstructions(instructionSet[0], this.wallet.publicKey!, councilMint)

        await this.createDelegateInstructions(
            instructionSet[1],
            payer,
            councilMint,
            delegate
        )

        const {
            realmAddress,
            councilGovernance,
            lpGovernance,
        } = await this.createRealmInstructions(
            instructionSet[2],
            GOVERNANCE_PROGRAM_ID,
            payer,
            delegate,
            lpMint,
            councilMint,
            config
        )

        const {
            usdcTreasury,
            lpStockTreasury
        } = await this.createTreasuryInstructions(
            instructionSet[3],
            councilMint,
            lpMint,
            councilGovernance!,
            maxRaise
        )

        let totalInstructions = 0

        instructionSet.forEach(set => {
            totalInstructions += set.length;
        })

        console.log(`Total Instructions: ${totalInstructions}`);

        return {
            realmAddress,
            councilGovernance,
            lpStockTreasury,
            lpGovernance,
            usdcTreasury,
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
     * @param councilMint
     * @param delegate
     * @private
     */
    private async createDelegateInstructions(
        instructions: TransactionInstruction[],
        payer: PublicKey,
        councilMint: PublicKey,
        delegate: PublicKey
    ): Promise<void> {

        const delegateAta = await getAssociatedTokenAddress(
            councilMint,
            delegate
        )

        // create the associated token account for the delegate

        instructions.push(
            createAssociatedTokenAccountInstruction(
                payer,
                delegateAta,
                delegate,
                councilMint,
                TOKEN_PROGRAM_ID,
                ASSOCIATED_TOKEN_PROGRAM_ID
            )
        )

        // mint 1 delegate token to the delegate

        instructions.push(
            createMintToInstruction(
                councilMint,
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
     * @param councilMint
     * @param config
     * @private
     */
    private async createRealmInstructions(
        instructions: TransactionInstruction[],
        governanceProgramId: PublicKey,
        payer: PublicKey,
        delegate: PublicKey,
        lpMint: PublicKey,
        councilMint: PublicKey,
        config
    ): Promise<{
        realmAddress: PublicKey,
        councilGovernance?: PublicKey,
        lpGovernance?: PublicKey
    }> {

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
            lpMint,
            payer,
            councilMint,
            MintMaxVoteWeightSource.FULL_SUPPLY_FRACTION,
            new BN(LAMPORTS_PER_SOL * 1000000)
        )

        const [tokenOwnerRecord] = await PublicKey.findProgramAddress(
            [
                governanceProgramId.toBuffer(),
                realmAddress.toBuffer(),
                delegate.toBuffer(),
                payer.toBuffer(),
            ],
            governanceProgramId,
        );

        // create the lp governance for the realm

        const councilGovernance = await withCreateGovernance(
            instructions,
            governanceProgramId,
            2,
            realmAddress,
            undefined,
            realmConfig,
            tokenOwnerRecord,
            payer,
            payer,
        )

        const lpGovernance = await withCreateGovernance(
            instructions,
            governanceProgramId,
            2,
            realmAddress,
            undefined,
            realmConfig,
            tokenOwnerRecord,
            payer,
            payer,
        )

        // transfer authority of the realm from the owner to the lp governance

        withSetRealmAuthority(
            instructions,
            governanceProgramId,
            2,
            realmAddress,
            payer,
            councilGovernance,
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
            councilGovernance,
            lpGovernance
        }

    }

    /**
     *
     * @param instructions
     * @param councilMint
     * @param lpMint
     * @param councilGovernance
     * @param maxRaise
     * @private
     */
    private async createTreasuryInstructions(
        instructions: TransactionInstruction[],
        councilMint: PublicKey,
        lpMint: PublicKey,
        councilGovernance: PublicKey,
        maxRaise: number
    ): Promise<{
        usdcTreasury?: PublicKey,
        lpStockTreasury?: PublicKey
    }> {

        const usdcTreasury = await this.createTreasuryAccountInstructions(
            instructions,
            this.wallet.publicKey!,
            USDC_DEVNET,
            councilGovernance
        )

        const lpStockTreasury = await this.createTreasuryAccountInstructions(
            instructions,
            this.wallet.publicKey!,
            lpMint,
            councilGovernance
        )

        instructions.push(
            createMintToInstruction(
                lpMint, // mint
                lpStockTreasury, // destination
                this.wallet.publicKey!, // authority
                maxRaise // amount
            )
        )

        instructions.push(
            createSetAuthorityInstruction(
                lpMint,
                this.wallet.publicKey!,
                AuthorityType.MintTokens,
                null
            )
        )

        instructions.push(
            createSetAuthorityInstruction(
                councilMint,
                this.wallet.publicKey!,
                AuthorityType.MintTokens,
                councilGovernance
            )
        )

        return {
            usdcTreasury,
            lpStockTreasury
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
     * @param signature
     * @private
     */
    private async confirmTransaction(signature: TransactionSignature): Promise<void> {

        console.log(`Confirming transaction '${signature}'...`)

        let signatureResult: RpcResponseAndContext<(SignatureResult)> = {
            context: {
                slot: 0
            },
            value: {err: null}
        }

        let confirmed = false
        const blockhash = await this.connection.getLatestBlockhash();

        while (!confirmed) {

            signatureResult = await this.connection.confirmTransaction(
                {
                    signature: signature,
                    ...blockhash
                },"singleGossip"
            )

            if (signatureResult && signatureResult.value !== null) {
                confirmed = true
            }

            await sleep(150)

        }

        if (signatureResult?.value.err !== null) {
            console.log("Errored Signature Result:");
            console.log(signatureResult);
            throw new Error(`Something went wrong. Please try again. ${JSON.stringify(signatureResult?.value.err) ?? "unknown error"}`)
        }

        return Promise.resolve()

    }

}


