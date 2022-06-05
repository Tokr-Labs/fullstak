import React, {createContext} from "react";
import {TokenInfo} from "@solana/spl-token-registry";

export const TokenRegistryContext = createContext<Map<string, TokenInfo>>(
    new Map()
)