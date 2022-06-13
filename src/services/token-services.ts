import {Connection, PublicKey} from "@solana/web3.js";
import {TOKEN_PROGRAM_ID} from "@solana/spl-token";
import {USDC_DEVNET, USDC_MAINNET} from "../models/constants";

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

        return await this.connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, config)

    }

    async getTokenAccountBalance(tokenAccount: PublicKey) {

        const tokenAccountBalance = await this.connection.getTokenAccountBalance(tokenAccount);

        return tokenAccountBalance.value.uiAmount

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

    getUsdcMint = (network: string) => {
        switch (network) {
            case "mainnet-beta":
                return USDC_MAINNET
            case "devnet":
                return USDC_DEVNET
            case process.env.REACT_APP_CUSTOM_RPC:
                return process.env.REACT_APP_USDC_LOCALNET
            default:
                throw new Error("Unknown network selection")
        }
    }

}