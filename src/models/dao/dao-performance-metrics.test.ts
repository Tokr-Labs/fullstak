import {DaoPerformanceMetrics} from "./dao-performance-metrics";

test("that dao performance parses correctly", () => {

   const metrics = DaoPerformanceMetrics.with({
      "paid_in_capital": 100000000,
      "carrying_value": 150000000,
      "tvpi": 133,
      "dpi": 133,
      "net_irr": 2247
   })

   expect(metrics.formattedPaidInCapital).toEqual("100,000,000 USDC")
   expect(metrics.formattedCarryingValue).toEqual("150,000,000 USDC")
   expect(metrics.formattedTvpi).toEqual("1.33x")
   expect(metrics.formattedDpi).toEqual("1.33x")
   expect(metrics.formattedNetIrr).toEqual("22.47%")

})