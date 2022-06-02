import {Connection, PublicKey} from "@solana/web3.js";
import {TOKEN_PROGRAM_ID} from "@solana/spl-token";
<<<<<<< HEAD
=======
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {USDC_DEVNET, USDC_MAINNET} from "../models/constants";
>>>>>>> develop

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

    getUsdcMint = (network: WalletAdapterNetwork) => {
        return network === WalletAdapterNetwork.Devnet ? USDC_DEVNET : USDC_MAINNET
    }

}