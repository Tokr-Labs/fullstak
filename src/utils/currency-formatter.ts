export class CurrencyFormatter {

    // ============================================================
    // === Public Static API ======================================
    // ============================================================

    // Public Static Methods

    /**
     * Format usdc based on size
     * @param value
     */
    static formatUsdc(value: number, long = false): string {

        const millions = value / 1000000;

        if (millions < 1 || long) {
            return `${value.toLocaleString("en-US")} USDC`
        }

        if (millions % 1 !== 0) {
            return `${(millions).toFixed(1)}M USDC`;
        }

        return `${millions}M USDC`
    }

}