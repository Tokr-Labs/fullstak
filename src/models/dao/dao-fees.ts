import {NumberFormatter} from "../../utils/number-formatter";

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

    /// closing fees
    closing: number

    /// annual fee percentage
    annual: number

    get formattedClosingFee(): string {
        return NumberFormatter.formatPercentage(this.closing);
    }

    get formattedAnnualFee(): string {
        return NumberFormatter.formatPercentage(this.annual);
    }

}