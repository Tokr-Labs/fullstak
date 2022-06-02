import * as fs from "fs";
import {DaoInfo} from "../dao-info";

test("that dao info parses json correctly", () => {

    const data = fs.readFileSync("src/daos/devnet/mf1.json", {encoding: "utf8"})
    const json = JSON.parse(data);

    const daoInfo = DaoInfo.with(json);

    expect(daoInfo.name).toEqual(json.name);
    expect(daoInfo.active).toEqual(json.active);
    expect(daoInfo.description).toEqual(json.description);
    expect(daoInfo.addresses).toBeDefined()
    expect(daoInfo.details).toBeDefined()
    expect(daoInfo.stakeholders).toBeDefined()
    expect(daoInfo.token).toBeDefined()
    expect(daoInfo.performance).toBeDefined()

})