import {NumberFormatter} from "./number-formatter";

test("percentages formatted correctly", () => {

    expect(NumberFormatter.formatPercentage(1)).toEqual("0.01%")
    expect(NumberFormatter.formatPercentage(10)).toEqual("0.10%")
    expect(NumberFormatter.formatPercentage(100)).toEqual("1.00%")
    expect(NumberFormatter.formatPercentage(1000)).toEqual("10.00%")
    expect(NumberFormatter.formatPercentage(10000)).toEqual("100.00%")
    expect(NumberFormatter.formatPercentage(1234)).toEqual("12.34%")
    expect(NumberFormatter.formatPercentage(1000, 0, "x")).toEqual("10x")

})