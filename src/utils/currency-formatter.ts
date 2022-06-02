export class CurrencyFormatter {

    // ============================================================
    // === Public Static API ======================================
    // ============================================================

    // Public Static Methods

    /**
     * Format usdc based on size
     * @param value
     * @param symbol
     * @param long
     * @param decimals
     */
    static formatToken(value: number, symbol: string, long = false, decimals = 2): string {

        const millions = value / 1_000_000;

        if (millions < 1 || long) {
            return `${value.toLocaleString("en-US")} ${symbol}`
        }

        if (millions % 1 !== 0) {
            return `${(millions).toFixed(decimals)}M ${symbol}`;
        }

        return `${millions}M ${symbol}`
    }

    /**
     * Format USD based on size
     * @param value
     * @param long
     * @param decimals
     */
    static formatUsd(value: number, long = false, decimals = 2): string {

        const millions = value / 1_000_000;

        if (millions < 1 || long) {
            return `$${value.toLocaleString("en-US")}`
        }

        if (millions % 1 !== 0) {
            return `$${millions.toFixed(decimals)}M`
        }

        return `$${millions}`

    }

}