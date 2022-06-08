import {DaoAddresses} from "../dao-addresses";

test("that dao addresses are parsed correctly", () => {

    const input = {
        "pubkey": "BAygayfvMJo6kgm9294chhp9e3Jno96bibNqR2bU3ovq",
        "authority": "4ticUQxtxcyHJxJdT3jeucbiCxXonQcAnNCGaZkwUVPb",
        "owner": "33Vv9S6gpe6D4ZgE25F6moraDpTjiDYUMbSVBisg4Ymz",
        "governance": {
            "lp_token_mint_governance": "H9H1MgFMk1JqwjoFjgaJVz8jjyDrWQTmtPKJjGoj69fg",
            "distribution_token_mint_governance": "6BsdgzUKkV5CgRjnG9opWewNuUDwxVAafe8sh8ooDJDW",
            "delegate_token_mint_governance": "DSYk7wNGsub5P1uHsPbNNWgk72J3RdpVX6qtKhb8hb47"
        },
        "mint": {
            "lp_token_mint": "Gvv2mo8jtaELubEKhHwtjAxdZmKfNpzrFDJuw4hh3SVw",
            "distribution_token_mint": "DFyEkE5HV9GQGZMdwk2DXYHwEbAhHg1Q9Un94vLgtvTg",
            "delegate_token_mint": "82K9xb98T9YnraKjnJRnasAgGDRF7PPBuQnjuQRDxmdP"
        },
        "treasury": {
            "capital_supply": "2VYYvm6JQWXtvUgTXjk7e5uvdy9GEEzcjhyqU1kQfvFr",
            "distributions": "7UNnixNtiXqqRF2ASxSF7dtR9JwatYT3ufQ6sF18Ltfv",
            "stock_supply": "9k1ya7jgxVNDhGFKWJRXyHbZEtx6AVRM1YeQJXDN1ns6"
        }
    }

    const info = DaoAddresses.with(input)!;
    const governance = info.governance!;
    const mint = info.mint!;
    const treasury = info!.treasury!;

    expect(info.pubkey!.toBase58()).toEqual(input.pubkey);

    expect(governance.lpTokenGovernance!.toBase58()).toEqual(input.governance.lp_token_mint_governance);
    expect(governance.distributionTokenMintGovernance!.toBase58()).toEqual(input.governance.distribution_token_mint_governance);
    expect(governance.delegateTokenMintGovernance!.toBase58()).toEqual(input.governance.delegate_token_mint_governance);

    expect(mint.lpTokenMint!.toBase58()).toEqual(input.mint.lp_token_mint);
    expect(mint.distributionTokenMint!.toBase58()).toEqual(input.mint.distribution_token_mint);
    expect(mint.delegateTokenMint!.toBase58()).toEqual(input.mint.delegate_token_mint);

    expect(treasury.capitalSupply!.toBase58()).toEqual(input.treasury.capital_supply);
    expect(treasury.distributions!.toBase58()).toEqual(input.treasury.distributions);
    expect(treasury.stockSupply!.toBase58()).toEqual(input.treasury.stock_supply);


})