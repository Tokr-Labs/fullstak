export enum DaoFundStrategyType {
    valueAdd,
    unknown
}

export class DaoFundStrategy {


    // ============================================================
    // === Public Static API ======================================
    // ============================================================

    // Public Static Methods

    /**
     * Factory method for creating an instance of dao fund strategy
     * @param type The type of strategy
     */
    static with(type: DaoFundStrategyType) {
        const strategy = new DaoFundStrategy();
        strategy.type = type;
        return strategy;
    }

    // ============================================================
    // === Public API =============================================
    // ============================================================

    // Public Properties

    /// strategy type
    type: DaoFundStrategyType

    /// display string for strategy type
    get description(): string {
        switch (this.type) {
            case DaoFundStrategyType.valueAdd:
                return "Value-Add"
            default:
                return "N/A"
        }
    }

}