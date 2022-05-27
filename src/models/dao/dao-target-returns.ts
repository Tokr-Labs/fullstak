import {NumberFormatter} from "../../utils/number-formatter";

export class DaoTargetReturns {

    // ============================================================
    // === Public Static API ======================================
    // ============================================================

    // Public Static Methods

    /**
     * Factory method for creating an instance of dao returns
     * @param info Unstructured data, assumed to be json format
     */
    static with(info?: any): DaoTargetReturns {

        const returns = new DaoTargetReturns()

        returns.irr = info?.irr ?? 0;
        returns.coc = info?.coc ?? 0;

        return returns;

    }

    // ============================================================
    // === Public API =============================================
    // ============================================================

    // Public Properties

    /// internal rate of return
    irr: number

    /// cash on cash
    coc: number

    /// percentage formatting of irr
    get formattedIrr(): string {
        return NumberFormatter.formatPercentage(this.irr);
    }

    /// percentage formatting of coc
    get formattedCoc(): string {
        return NumberFormatter.formatPercentage(this.coc);
    }
}