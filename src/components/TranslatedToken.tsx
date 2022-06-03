import React, {useContext, useEffect, useState} from 'react';
import {ENV, TokenInfo, TokenListProvider} from '@solana/spl-token-registry';
import {NetworkContext} from "../App";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";


export const TranslatedToken = (props: { mint: string, iconSize: number }) => {

    const {network} = useContext(NetworkContext);

    const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map());

    useEffect(() => {
        new TokenListProvider().resolve().then(tokens => {
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
    }, [network, setTokenMap]);

    const token = tokenMap.get(props.mint);
    if (!token || !token.logoURI) {
        console.log("Could not translate token with mint: " + props.mint)
        return <span>{props.mint}</span>;
    }

    return (
        <div style={{display: "flex", alignItems: "center"}}>
            <img
                src={token.logoURI}
                alt={token.name + " logo"}
                height={props.iconSize}
                width={props.iconSize}
                style={{marginRight: "10px"}}
            />
            <span>
                {`${token.name} (${token.symbol})`}
            </span>
        </div>
    )
}
