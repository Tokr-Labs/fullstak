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

        const addresses = new DaoGovernanceAddresses()


        addresses.lpGovernance = info?.lp_governance ? new PublicKey(info.lp_governance) : undefined
        addresses.distributionMintGovernance = info?.distribution_mint_governance ? new PublicKey(info.distribution_mint_governance) : undefined
        addresses.delegateMintGovernance = info?.delegate_mint_governance ? new PublicKey(info.delegate_mint_governance) : undefined

        return addresses

    }

    // ============================================================
    // === Public API =============================================
    // ============================================================

    // Public Properties

    delegateMintGovernance?: PublicKey
    distributionMintGovernance?: PublicKey
    lpGovernance?: PublicKey

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

        addresses.realm = info?.realm ? new PublicKey(info.realm) : undefined;
        addresses.governance = DaoGovernanceAddresses.with(info?.governance)
        addresses.mint = DaoMintAddresses.with(info?.mint)
        addresses.treasury = DaoTreasuryAddresses.with(info?.treasury)

        return addresses;

    }

    // ============================================================
    // === Public API =============================================
    // ============================================================

    // Public Properties

    /// public key of the dao
    realm?: PublicKey

    governance: DaoGovernanceAddresses
    mint: DaoMintAddresses
    treasury: DaoTreasuryAddresses

}