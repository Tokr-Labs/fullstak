import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    SimulatedTransactionResponse,
    Transaction,
    TransactionSignature
} from "@solana/web3.js";
import {createTransferInstruction, getAssociatedTokenAddress} from "@solana/spl-token";
import {WalletContextState} from "@solana/wallet-adapter-react";
import {USDC_MINT_PUBKEY} from "../../models/constants";
import {isNull} from "underscore";
import {ActionProtocol} from "../../models/action-protocol";
import {DepositLiquidityInstruction} from "../instructions/deposit-liquidity-instruction";

export class DepositLiquidityAction implements ActionProtocol {

    // ============================================================
    // === Internal API ===========================================
    // ============================================================

    /**
     * @param wallet
     * @param connection
     * @param destination
     * @param amount
     */
    constructor(
        private wallet: WalletContextState,
        private connection: Connection,
        private destination: PublicKey,
        private amount: number
    ) {
    }

    /**
     * Execute the deposit liquidity transaction
     */
    async execute(): Promise<TransactionSignature> {

        // exit early if users wallet is not connected

        if (isNull(this.wallet.publicKey)) {
            throw new Error("Wallet not connected")
        }

        const ownerPubkey = this.wallet.publicKey!

        // @TODO - add check for compliance

        const depositInstruction = await DepositLiquidityInstruction.with(
            this.destination,
            ownerPubkey,
            this.amount
        );

        const transaction = new Transaction();

        transaction.add(depositInstruction)

        // @TODO: Add transfer lp tokens instruction

        return await this.wallet.sendTransaction(
            transaction,
            this.connection
        )

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

    private validate(): boolean {
        return true
    }

}