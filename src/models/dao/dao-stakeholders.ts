import {DaoStakeholder} from "./dao-stakeholder";

export class DaoStakeholders {

    // ============================================================
    // === Public Static API ======================================
    // ============================================================

    // Public Static Methods

    /**
     * Factory method for creating an instance of dao stakeholders
     * @param info Unstructured data, assumed to be json format
     */
    static with(info): DaoStakeholders {

        const stakeholders = new DaoStakeholders()

        stakeholders.sponsor = DaoStakeholder.with(info?.sponsor ?? {})
        stakeholders.chairman = DaoStakeholder.with(info?.chairman ?? {})
        stakeholders.delegate = DaoStakeholder.with(info?.delegate ?? {})

        return stakeholders;

    }

    // ============================================================
    // === Public API =============================================
    // ============================================================

    // Public Properties

    /// General partner of the dao fund
    sponsor: DaoStakeholder

    /// Chairman of the dao fund
    chairman: DaoStakeholder

    /// investment manager of the dao and its treasury accounts
    delegate: DaoStakeholder

}