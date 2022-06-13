import {SimulatedTransactionResponse, TransactionSignature} from "@solana/web3.js";

export interface ActionProtocol {

    execute(...args): Promise<any>
    simulate(...args): Promise<any>

}
