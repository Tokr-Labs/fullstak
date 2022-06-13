import {SimulatedTransactionResponse, TransactionSignature} from "@solana/web3.js";
import {WalletContextState} from "@solana/wallet-adapter-react";
import {ActionProtocol} from "../../models/action-protocol";
import {IdentityVerificationService} from "@tokr-labs/identity-verification/lib/services/identity-verification-service";
import {TOKR_SERVICE_ENDPOINT_DEVNET} from "../../models/constants";
import {DaoInfo} from "../../models/dao/dao-info";

export class ApproveIdentityRecordAction implements ActionProtocol {

    // ============================================================
    // === Internal API ===========================================
    // ============================================================

    /**
     * Constructor
     * @param wallet
     */
    constructor(
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

        await fetch(`${TOKR_SERVICE_ENDPOINT_DEVNET}/idv/status/approve`, {
            method: "post",
            mode: 'cors',
            body: JSON.stringify({
                group: dao!.addresses.realm!.toBase58(),
                user: this.wallet.publicKey!
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })

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

    private validate(dao?:DaoInfo): boolean {
        return dao?.addresses.realm !== undefined && this.wallet.connected
    }

}