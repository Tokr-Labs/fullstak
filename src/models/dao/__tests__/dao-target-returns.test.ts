import {DaoTargetReturns} from "../dao-target-returns";

test("that target returns are parsed correctly", () => {

    const returns = DaoTargetReturns.with({
        irr: 100,
        coc: 2000,
        tvpi: 430,
        dpi: 210
    })

    expect(returns.formattedIrr).toEqual("1.00%")
    expect(returns.formattedCoc).toEqual("20.00%")
    expect(returns.formattedTvpi).toEqual("4.30x")
    expect(returns.formattedDpi).toEqual("2.10x")


})