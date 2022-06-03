import {PublicKey, TransactionSignature} from "@solana/web3.js";

export class FaucetService {

    constructor(private host: string) {
    }

    async request(user: PublicKey, amount = 1): Promise<TransactionSignature> {

        if (amount > 1000000) {
            throw new Error("Value must be between 1 and 1,000,000")
        }

        if (!user) {
            throw new Error("invalid user")
        }

        const response = await fetch(`${this.host}/faucet`, {
            method: "post",
            mode: 'cors',
            body: JSON.stringify({
                destination: user.toBase58(),
                amount: amount
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })


        const parsedResponse = await response.json();

        return parsedResponse.result;

    }

}