import React, {createContext, useMemo, useState} from 'react';
import {createTheme, globalCss, NextUIProvider, theme} from "@nextui-org/react";
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import {WalletAdapterNetwork} from '@solana/wallet-adapter-base';
import {PhantomWalletAdapter} from '@solana/wallet-adapter-wallets';
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui';
import {clusterApiUrl} from '@solana/web3.js';
import useDarkMode from "use-dark-mode"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Landing from "./pages/Landing";
import {Markets} from "./pages/Markets";
import {EquityMarkets} from "./components/EquityMarkets";
import {DebtMarkets} from "./components/DebtMarkets";
import {PoolDetail} from "./components/PoolDetail";
import {Portfolio} from "./pages/Portfolio";
import {PoolAssets} from "./components/pools/PoolAssets";
import {PoolMembers} from "./components/pools/PoolMembers";
import {PoolProposals} from "./components/pools/PoolProposals";
import {PoolTransactions} from "./components/pools/PoolTransactions";

// Default styles that can be overridden
require('@solana/wallet-adapter-react-ui/styles.css');


export const NetworkContext = createContext<{ network: WalletAdapterNetwork; setNetwork: React.Dispatch<React.SetStateAction<WalletAdapterNetwork>>; }>({
    network: WalletAdapterNetwork.Devnet,
    setNetwork: () => null
});

export const App = () => {

    const [network, setNetwork] = useState(WalletAdapterNetwork.Devnet);

    const wallets = useMemo(
        () => [new PhantomWalletAdapter()],
        []
    );

    // TODO - figure out how to included shared theme props
    const darkTheme = createTheme({
        type: 'dark',
        theme: {
            colors: {
                primary: "#be00ff",
                secondary: "$blue500",
                gradient: "linear-gradient(" +
                    "112deg, " +
                    "var(--nextui-colors-cyan500) -63.59%, " +
                    "#be00ff 20.3%, " +
                    "var(--nextui-colors-blue500) 75.46%" +
                    ")"
            }
        }
    })

    const lightTheme = createTheme({
        type: "light",
        theme: {
            colors: {
                primary: "#be00ff",
                secondary: "$blue500",
                gradient: "linear-gradient(" +
                    "112deg, " +
                    "var(--nextui-colors-cyan500) -63.59%, " +
                    "#be00ff 20.3%, " +
                    "var(--nextui-colors-blue500) 75.46%" +
                    ")"
            }
        }
    })

    const globalStyles = globalCss({
        hr: {border: "1px solid " + theme.colors.border, margin: "5px 0"},
        h3: {color: theme.colors.foreground.computedValue + "!important"},
        "box-icon": {marginRight: "10px"},
        ".wallet-adapter-button-trigger": {background: theme.colors.gradient},
        ".nextui-table-container": {width: "100%"}
    })
    globalStyles();

    // Defaults to using system preference
    const darkMode = useDarkMode();

    return (
        <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
            <NetworkContext.Provider value={{network, setNetwork}}>
                <ConnectionProvider endpoint={clusterApiUrl(network)}>
                    <WalletProvider wallets={wallets} autoConnect>
                        <WalletModalProvider>

                            {/* Components must be contained within here to maintain context */}
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/">

                                        <Route index element={<Landing/>}/>

                                        <Route path="markets" element={<Markets/>}>

                                            <Route index element={<EquityMarkets/>}/>
                                            <Route path="equity" element={<EquityMarkets/>}/>

                                            <Route path="equity/pool-details" element={<PoolDetail/>}>
                                                <Route index element={<PoolAssets/>}/>
                                                <Route path="assets" element={<PoolAssets/>}/>
                                                <Route path="members" element={<PoolMembers/>}/>
                                                <Route path="proposals" element={<PoolProposals/>}/>
                                                <Route path="transactions" element={<PoolTransactions/>}/>
                                            </Route>

                                            <Route path="debt" element={<DebtMarkets/>}/>

                                        </Route>

                                        <Route path="portfolio" element={<Portfolio/>}/>

                                    </Route>
                                </Routes>
                            </BrowserRouter>

                        </WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
            </NetworkContext.Provider>
        </NextUIProvider>
    );
};
