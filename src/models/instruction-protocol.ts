import {TransactionInstruction} from "@solana/web3.js";

export interface InstructionProtocol {

    build(): Promise<TransactionInstruction>

}