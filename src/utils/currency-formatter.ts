export class CurrencyFormatter {

    // ============================================================
    // === Public Static API ======================================
    // ============================================================

    // Public Static Methods

    /**
     * Format usdc based on size
     * @param value
     * @param long
     */
    static formatUsdc(value: number, long = false): string {

        const millions = value / 1_000_000;

        if (millions < 1 || long) {
            return `${value.toLocaleString("en-US")} USDC`
        }

        if (millions % 1 !== 0) {
            return `${(millions).toFixed(1)}M USDC`;
        }

        return `${millions}M USDC`
    }

    /**
     * Format USD based on size
     * @param value
     * @param long
     */
    static formatUsd(value: number, long = false): string {

        const millions = value / 1_000_000;

        if (millions < 1 || long) {
            return `$${value.toLocaleString("en-US")}`
        }

        if (millions % 1 !== 0) {
            return `$${millions.toFixed(1)}M`
        }

        return `$${millions}`

    }

}