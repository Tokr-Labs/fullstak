import {SimulatedTransactionResponse, TransactionSignature} from "@solana/web3.js";

export interface ActionProtocol {

    execute(): Promise<TransactionSignature>
    simulate(): Promise<SimulatedTransactionResponse>

}