import React from "react";
import {DaoInfo} from "../dao/dao-info";

export const DaoInfoContext = React.createContext<{dao: DaoInfo, setDao: React.Dispatch<React.SetStateAction<DaoInfo>>}>({
    dao: DaoInfo.with({}),
    setDao: () => null
})
