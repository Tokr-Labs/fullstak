import {CurrencyFormatter} from "../currency-formatter";

test("usdc gets formatted correctly", () => {

    expect(CurrencyFormatter.formatToken(100, "USDC")).toEqual("100 USDC")
    expect(CurrencyFormatter.formatToken(1000, "USDC")).toEqual("1,000 USDC")
    expect(CurrencyFormatter.formatToken(10000, "USDC")).toEqual("10,000 USDC")
    expect(CurrencyFormatter.formatToken(100000, "USDC")).toEqual("100,000 USDC")
    expect(CurrencyFormatter.formatToken(1000000, "USDC")).toEqual("1M USDC")
    expect(CurrencyFormatter.formatToken(10000000, "USDC")).toEqual("10M USDC")
    expect(CurrencyFormatter.formatToken(100000000, "USDC")).toEqual("100M USDC")
    expect(CurrencyFormatter.formatToken(1000000000, "USDC")).toEqual("1000M USDC")
    expect(CurrencyFormatter.formatToken(25500040, "USDC")).toEqual("25.50M USDC")

})