import {Connection, TransactionInstruction} from "@solana/web3.js";
import {InstructionProtocol} from "../../models/instruction-protocol";

export class UpdateRealmConfigInstruction implements InstructionProtocol {

    // ============================================================
    // === Internal API ===========================================
    // ============================================================

    constructor(
        private connection: Connection
    ) {
    }

    build(): Promise<TransactionInstruction> {
        return Promise.reject("not implemented");
    }

    // ============================================================
    // === Private API ============================================
    // ============================================================

    private validate(): boolean {
        return true
    }

}