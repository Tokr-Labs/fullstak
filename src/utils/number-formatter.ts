export class NumberFormatter {

    // ============================================================
    // === Public Static API ======================================
    // ============================================================

    // Public Static Methods

    /**
     * Format a percentage to the precision specified
     * @param value value to format. value should be represented by the percentage * (10 ^ 4).
     * @param precision how many decimal places to go out to
     * @param suffix
     */
    static formatPercentage(value: number, precision: number = 2, suffix: string = "%" ): string {

        const percentage = value / Math.pow(10,4)

        return `${(percentage * 100).toFixed(precision)}${suffix}`;

    }

}