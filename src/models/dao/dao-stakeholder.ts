import {DaoStakeholders} from "./dao-stakeholders";

export class DaoStakeholder {

    // ============================================================
    // === Public Static API ======================================
    // ============================================================

    // Public Static Methods

    /**
     * Factory method for creating an instance of dao stakeholder
     * @param info Unstructured data, assumed to be json format
     */
    static with(info: any): DaoStakeholder {

        const stakeholder = new DaoStakeholder()

        stakeholder.name = info.name;
        stakeholder.company = info.name;
        stakeholder.image = info.image;

        return stakeholder;

    }

    // ============================================================
    // === Public API =============================================
    // ============================================================

    // Public Properties

    /// name od the stakeholder
    name: string

    /// company the stakeholder is associated with
    company: string

    /// image reference of the stakeholder
    image: string

}