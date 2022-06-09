import React, {useContext, useEffect, useState} from "react";
import {NetworkContext} from "../App";
import {ENV, Strategy, TokenInfo, TokenListProvider} from "@solana/spl-token-registry";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";

export const useTokenRegistry = () => {

    const [called, setCalled] = useState(false);
    const {network} = useContext(NetworkContext);
    const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map());

    useEffect(() => {
        if (!called) {

            new TokenListProvider().resolve(Strategy.GitHub).then(tokens => {
                const tokenList = tokens.filterByChainId(
                    network === WalletAdapterNetwork.Mainnet
                        ? ENV.MainnetBeta
                        : ENV.Devnet
                ).getList();

                setTokenMap(tokenList.reduce((map, item) => {
                    map.set(item.address, item);
                    return map;
                }, new Map()));
            });

            setCalled(true);

        }

    }, [called, network]);

    return tokenMap
}