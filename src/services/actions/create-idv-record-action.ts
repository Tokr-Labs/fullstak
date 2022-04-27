import {Connection, PublicKey, SimulatedTransactionResponse, Transaction, TransactionSignature} from "@solana/web3.js";
import {WalletContextState} from "@solana/wallet-adapter-react";
import {isNull} from "underscore";
import {ActionProtocol} from "../../models/action-protocol";
import {CreateIdvRecordInstruction} from "../instructions/create-idv-record-instruction";

export class CreateIdvRecordAction implements ActionProtocol {

    // ============================================================
    // === Internal API ===========================================
    // ============================================================

    /**
     * @param wallet
     * @param connection
     */
    constructor(
        private wallet: WalletContextState,
        private connection: Connection
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

        // this needs to be the realm pubkey
        const groupPubkey = new PublicKey("vFhum2XP5RcAxpVw1qB1v4ZDBFiX99pr6EXBVVYZcGL");

        // this needs to be set to whatever keypair is in charge of updating the records from the webhooks
        const authority = new PublicKey("6nsECMoxdvLCYjXx9dJPveZSn2s88E1CY5Kje5afv7e4");

        const createRecordInstruction = await CreateIdvRecordInstruction.with(
            ownerPubkey,
            groupPubkey,
            authority
        )

        const transaction = new Transaction()
        transaction.add(createRecordInstruction);

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