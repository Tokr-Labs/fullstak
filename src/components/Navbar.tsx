import React, {useContext, useEffect, useState} from "react";
import {Button, Grid, Popover, Spacer, useTheme} from "@nextui-org/react";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {Link, useNavigate} from "react-router-dom";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {NetworkContext} from "../App";
import {ServerIcon} from "./icons/ServerIcon";

export const Navbar = () => {

    const theme = useTheme();
    const {network, setNetwork} = useContext(NetworkContext)

    const [tab, setTab] = useState<string>();

    useEffect(() => {
        const pathname = window.location.pathname.split("/")[1];
        const capitalized = pathname.charAt(0).toUpperCase() + pathname.slice(1)
        setTab(capitalized);
    }, [])

    const navigate = useNavigate();

    const handleClick = (tab) => {
        setTab(tab)
        navigate("/" + tab.toLowerCase())
    }

    return (
        <>
            <Grid.Container  style={{
                position: "sticky",
                top: 0,
                zIndex: 1000
            }}>
                <Grid xs={12} style={{paddingTop: 0}}>
                    <div style={{
                        width: "100%",
                        fontWeight: "bold",
                        color: "white",
                        textAlign: "center",
                        padding: "5px",
                        marginBottom: "5px",
                        background: theme.theme?.colors.error.value,
                        display: network === WalletAdapterNetwork.Devnet || network === WalletAdapterNetwork.Testnet
                            ? "inline-block"
                            : "none"
                    }}>
                        Notice: You are currently on {network.toUpperCase()}
                    </div>
                </Grid>
            </Grid.Container>

            <Grid.Container gap={1}>

                <Grid xs={4} alignItems={"center"}>
                    <Link to="/">
                        <img src={require("src/assets/brand/fullstak_logo_white.png")}
                             height={"36px"}
                             width={"auto"}
                             alt={"Fullstak logo"}/>
                    </Link>
                </Grid>

                <Grid xs={4} justify={"center"} alignItems={"center"}>
                    <Button.Group
                        rounded
                        borderWeight={"light"}
                        animated={false}
                        ripple={false}
                        color={"secondary"}
                    >
                        <Button
                            ghost={tab !== "Markets"}
                            style={{fontWeight: "bold", minWidth: "150px", color: "white"}}
                            onClick={() => handleClick("Markets")}
                        >
                            MARKETS
                        </Button>
                        <Button
                            ghost={tab !== "Portfolio"}
                            style={{fontWeight: "bold", minWidth: "150px", color: "white"}}
                            onClick={() => handleClick("Portfolio")}
                        >
                            PORTFOLIO
                        </Button>
                    </Button.Group>
                </Grid>

                <Grid xs={4} justify={"flex-end"} alignItems={"center"}>
                    <Popover>
                        <Popover.Trigger>
                            <Button auto style={{background: "none", marginRight: "10px"}}>
                                <ServerIcon/>
                            </Button>
                        </Popover.Trigger>
                        <Popover.Content>
                            <div style={{padding: "20px", background: theme.theme?.colors.accents2.computedValue}}>
                                <h4>Change Network</h4>
                                <Button ghost={network !== WalletAdapterNetwork.Mainnet}
                                        color={"primary"}
                                        style={{fontWeight: "bold"}}
                                        onClick={() => setNetwork(WalletAdapterNetwork.Mainnet)}
                                >
                                    Mainnet
                                </Button>
                                <Spacer y={0.5}/>
                                <Button ghost={network !== WalletAdapterNetwork.Devnet}
                                        color={"primary"}
                                        style={{fontWeight: "bold"}}
                                        onClick={() => setNetwork(WalletAdapterNetwork.Devnet)}
                                >
                                    Devnet
                                </Button>
                            </div>
                        </Popover.Content>
                    </Popover>
                    <WalletMultiButton/>
                </Grid>

            </Grid.Container>
        </>
    )
}