import {TransactionInstruction} from "@solana/web3.js";
import {InstructionProtocol} from "../../models/instruction-protocol";

export class UpdateRealmConfigInstruction implements InstructionProtocol {

    build(): Promise<TransactionInstruction> {
        return Promise.reject("not implemented");
    }


}