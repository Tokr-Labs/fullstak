import React, {createContext, useMemo, useState} from 'react';
import {createTheme, globalCss, NextUIProvider, theme} from "@nextui-org/react";
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import {WalletAdapterNetwork} from '@solana/wallet-adapter-base';
import {PhantomWalletAdapter} from '@solana/wallet-adapter-wallets';
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui';
import {clusterApiUrl} from '@solana/web3.js';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Landing from "./pages/Landing";
import {Markets} from "./pages/Markets";
import {EquityMarkets} from "./components/EquityMarkets";
import {DebtMarkets} from "./components/DebtMarkets";
import {PoolDetail} from "./components/PoolDetail";
import {Portfolio} from "./pages/Portfolio";
import {PoolAssets} from "./components/pools/PoolAssets";
import {PoolMembers} from "./components/pools/PoolMembers";
import {PoolConfiguration} from "./components/pools/PoolConfiguration";
import {DaoInfoContext} from "./models/contexts/dao-context";
import {DaoInfo} from "./models/dao/dao-info";

// Default styles that can be overridden
require('@solana/wallet-adapter-react-ui/styles.css');

// TODO - separate into contexts directory
// TODO - add ability to pass in configs as well
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
    // const darkTheme = createTheme({
    //     type: 'dark',
    //     theme: {
    //         colors: {
    //             primary: "#be00ff",
    //             secondary: "$blue500",
    //             gradient: "linear-gradient(" +
    //                 "112deg, " +
    //                 "var(--nextui-colors-cyan500) -63.59%, " +
    //                 "#be00ff 20.3%, " +
    //                 "var(--nextui-colors-blue500) 75.46%" +
    //                 ")"
    //         },
    //         fonts: {
    //             sans: "Montserrat, sans-serif",
    //             mono: "'PT Mono', source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"
    //         }
    //     }
    // })

    const lightTheme = createTheme({
        type: "light",
        theme: {
            colors: {
                primary: "#be00ff",
                primaryLight: "rgba(190,0,255,0.25)",
                secondary: "#650087",
                success: "#00ff4b",
                gradient: "linear-gradient(" +
                    "112deg, " +
                    "var(--nextui-colors-cyan500) -63.59%, " +
                    "#be00ff 20.3%, " +
                    "var(--nextui-colors-blue500) 75.46%" +
                    ")"
            },
            fonts: {
                sans: "Montserrat, sans-serif",
                mono: "'PT Mono', source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"
            }
        }
    })

    const globalStyles = globalCss({
        hr: {
            margin: "5px 0",
            border: "1px solid " + theme.colors.primary.computedValue + " !important"
        },
        "box-icon": {marginRight: "10px"},
        ".wallet-adapter-button-trigger": {
            background: theme.colors.primary.computedValue + " !important",
            borderRadius: theme.radii.pill.computedValue + " !important",
            height: "40px !important",
            fontFamily: "Montserrat, sans-serif !important"
        },
        ".nextui-table-container": {width: "100%"},
        ".nextui-table-column-header": {
            fontSize: 12,
            fontWeight: "normal",
            letterSpacing: 1.6
        },
        ".nextui-table-cell": {
            fontSize: 14,
            fontWeight: "$semibold",
            letterSpacing: 1.87
        },
        ".skinny-rows .nextui-table-cell": {
            paddingTop: theme.space["2"].computedValue,
            paddingBottom: theme.space["2"].computedValue
        },
        ".nextui-c-bfHnFD": {padding: "30px 0 0 30px !important"}, // Card headers
        ".dark-card": {background: "linear-gradient(180deg, rgba(12,2,35,1) 0%, rgba(28,5,73,1) 100%) !important"},
        ".dark-card .nextui-c-PJLV-ijXuRFq-css, .dark-card input, .dark-card label": {color: "white"},
    })
    globalStyles();

    const dao = useMemo(() => {
        // @TODO: need to update this when a dap is chosen from the markets landing page
        const data = require("src/daos/devnet/mf1.json")
        return DaoInfo.with(data);
    }, []);

    // // Defaults to using system preference
    // const darkMode = useDarkMode();

    return (
        <NextUIProvider theme={lightTheme}>
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

                                            <Route path="equity/pool-details" element={
                                                <DaoInfoContext.Provider value={dao}>
                                                    <PoolDetail/>
                                                </DaoInfoContext.Provider>
                                            }>
                                                <Route index element={<PoolAssets/>}/>
                                                <Route path="assets" element={<PoolAssets/>}/>
                                                <Route path="members" element={<PoolMembers/>}/>
                                                <Route path="configuration" element={<PoolConfiguration/>}/>
                                                {/*<Route path="proposals" element={<PoolProposals/>}/>*/}
                                                {/*<Route path="transactions" element={<PoolTransactions/>}/>*/}
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
