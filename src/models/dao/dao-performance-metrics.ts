import {CurrencyFormatter} from "../../utils/currency-formatter";
import {NumberFormatter} from "../../utils/number-formatter";

export class DaoPerformanceMetrics {

    // ============================================================
    // === Public Static API ======================================
    // ============================================================

    // Public Static Methods

    /**
     * Factory method for creating an instance of dao performance metrics
     * @param info Unstructured data, assumed to be json format
     */
    static with(info): DaoPerformanceMetrics {

        const metrics = new DaoPerformanceMetrics()

        metrics.paidInCapital = info.paid_in_capital ?? 0
        metrics.carryingValue = info.carrying_value ?? 0
        metrics.tvpi = info.tvpi ?? 0
        metrics.dpi = info.dpi ?? 0
        metrics.netIrr = info.net_irr ?? 0

        return metrics;

    }

    // ============================================================
    // === Public API =============================================
    // ============================================================

    // Public Properties

    /// amount in USDC
    paidInCapital: number

    /// amount in USDC
    carryingValue: number

    /// total value to paid in
    tvpi: number

    /// distributions to paid in
    dpi: number

    /// net internal rate of return
    netIrr: number

    /// formatted USDC amount
    get formattedPaidInCapital(): string {
        return CurrencyFormatter.formatToken(this.paidInCapital, "USDC")
    }

    /// formatted USDC amount
    get formattedCarryingValue(): string {
        return CurrencyFormatter.formatToken(this.carryingValue, "USDC")
    }

    /// multiplier formatting of tvpi
    get formattedTvpi(): string {
        return NumberFormatter.formatPercentage(this.tvpi, 2, "x");
    }

    /// multiplier formatting of dpi
    get formattedDpi(): string {
        return NumberFormatter.formatPercentage(this.dpi, 2, "x");
    }

    /// Percentage formatting of net irr
    get formattedNetIrr(): string {
        return NumberFormatter.formatPercentage(this.netIrr);
    }

}