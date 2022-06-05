import {DaoInfo} from "./dao-info";

export interface DaoCollection {
    active: DaoInfo[],
    open: DaoInfo[]
}