import {InstructionProtocol} from "../../models/instruction-protocol";
import {PublicKey, TransactionInstruction} from "@solana/web3.js";
import {createRecordInstruction} from "@tokr-labs/identity-verification";

export class CreateIdvRecordInstruction implements InstructionProtocol {

    // ============================================================
    // === Internal Static API ====================================
    // ============================================================

    static async with(signer: PublicKey, group: PublicKey, authority: PublicKey): Promise<TransactionInstruction> {

        const instruction = new CreateIdvRecordInstruction(signer, group, authority)

        return await instruction.build()

    }

    // ============================================================
    // === Internal API ===========================================
    // ============================================================

    constructor(
        private signer: PublicKey,
        private group: PublicKey,
        private authority: PublicKey
    ) {
    }

    async build(): Promise<TransactionInstruction> {

        if (!this.validate()) {
            throw new Error("CreateIdvRecordInstruction Instruction parameters are not valid.")
        }

        return await createRecordInstruction(
            this.signer,
            this.group,
            this.authority
        )

    }

    // ============================================================
    // === Private API ============================================
    // ============================================================

    private validate(): boolean {
        return true
    }

}