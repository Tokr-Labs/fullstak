import {DaoFundDetails} from "./dao-fund-details";

test("that fund details parse correctly", () => {

    const details = DaoFundDetails.with({
        "min_raise": 1000000,
        "max_raise": 10000000,
        "min_investment": 100000,
        "raise_close": 1672531200,
        "vintage_year": 2022,
        "fund_term": 5,
        "data_room": "",
        "target_returns": {
            "irr": 2400,
            "coc": 1000
        },
        "fees": {
            "closing": 1000,
            "annual": 1000
        }
    })

    expect(details.vintageYear).toEqual("2022");
    expect(details.formattedFundTerm).toEqual("5 years");
    expect(details.formattedMinRaise).toEqual("$1,000,000");
    expect(details.formattedMaxRaise).toEqual("$10,000,000");
    expect(details.formattedMinInvestment).toEqual("$100,000");
    expect(details.formattedRaiseClose).toEqual("January 1, 2023");

})