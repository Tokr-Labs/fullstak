import React, {createContext} from "react";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";

export const NetworkContext = createContext<{ network: WalletAdapterNetwork; setNetwork: React.Dispatch<React.SetStateAction<WalletAdapterNetwork>>; }>({
    network: WalletAdapterNetwork.Devnet,
    setNetwork: () => null
});