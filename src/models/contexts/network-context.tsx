import React, {createContext} from "react";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";

export const NetworkContext = createContext<{
    network: WalletAdapterNetwork | string;
    setNetwork: React.Dispatch<React.SetStateAction<WalletAdapterNetwork | string>>;
}>({
    network: WalletAdapterNetwork.Devnet,
    setNetwork: () => null
});