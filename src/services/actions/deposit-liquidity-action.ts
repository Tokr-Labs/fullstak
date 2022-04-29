import {Connection, PublicKey, SimulatedTransactionResponse, Transaction, TransactionSignature} from "@solana/web3.js";
import {WalletContextState} from "@solana/wallet-adapter-react";
import {ActionProtocol} from "../../models/action-protocol";
import {createRecordInstruction, getRecord} from "@tokr-labs/identity-verification";

export class DepositLiquidityAction implements ActionProtocol {

    // ============================================================
    // === Internal API ===========================================
    // ============================================================

    /**
     * @param wallet
     * @param connection
     */
    constructor(
        private connection: Connection,
        private wallet: WalletContextState
    ) {
    }

    /**
     * Execute the deposit liquidity transaction
     */
    async execute(group: PublicKey, authority: PublicKey): Promise<TransactionSignature | void> {

        // check if wallet is connected

        if (!this.wallet.connected) {
            alert("wallet not connected")
            return
        }

        // get or create a record for the user

        try {

            // get record if one exists

            const record = await getRecord(
                this.connection,
                this.wallet.publicKey!,
                group
            )

            console.log(record)

            // @TODO: Call deposit liquidity action through governance program

        } catch {

            // create the record if one does not exist

            const txi = await createRecordInstruction(this.connection,this.wallet.publicKey!,group,authority)

            const tx = new Transaction()
            tx.add(txi)

            const txs = await this.wallet.sendTransaction(tx,this.connection)

            // check the user's identity verification record

            console.log(txs);

            return

        }

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