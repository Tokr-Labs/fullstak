import {Connection, PublicKey} from "@solana/web3.js";
import {TOKEN_PROGRAM_ID} from "@solana/spl-token";

export class TokenServices {

    constructor(private connection: Connection) {
    }

    async getTokenHoldersForMint(tokenMint: PublicKey) {

        const config = {
            filters: [{
                dataSize: 165
            }, {
                memcmp: {
                    offset: 0,
                    bytes: tokenMint.toBase58()
                }
            }]
        };

        await this.connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, config)

    }

    async getTokenHoldingAmount(tokenMint: PublicKey, ownerAddress: PublicKey) {

        const tokenAccount = await this.connection.getTokenAccountsByOwner(ownerAddress, {mint: tokenMint})
            .then(accounts => accounts.value[0])

        const tokenAccountBalance = await this.connection.getTokenAccountBalance(tokenAccount.pubkey)

        return tokenAccountBalance.value.uiAmount

    }

    async getTokenDecimals(tokenMint: PublicKey) {

        const tokenSupply = await this.connection.getTokenSupply(tokenMint)

        return tokenSupply.value.decimals

    }

}