import {CurrencyFormatter} from "../currency-formatter";

test("usdc gets formatted correctly", () => {

    expect(CurrencyFormatter.formatToken(100)).toEqual("100 USDC")
    expect(CurrencyFormatter.formatToken(1000)).toEqual("1,000 USDC")
    expect(CurrencyFormatter.formatToken(10000)).toEqual("10,000 USDC")
    expect(CurrencyFormatter.formatToken(100000)).toEqual("100,000 USDC")
    expect(CurrencyFormatter.formatToken(1000000)).toEqual("1M USDC")
    expect(CurrencyFormatter.formatToken(10000000)).toEqual("10M USDC")
    expect(CurrencyFormatter.formatToken(100000000)).toEqual("100M USDC")
    expect(CurrencyFormatter.formatToken(1000000000)).toEqual("1000M USDC")
    expect(CurrencyFormatter.formatToken(25500040)).toEqual("25.5M USDC")

})