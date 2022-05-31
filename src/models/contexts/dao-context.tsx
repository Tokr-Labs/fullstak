import React from "react";
import {DaoInfo} from "../dao/dao-info";

export const DaoInfoContext = React.createContext<DaoInfo>(
    DaoInfo.with({})
)
