import React, {useMemo} from 'react';
import {Container, createTheme, globalCss, NextUIProvider, Theme, theme} from "@nextui-org/react";
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import {WalletAdapterNetwork} from '@solana/wallet-adapter-base';
import {PhantomWalletAdapter} from '@solana/wallet-adapter-wallets';
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui';
import {clusterApiUrl} from '@solana/web3.js';
import {Navbar} from "./components/Navbar";
import {Pools} from "./components/Pools";
import {Content} from "./components/Content";
import {Footer} from "./components/Footer";
import useDarkMode from "use-dark-mode"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Landing from "./pages/Landing";
import {Invest} from "./pages/Invest";
import {DAO} from "./pages/DAO";

// Default styles that can be overridden
require('@solana/wallet-adapter-react-ui/styles.css');

export const App = () => {

    // TODO - allow switching between networks
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [new PhantomWalletAdapter()],
        []
    );

    const darkTheme = createTheme({
        type: 'dark',
        theme: {
            colors: {
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

    const lightTheme = createTheme({
        type: "light",
        theme: {
            colors: {
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
        hr: {border: "1px solid " + theme.colors.border, margin: "5px 0"},
        h3: {color: theme.colors.foreground.computedValue + "!important"},
        "box-icon": {marginRight: "10px"},
        ".wallet-adapter-button-trigger": {background: theme.colors.gradient}
    })
    globalStyles();

    // Defaults to using system preference
    const darkMode = useDarkMode();

    return (
        <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    <WalletModalProvider>

                        {/* Components must be contained within here to maintain context */}
                        <BrowserRouter>
                            <Routes>
                                <Route path="/">
                                    <Route index element={<Landing/>}/>
                                    <Route path="invest" element={<Invest/>}/>
                                    <Route path="invest/preferred-equity/*" element={<DAO/>}/>
                                </Route>
                            </Routes>
                        </BrowserRouter>

                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </NextUIProvider>
    );
};