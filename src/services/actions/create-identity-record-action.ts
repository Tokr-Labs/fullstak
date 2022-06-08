import {Connection, SimulatedTransactionResponse, Transaction, TransactionSignature} from "@solana/web3.js";
import {WalletContextState} from "@solana/wallet-adapter-react";
import {ActionProtocol} from "../../models/action-protocol";
import {IdentityVerificationService} from "@tokr-labs/identity-verification/lib/services/identity-verification-service";
import {IDENTITY_VERIFICATION_INITIAL_AUTHORITY, IDENTITY_VERIFICATION_PROGRAM_ID} from "../../models/constants";
import {createIdentityRecordInstruction, getIdentityVerificationRecord} from "@tokr-labs/identity-verification";
import {DaoInfo} from "../../models/dao/dao-info";
import {IdentityRecord} from "@tokr-labs/identity-verification/lib/models/identity-record";
import {identity} from "underscore";

export class CreateIdentityRecordAction implements ActionProtocol {

    // ============================================================
    // === Internal API ===========================================
    // ============================================================

    /**
     * Constructor
     * @param wallet
     * @param connection
     */
    constructor(
        private connection: Connection,
        private wallet: WalletContextState
    ) {
    }

    /**
     * Create an identity record for a user
     * @param dao
     */
    async execute(dao?: DaoInfo): Promise<TransactionSignature | void> {

        if (!this.validate(dao)) {
            throw new Error("wallet not connected")
        }

        let record: IdentityRecord | undefined;

        try {

            record = await getIdentityVerificationRecord(
                this.connection,
                IDENTITY_VERIFICATION_PROGRAM_ID,
                this.wallet.publicKey!,
                dao!.addresses.pubkey!
            )

            return Promise.resolve()

        } catch (error) {

            console.warn("No IDV record found.")

        }

        // create the record if one does not exist

        const txi = await createIdentityRecordInstruction(
            this.connection,
            IDENTITY_VERIFICATION_PROGRAM_ID,
            this.wallet.publicKey!,
            dao!.addresses.pubkey!,
            IDENTITY_VERIFICATION_INITIAL_AUTHORITY
        )

        const tx = new Transaction();
        tx.add(txi);

        return await this.wallet.sendTransaction(tx, this.connection)

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