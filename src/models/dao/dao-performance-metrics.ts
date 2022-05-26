export class DaoPerformanceMetrics {

    // ============================================================
    // === Public Static API ======================================
    // ============================================================

    // Public Static Methods

    /**
     * Factory method for creating an instance of dao performance metrics
     * @param info Unstructured data, assumed to be json format
     */
    static with(info: any): DaoPerformanceMetrics {

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
        return `${this.paidInCapital.toLocaleString("en-US")} USDC`
    }

    /// formatted USDC amount
    get formattedCarryingValue(): string {
        return `${this.carryingValue.toLocaleString("en-US")} USDC`
    }

    /// multiplier formatting of tvpi
    get formattedTvpi(): string {

        // percentage 0-1
        const percentage = this.tvpi / Math.pow(10,4)

        return `${(percentage * 100).toFixed(2)}x`;
    }

    /// multiplier formatting of dpi
    get formattedDpi(): string {

        // percentage 0-1
        const percentage = this.dpi / Math.pow(10,4)

        return `${(percentage * 100).toFixed(2)}x`;
    }

    /// Percentage formatting of net irr
    get formattedNetIrr(): string {

        // percentage 0-1
        const percentage = this.netIrr / Math.pow(10,4)

        return `${(percentage * 100).toFixed(2)}%`;
    }

}