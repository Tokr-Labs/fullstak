export class DaoFees {

    // ============================================================
    // === Public Static API ======================================
    // ============================================================

    // Public Static Methods

    /**
     * Factory method for creating an instance of dao fees
     * @param info Unstructured data, assumed to be json format
     */
    static with(info: any): DaoFees {
        const fees = new DaoFees()

        fees.closing = info.closing ?? 0;
        fees.annual = info.annual ?? 0;

        return fees;
    }

    // ============================================================
    // === Public API =============================================
    // ============================================================

    // Public Properties

    /// @TODO: Add docs
    closing: number

    /// @TODO: Add docs
    annual: number

    get formattedClosingFee(): string {

        // percentage 0-1
        const percentage = this.closing / Math.pow(10,4)

        return `${(percentage * 100).toFixed(2)}%`;
    }

    get formattedAnnualFee(): string {

        // percentage 0-1
        const percentage = this.annual / Math.pow(10,4)

        return `${(percentage* 100).toFixed(2)}%`;
    }

}