import React, {createContext} from "react";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";

// TODO - separate into contexts directory
// TODO - add ability to pass in configs as well
export const NetworkContext = createContext<{ network: WalletAdapterNetwork; setNetwork: React.Dispatch<React.SetStateAction<WalletAdapterNetwork>>; }>({
    network: WalletAdapterNetwork.Devnet,
    setNetwork: () => null
});