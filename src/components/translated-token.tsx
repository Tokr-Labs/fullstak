import React, {useContext} from 'react';
import {TokenRegistryContext} from "../models/contexts/token-registry-context";


export const TranslatedToken = (props: { mint: string, iconSize: number }) => {

    const tokenMap = useContext(TokenRegistryContext);

    const token = tokenMap.get(props.mint);
    if (!token || !token.logoURI) {
        // console.log("Could not translate token with mint: " + props.mint)
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
