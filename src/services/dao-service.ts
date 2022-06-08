import {DaoInfo} from "../models/dao/dao-info";
import {DaoCollection} from "../models/dao/dao-collection";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";

export class DaoService {

    // ============================================================
    // === Private Static API =====================================
    // ============================================================

    // Private Static Properties

    private static get localnetDaos(): DaoCollection {

        return {
            open: [],
            active: []
        }

    }

    private static get devnetDaos(): DaoCollection {

        const mf1 = require("../daos/devnet/demo.json");
        const enj = require("../daos/devnet/enj.json");
        const ez = require("../daos/devnet/ez.json");

        return {
            open: [
                DaoInfo.with(mf1)
            ],
            active: [
                DaoInfo.with(enj),
                DaoInfo.with(ez)
            ]
        }

    }

    private static get mainnetDaos(): DaoCollection {

        return {
            open: [],
            active: []
        }

    }

    private static get emptyDaos(): DaoCollection {

        return {
            open: [],
            active: []
        }

    }

    // ============================================================
    // === Public API =============================================
    // ============================================================

    // Public Methods

    async getDaos(network: WalletAdapterNetwork | "localnet"): Promise<DaoCollection> {

        console.log("getting daos for network", network);

        switch (network) {
            case "localnet": return DaoService.localnetDaos
            case "devnet": return DaoService.devnetDaos
            case "mainnet-beta": return DaoService.mainnetDaos
            default: return DaoService.emptyDaos
        }

    }

}