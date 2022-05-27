export class DaoTokenInfo {

    // ============================================================
    // === Public Static API ======================================
    // ============================================================

    // Public Static Methods

    /**
     * Factory method for creating an instance of dao token info
     * @param info Unstructured data, assumed to be json format
     */
    static with(info: any): DaoTokenInfo {

        const token = new DaoTokenInfo();

        token.ticker = info.ticker ?? "n/a"

        return token

    }

    // ============================================================
    // === Public API =============================================
    // ============================================================

    // Public Properties

    /// "ticker"(ish) string representing the dao lp token
    ticker: string

}