export class DaoTargetReturns {

    // ============================================================
    // === Public Static API ======================================
    // ============================================================

    // Public Static Methods

    /**
     * Factory method for creating an instance of dao returns
     * @param info Unstructured data, assumed to be json format
     */
    static with(info: any): DaoTargetReturns {

        const returns = new DaoTargetReturns()

        returns.irr = info.irr;
        returns.coc = info.coc;

        return returns;

    }

    // ============================================================
    // === Public API =============================================
    // ============================================================

    // Public Properties

    /// @TODO: Add docs
    irr: number

    /// @TODO: Add docs
    coc: number

    get formattedIrr(): string {
        // percentage 0-1
        const percentage = this.irr / Math.pow(10,4)

        return `${(percentage * 100).toFixed(2)}%`;
    }

    get formattedCoc(): string {
        // percentage 0-1
        const percentage = this.coc / Math.pow(10,4)

        return `${(percentage * 100).toFixed(2)}%`;
    }
}