import {CurrencyFormatter} from "../currency-formatter";

test("usdc gets formatted correctly", () => {

    expect(CurrencyFormatter.formatUsdc(100)).toEqual("100 USDC")
    expect(CurrencyFormatter.formatUsdc(1000)).toEqual("1,000 USDC")
    expect(CurrencyFormatter.formatUsdc(10000)).toEqual("10,000 USDC")
    expect(CurrencyFormatter.formatUsdc(100000)).toEqual("100,000 USDC")
    expect(CurrencyFormatter.formatUsdc(1000000)).toEqual("1M USDC")
    expect(CurrencyFormatter.formatUsdc(10000000)).toEqual("10M USDC")
    expect(CurrencyFormatter.formatUsdc(100000000)).toEqual("100M USDC")
    expect(CurrencyFormatter.formatUsdc(1000000000)).toEqual("1000M USDC")
    expect(CurrencyFormatter.formatUsdc(25500040)).toEqual("25.5M USDC")

})