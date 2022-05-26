import * as fs from "fs";
import {DaoInfo} from "./dao-info";
import {DaoAddresses} from "./dao-addresses";

test("that dao addresses are parsed correctly", () => {

    const data = fs.readFileSync("src/daos/devnet/miami-fund.json", {encoding: "utf8"})
    const json = JSON.parse(data);

    const info = DaoAddresses.with(json.addresses);

    expect(info.pubkey.toBase58()).toEqual(json.addresses.pubkey);
    expect(info.authority.toBase58()).toEqual(json.addresses.authority);
    expect(info.owner.toBase58()).toEqual(json.addresses.owner);

    expect(info.governance.lpTokenMintGovernance.toBase58()).toEqual(json.addresses.governance.lp_token_mint_governance);
    expect(info.governance.distributionTokenMintGovernance.toBase58()).toEqual(json.addresses.governance.distribution_token_mint_governance);
    expect(info.governance.delegateTokenMintGovernance.toBase58()).toEqual(json.addresses.governance.delegate_token_mint_governance);

    expect(info.mint.lpTokenMint.toBase58()).toEqual(json.addresses.mint.lp_token_mint);
    expect(info.mint.distributionTokenMint.toBase58()).toEqual(json.addresses.mint.distribution_token_mint);
    expect(info.mint.delegateTokenMint.toBase58()).toEqual(json.addresses.mint.delegate_token_mint);

    expect(info.treasury.capitalSupply.toBase58()).toEqual(json.addresses.treasury.capital_supply);
    expect(info.treasury.distributions.toBase58()).toEqual(json.addresses.treasury.distributions);


})