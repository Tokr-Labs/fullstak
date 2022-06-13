import {DaoInfo} from "../models/dao/dao-info";
import {DaoCollection} from "../models/dao/dao-collection";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import mf1 from "../daos/devnet/mf1.json";
import gqr from "../daos/devnet/gqr.json";
import enj from "../daos/devnet/enj.json";
import ez from "../daos/devnet/ez.json";

export class DaoService {

    // ============================================================
    // === Private Static API =====================================
    // ============================================================

    // Private Static Properties

    private static get localnetDaos(): DaoCollection {

        return {
            open: [],
            active: [],
            all: [],
        }

    }

    private static get devnetDaos(): DaoCollection {

        return {
            open: [
                DaoInfo.with(mf1),
                DaoInfo.with(gqr)
            ],
            active: [
                DaoInfo.with(enj),
                DaoInfo.with(ez)
            ],
            all: [
                DaoInfo.with(mf1),
                DaoInfo.with(gqr),
                DaoInfo.with(enj),
                DaoInfo.with(ez),
            ],
        }

    }

    private static get mainnetDaos(): DaoCollection {

        return {
            open: [],
            active: [],
            all: [],
        }

    }

    private static get emptyDaos(): DaoCollection {

        return {
            open: [],
            active: [],
            all: [],
        }

    }

    // ============================================================
    // === Public API =============================================
    // ============================================================

    // Public Methods

    async getDaos(network: WalletAdapterNetwork | string): Promise<DaoCollection> {

        console.log("getting daos for network", network);

        switch (network) {
            case "localnet": return DaoService.localnetDaos
            case "devnet": return DaoService.devnetDaos
            case "mainnet-beta": return DaoService.mainnetDaos
            default: return DaoService.emptyDaos
        }

    }

}