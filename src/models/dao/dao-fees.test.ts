import fs from "fs";
import {DaoInfo} from "./dao-info";
import {DaoFees} from "./dao-fees";

test("dao fees parsed correctly", () => {

    const info = DaoFees.with({
        "closing": 2400,
        "annual": 1000
    });

    expect(info.formattedClosingFee).toEqual("24.00%")
    expect(info.formattedAnnualFee).toEqual("10.00%")

})