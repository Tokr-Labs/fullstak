import {
    Connection,
    SimulatedTransactionResponse,
    Transaction,
    TransactionInstruction,
    TransactionSignature
} from "@solana/web3.js";
import {WalletContextState} from "@solana/wallet-adapter-react";
import {ActionProtocol} from "../../models/action-protocol";
import {IdentityVerificationService} from "@tokr-labs/identity-verification/lib/services/identity-verification-service";
import {GOVERNANCE_PROGRAM_ID, IDENTITY_VERIFICATION_PROGRAM_ID, USDC_DEVNET} from "../../models/constants";
import {getIdentityVerificationRecord} from "@tokr-labs/identity-verification";
import {withDepositCapital} from "@tokr-labs/governance/lib/governance/withDepositCaptial";
import {DaoInfo} from "../../models/dao/dao-info";
import {getAssociatedTokenAddress, getMint} from "@solana/spl-token";

export class DepositCapitalAction implements ActionProtocol {

    // ============================================================
    // === Internal API ===========================================
    // ============================================================

    /**
     * @param connection
     * @param wallet
     */
    constructor(
        private connection: Connection,
        private wallet: WalletContextState
    ) {
    }

    /**
     * Execute the deposit capital transaction
     */
    async execute(amount: number, dao: DaoInfo): Promise<TransactionSignature | void> {

        if (!this.validate(dao)) {
            throw new Error("Validation failed")
        }

        const record = await getIdentityVerificationRecord(
            this.connection,
            IDENTITY_VERIFICATION_PROGRAM_ID,
            this.wallet.publicKey!,
            dao!.addresses.pubkey!
        )

        console.log("record", record);
        console.log("record.address", record.address.toBase58())

        if (!record || !record.isVerified) {
            throw new Error("Identity not verified.")
        }

        const addresses = dao.addresses;

        const realm = addresses.pubkey
        const delegateMintGovernance = addresses.governance.delegateTokenMintGovernance
        const lpGovernance = addresses.governance.lpTokenGovernance
        const lpTokenMint = addresses.mint.lpTokenMint
        const delegateTokenMint = addresses.mint.delegateTokenMint

        console.log("realm", addresses.pubkey)
        console.log("delegateTokenMintGovernance", addresses.governance.delegateTokenMintGovernance)
        console.log("lpTokenMintGovernance", addresses.governance.lpTokenGovernance)
        console.log("lpTokenMint", addresses.mint.lpTokenMint)
        console.log("delegateTokenMint", addresses.mint.delegateTokenMint)

        if (
            !realm ||
            !delegateMintGovernance ||
            !lpGovernance ||
            !lpTokenMint ||
            !delegateTokenMint
        ) {

            console.log("invalid public keys");
            throw new Error("Invalid public keys.")

        }

        const tx = new Transaction()
        const txis: TransactionInstruction[] = [];

        const usdcTokenSource = await getAssociatedTokenAddress(
            USDC_DEVNET,
            this.wallet.publicKey!
        )

        console.log("usdcTokenSource", usdcTokenSource.toBase58());

        const usdcMint = await getMint(
            this.connection,
            USDC_DEVNET
        )

        console.log("usdcMint", usdcMint.address.toBase58())

        const lpTokenAccount = await getAssociatedTokenAddress(
            lpTokenMint,
            this.wallet.publicKey!
        )

        console.log("lpTokenAccount", lpTokenAccount.toBase58())


        await withDepositCapital(
            txis,
            GOVERNANCE_PROGRAM_ID,
            IDENTITY_VERIFICATION_PROGRAM_ID,
            realm,
            lpGovernance,
            delegateMintGovernance,
            this.wallet.publicKey!,
            usdcTokenSource,
            USDC_DEVNET,
            lpTokenAccount,
            lpTokenMint,
            delegateTokenMint,
            amount,
            usdcMint.decimals
        )

        tx.add(...txis)

        console.log("txis:");
        console.log(txis);

        return await this.wallet.sendTransaction(tx, this.connection, {skipPreflight: true})

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

    private identityVerificationService: IdentityVerificationService

    private validate(dao?: DaoInfo): boolean {
        return dao?.addresses.pubkey !== undefined && this.wallet.connected
    }

}