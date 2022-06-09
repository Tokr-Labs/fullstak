import React, {useMemo, useState} from 'react';
import {NextUIProvider} from "@nextui-org/react";
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
import {FundDetails} from "./components/fund-details";
import {Portfolio} from "./pages/Portfolio";
import {FundAssets} from "./components/fund/fund-assets";
import {FundMembers} from "./components/fund/fund-members";
import {FundConfiguration} from "./components/fund/fund-configuration";
import {DaoInfoContext} from "./models/contexts/dao-context";
import {DaoInfo} from "./models/dao/dao-info";
import Faucet from "./pages/Faucet";
import {useTokenRegistry} from "./hooks/token-registry";
import {TokenRegistryContext} from "./models/contexts/token-registry-context";
import {NotFound} from "./pages/not-found";
import {darkTheme, globalStyles, lightTheme} from "./themes";
import { NetworkContext } from './models/contexts/network-context';
import useDarkMode from 'use-dark-mode';

// Default styles that can be overridden
require('@solana/wallet-adapter-react-ui/styles.css');

export const App = () => {

    const [network, setNetwork] = useState(WalletAdapterNetwork.Devnet);

    const [dao, setDao] = useState<DaoInfo>(DaoInfo.with({}));

    const tokenMap = useTokenRegistry();

    const wallets = useMemo(
        () => [new PhantomWalletAdapter()],
        []
    );

    globalStyles();

    // // Defaults to using system preference
    const darkMode = useDarkMode();

    return (
        <NextUIProvider theme={darkMode ? darkTheme : lightTheme}>
            <NetworkContext.Provider value={{network, setNetwork}}>
                <ConnectionProvider endpoint={clusterApiUrl(network)}>
                    <WalletProvider wallets={wallets} autoConnect>
                        <WalletModalProvider>
                            <TokenRegistryContext.Provider value={tokenMap}>
                                <DaoInfoContext.Provider value={{dao, setDao}}>

                                {/* Components must be contained within here to maintain context */}
                                <BrowserRouter>
                                    <Routes>
                                        <Route path="/">

                                            <Route index element={<Landing/>}/>

                                            <Route path="markets" element={<Markets/>}>

                                                <Route index element={<EquityMarkets/>}/>
                                                <Route path="equity" element={<EquityMarkets/>}/>

                                                <Route path="equity/:ticker/fund-details" element={<FundDetails/>}>
                                                    <Route index element={<FundAssets/>}/>
                                                    <Route path="assets" element={<FundAssets/>}/>
                                                    <Route path="members" element={<FundMembers/>}/>
                                                    <Route path="configuration" element={<FundConfiguration/>}/>
                                                    {/*<Route path="proposals" element={<FundProposals/>}/>*/}
                                                    {/*<Route path="transactions" element={<FundTransactions/>}/>*/}
                                                </Route>

                                                <Route path="debt" element={<DebtMarkets/>}/>

                                            </Route>

                                            <Route path="portfolio" element={<Portfolio/>}/>

                                            <Route path="faucet" element={<Faucet/>}/>

                                            <Route path="*" element={<NotFound/>}/>

                                        </Route>
                                    </Routes>
                                </BrowserRouter>

                                </DaoInfoContext.Provider>
                            </TokenRegistryContext.Provider>
                        </WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
            </NetworkContext.Provider>
        </NextUIProvider>
    );
};
