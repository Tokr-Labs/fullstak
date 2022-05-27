import {DaoFundDetails} from "./dao-fund-details";
import {DaoAddresses} from "./dao-addresses";
import {DaoStakeholders} from "./dao-stakeholders";
import {DaoTokenInfo} from "./dao-token-info";
import {DaoPerformanceMetrics} from "./dao-performance-metrics";

export class DaoInfo {

    // ============================================================
    // === Public Static API ======================================
    // ============================================================

    // Public Static Methods

    /**
     * Factory method for creating an instance of dao info
     * @param info Unstructured data, assumed to be json format
     */
    static with(info?: any): DaoInfo {

        const daoInfo = new DaoInfo()

        daoInfo.name = info?.name ?? "";
        daoInfo.description = info?.description ?? "";
        daoInfo.active = info?.active ?? false;
        daoInfo.token = DaoTokenInfo.with(info?.token ?? {});
        daoInfo.stakeholders = DaoStakeholders.with(info?.stakeholders ?? {});
        daoInfo.details = DaoFundDetails.with(info?.details ?? {});
        daoInfo.addresses = DaoAddresses.with(info?.addresses ?? {});
        daoInfo.performance = DaoPerformanceMetrics.with(info?.performance ?? {});

        return daoInfo;

    }

    // ============================================================
    // === Public API =============================================
    // ============================================================

    // Public Properties

    /// name of the dao fund
    name: string

    /// brief description of the funds mission / purpose
    description: string

    /// whether or not the dao is active (dont raising) or currently open (currently raising)
    active: boolean

    /// LP Token associated with the dao
    token: DaoTokenInfo

    /// parties of interest to the dao
    stakeholders: DaoStakeholders

    /// key metrics of the fund
    details: DaoFundDetails

    /// Public keys of the daos main components
    addresses: DaoAddresses

    /// metrics for active funds
    performance: DaoPerformanceMetrics

}