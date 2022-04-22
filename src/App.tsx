import React, {useMemo} from 'react';
import {createTheme, globalCss, NextUIProvider, theme} from "@nextui-org/react";
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import {WalletAdapterNetwork} from '@solana/wallet-adapter-base';
import {PhantomWalletAdapter} from '@solana/wallet-adapter-wallets';
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui';
import {clusterApiUrl} from '@solana/web3.js';
import useDarkMode from "use-dark-mode"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Landing from "./pages/Landing";
import {Invest} from "./pages/Invest";

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
                                </Route>
                            </Routes>
                        </BrowserRouter>

                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </NextUIProvider>
    );
};