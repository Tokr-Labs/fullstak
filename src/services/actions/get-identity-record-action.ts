import {Connection, SimulatedTransactionResponse} from "@solana/web3.js";
import {WalletContextState} from "@solana/wallet-adapter-react";
import {ActionProtocol} from "../../models/action-protocol";
import {IdentityVerificationService} from "@tokr-labs/identity-verification/lib/services/identity-verification-service";
import {IDENTITY_VERIFICATION_PROGRAM_ID} from "../../models/constants";
import {DaoInfo} from "../../models/dao/dao-info";
import {getIdentityVerificationRecord} from "@tokr-labs/identity-verification";
import {IdentityRecord} from "@tokr-labs/identity-verification/lib/models/identity-record";

export class GetIdentityRecordAction implements ActionProtocol {

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
     * Create an identity record for a user
     * @param dao
     */
    async execute(dao?: DaoInfo): Promise<IdentityRecord | undefined> {

        if (!this.validate(dao)) {
            console.log("invalid props")
            return
        }

        return await getIdentityVerificationRecord(
            this.connection,
            IDENTITY_VERIFICATION_PROGRAM_ID,
            this.wallet.publicKey!,
            dao!.addresses.realm!
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

    private identityVerificationService: IdentityVerificationService

    private validate(dao?: DaoInfo): boolean {
        return dao?.addresses.realm !== undefined && this.wallet.connected
    }

}