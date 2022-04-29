import {Connection, PublicKey} from "@solana/web3.js";
import {TOKEN_PROGRAM_ID} from "@solana/spl-token";

class TokenServices {

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

}