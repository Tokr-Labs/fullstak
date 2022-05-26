import {DaoTargetReturns} from "./dao-target-returns";
import {DaoFees} from "./dao-fees";

export class DaoFundDetails {

    // ============================================================
    // === Public Static API ======================================
    // ============================================================

    // Public Static Methods

    /**
     * Factory method for creating an instance of dao details
     * @param info Unstructured data, assumed to be json format
     */
    static with(info: any): DaoFundDetails {

        const details = new DaoFundDetails()

        details.minRaise = info.min_raise ?? 1
        details.maxRaise = info.max_raise ?? 1000000000
        details.minInvestment = info.min_investment ?? 100000

        const seconds = info.raise_close ?? 0
        const date = new Date(seconds * 1000)
        const tzOffset = date.getTimezoneOffset() * 1000 * 60

        details.raiseClose = new Date(date.getTime() + tzOffset);

        details.vintageYear = `${info.vintage_year}` ?? ""
        details.fundTerm = info.fund_term ?? 1;
        details.dataRoom = info.data_room ?? "";
        details.targetReturns = DaoTargetReturns.with(info.target_returns)
        details.fees = DaoFees.with(info.fees)

        return details;

    }

    // ============================================================
    // === Public API =============================================
    // ============================================================

    // Public Properties

    /// minimum amount to raise in order to move into an active state (USD)
    minRaise: number

    /// maximum amount that can be raised for this fund (USD)
    maxRaise: number

    /// minimum investment for an lp (USD)
    minInvestment: number

    /// date in epoch time
    raiseClose: Date

    /// @TODO: Add docs
    vintageYear: string

    /// number in years
    fundTerm: number

    /// @TODO: Add docs
    dataRoom: string

    /// @TODO: Add docs
    targetReturns: DaoTargetReturns

    /// @TODO: Add docs
    fees: DaoFees

    get formattedMinRaise(): string {
        return `$${this.minRaise.toLocaleString("en-US")}`
    }

    get formattedMaxRaise(): string {
        return `$${this.maxRaise.toLocaleString("en-US")}`
    }

    get formattedMinInvestment(): string {
        return `$${this.minInvestment.toLocaleString("en-US")}`
    }

    get formattedRaiseClose(): string {

        return this.raiseClose.toLocaleDateString('en-us', {
            year: "numeric",
            month: "long",
            day: "numeric"
        })
    }

    get formattedFundTerm(): string {
        return `${this.fundTerm} years`
    }

}