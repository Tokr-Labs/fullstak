import {PublicKey} from "@solana/web3.js";

export class DaoAddresses {

    // ============================================================
    // === Public Static API ======================================
    // ============================================================

    // Public Static Methods

    /**
     * Factory method for creating an instance of dao addresses
     * @param info Unstructured data, assumed to be json format
     */
    static with(info: any): DaoAddresses {

        const addresses = new DaoAddresses();

        addresses.pubkey = new PublicKey(info.pubkey);
        addresses.authority = new PublicKey(info.authority);
        addresses.owner = new PublicKey(info.owner);

        addresses.governance = {
            delegateTokenMintGovernance: new PublicKey(info.governance.delegate_token_mint_governance),
            distributionTokenMintGovernance: new PublicKey(info.governance.distribution_token_mint_governance),
            lpTokenMintGovernance: new PublicKey(info.governance.lp_token_mint_governance)
        };

        addresses.mint = {
            lpTokenMint: new PublicKey(info.mint.lp_token_mint),
            distributionTokenMint: new PublicKey(info.mint.distribution_token_mint),
            delegateTokenMint: new PublicKey(info.mint.delegate_token_mint)
        };

        addresses.treasury = {
            capitalSupply: new PublicKey(info.treasury.capital_supply),
            distributions: new PublicKey(info.treasury.distributions),
            stockSupply: new PublicKey(info.treasury.stock_supply)
        };

        return addresses;

    }

    // ============================================================
    // === Public API =============================================
    // ============================================================

    // Public Properties

    /// public key of the dao
    pubkey: PublicKey

    /// @TODO: Add docs
    authority: PublicKey

    /// @TODO: Add docs
    owner: PublicKey

    governance: {

        /// @TODO: Add docs
        lpTokenMintGovernance: PublicKey

        /// Governs over the minting and burning or delegate distribution tokens
        distributionTokenMintGovernance: PublicKey

        /// Governs over
        delegateTokenMintGovernance: PublicKey

    }

    mint: {

        /// Mint for tokens representing a stakeholders position in the fund
        lpTokenMint: PublicKey

        /// Mint for distribution tokens that can be exchanged for USDC
        distributionTokenMint: PublicKey

        /// Mint of the delegate (council) tokens used for voting rights within the dao
        delegateTokenMint: PublicKey

    }

    treasury: {

        /// USDC treasury account with funds provided by limited partners
        capitalSupply: PublicKey

        /// USDC treasury account for distribution funds provided by the general partner
        distributions: PublicKey

        /// lp treasury stock
        stockSupply: PublicKey

    }

}