import {PublicKey} from "@solana/web3.js";

export class DaoGovernanceAddresses {

    // ============================================================
    // === Public Static API ======================================
    // ============================================================

    // Public Static Methods

    /**
     *
     * @param info Unstructured data, assumed to be json format
     */
    static with(info): DaoGovernanceAddresses {

        // "governance": {
        //     "lp_token_governance": "6McVeFoeqqsz6EL4a6rrQUmDLrMrGdJRB4iTNVuyqQKb",
        //         "distribution_token_mint_governance": "dUE2b4RFfTAfUzHdFvpVKi6Lxbso2apxUi9wrmERkDU",
        //         "delegate_token_mint_governance": "CtP56e5RojNVrTrJWcp5G3z6ujeXeeqqCQjVn9wCpjKG"
        // },


        const addresses = new DaoGovernanceAddresses()

        console.log("info?.lp_token_governance", info?.lp_token_governance);

        addresses.delegateTokenMintGovernance = info?.delegate_token_mint_governance ? new PublicKey(info.delegate_token_mint_governance) : undefined
        addresses.distributionTokenMintGovernance = info?.distribution_token_mint_governance ? new PublicKey(info.distribution_token_mint_governance) : undefined
        addresses.lpTokenGovernance = info?.lp_token_governance ? new PublicKey(info.lp_token_governance) : undefined

        return addresses

    }

    // ============================================================
    // === Public API =============================================
    // ============================================================

    // Public Properties

    delegateTokenMintGovernance?: PublicKey
    distributionTokenMintGovernance?: PublicKey
    lpTokenGovernance?: PublicKey

}

export class DaoMintAddresses {

    // ============================================================
    // === Public Static API ======================================
    // ============================================================

    // Public Static Methods

    /**
     *
     * @param info Unstructured data, assumed to be json format
     */
    static with(info): DaoMintAddresses {

        // "mint": {
        //     "lp_token_mint": "CjDq8MvCyXDWrPnDgC6YDgyPRT8jDW5a2dDs1i5dP6Dw",
        //         "distribution_token_mint": "E86gycjjUyioxo5rDtZCe9pRHCjcgUYPxx4YmoeRPQWm",
        //         "delegate_token_mint": "2FB2oJqEoNeREkPJEYEmRmhBbmaMDgGt7SQ8Vtw5WphR"
        // },

        const addresses = new DaoMintAddresses()

        addresses.lpTokenMint = info?.lp_token_mint ? new PublicKey(info.lp_token_mint) : undefined
        addresses.distributionTokenMint = info?.distribution_token_mint ? new PublicKey(info.distribution_token_mint) : undefined
        addresses.delegateTokenMint = info?.delegate_token_mint ? new PublicKey(info.delegate_token_mint) : undefined

        return addresses

    }

    // ============================================================
    // === Public API =============================================
    // ============================================================

    // Public Properties

    lpTokenMint?: PublicKey
    distributionTokenMint?: PublicKey
    delegateTokenMint?: PublicKey

}

export class DaoTreasuryAddresses {

    // ============================================================
    // === Public Static API ======================================
    // ============================================================

    // Public Static Methods

    /**
     *
     * @param info Unstructured data, assumed to be json format
     */
    static with(info): DaoTreasuryAddresses {

        // "treasury": {
        //     "capital_supply": "J9Z1rnTzyFBnSmMCh7saufSonFtU6vE4GULBvA1ikzyB",
        //         "distributions": "6m4MyYxPMFTmBLWaaoC2ZPcHew8XtQHpJNQt5duSob5N",
        //         "stock_supply": "FZSPQgPKkzC6Zu9T3kmMQhs8ncYWj7pMASYncoqyR3p6"
        // }

        const addresses = new DaoTreasuryAddresses()

        addresses.capitalSupply = info?.capital_supply ? new PublicKey(info.capital_supply) : undefined
        addresses.distributions = info?.distributions ? new PublicKey(info.distributions) : undefined
        addresses.stockSupply = info?.stock_supply ? new PublicKey(info.stock_supply) : undefined

        return addresses

    }

    // ============================================================
    // === Public API =============================================
    // ============================================================

    // Public Properties

    capitalSupply?: PublicKey
    distributions?: PublicKey
    stockSupply?: PublicKey

}

export class DaoAddresses {

    // ============================================================
    // === Public Static API ======================================
    // ============================================================

    // Public Static Methods

    /**
     * Factory method for creating an instance of dao addresses
     * @param info Unstructured data, assumed to be json format
     */
    static with(info): DaoAddresses {

        const addresses = new DaoAddresses();

        addresses.pubkey = info?.pubkey ? new PublicKey(info.pubkey) : undefined;
        addresses.governance = DaoGovernanceAddresses.with(info?.governance)
        addresses.mint = DaoMintAddresses.with(info?.mint)
        addresses.treasury = DaoTreasuryAddresses.with(info?.treasury)

        console.log(addresses);

        return addresses;

    }

    // ============================================================
    // === Public API =============================================
    // ============================================================

    // Public Properties

    /// public key of the dao
    pubkey?: PublicKey

    governance: DaoGovernanceAddresses
    mint: DaoMintAddresses
    treasury: DaoTreasuryAddresses

}