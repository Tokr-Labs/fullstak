import {Connection, PublicKey, Transaction, TransactionSignature} from "@solana/web3.js";
import {createIdentityRecordInstruction, getIdentityVerificationRecord} from "@tokr-labs/identity-verification";
import {IDENTITY_VERIFICATION_INITIAL_AUTHORITY, IDENTITY_VERIFICATION_PROGRAM_ID} from "../models/constants";
import {WalletContextState} from "@solana/wallet-adapter-react";
import {connection} from "@project-serum/common";
import {IdentityRecord} from "@tokr-labs/identity-verification/lib/models/identity-record";

export class IdvService {

    constructor(
        private connection: Connection,
        private host: string
    ) {
    }

    async createAndApproveIdentity(wallet: WalletContextState, realmPublicKey?: PublicKey): Promise<IdentityRecord> {

        const walletPublicKey = wallet.publicKey;
        const groupPublicKey = realmPublicKey;

        if (!walletPublicKey || !groupPublicKey) {
            throw new Error("Invalid wallet or realm public keys.")
        }

        const txi = await createIdentityRecordInstruction(
            this.connection,
            IDENTITY_VERIFICATION_PROGRAM_ID,
            walletPublicKey,
            groupPublicKey,
            IDENTITY_VERIFICATION_INITIAL_AUTHORITY
        )

        const tx = new Transaction()
        tx.add(txi);

        const signature = await wallet.sendTransaction(tx, this.connection)
        await this.connection.confirmTransaction(signature);

        await this.approveIdentity(walletPublicKey, groupPublicKey)

        return await getIdentityVerificationRecord(this.connection, IDENTITY_VERIFICATION_PROGRAM_ID, walletPublicKey, groupPublicKey)

    }

    async approveIdentity(wallet: PublicKey | null, realmPublicKey?: PublicKey): Promise<IdentityRecord> {

        const walletPublicKey = wallet;
        const groupPublicKey = realmPublicKey;

        if (!walletPublicKey || !groupPublicKey) {
            throw new Error("Invalid wallet or realm public keys.")
        }

        await fetch(`${this.host}/idv/status/approve`, {
            method: "post",
            mode: 'cors',
            body: JSON.stringify({
                group: groupPublicKey.toBase58(),
                user: walletPublicKey.toBase58()
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })

        return await getIdentityVerificationRecord(this.connection, IDENTITY_VERIFICATION_PROGRAM_ID, walletPublicKey, groupPublicKey)

    }

}