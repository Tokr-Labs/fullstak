import React, {useContext, useEffect, useState} from "react";
import {Button, Grid, Modal, Popover, Spacer, Text, theme} from "@nextui-org/react";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {Link, useNavigate} from "react-router-dom";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {ServerIcon} from "./icons/server-icon";
import {MenuIcon} from "./icons/menu-icon";
import {NetworkContext} from "../models/contexts/network-context";

export const Navbar = () => {

    const {network, setNetwork} = useContext(NetworkContext)

    const [tab, setTab] = useState<string>();

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState)
    }

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
            {/*Background - escapes the bounds of the container*/}
            <div style={{
                background: theme.colors.gradient.computedValue,
                height: "238px",
                zIndex: -1,
                width: "100vw",
                top: 0,
                left: 0,
                position: "absolute"
            }}/>

            <Grid.Container style={{
                position: "sticky",
                top: 0,
                zIndex: 1000
            }}>
                <Grid xs={12} style={{paddingTop: 0}}>
                    <div style={{
                        width: "100%",
                        fontWeight: theme.fontWeights.bold.computedValue,
                        color: "white",
                        textAlign: "center",
                        padding: "5px",
                        marginBottom: "5px",
                        background: theme.colors.error.computedValue,
                        display: network === WalletAdapterNetwork.Devnet || network === WalletAdapterNetwork.Testnet
                            ? "inline-block"
                            : "none"
                    }}>
                        Notice: You are currently on {network.toUpperCase()}
                    </div>
                </Grid>
            </Grid.Container>

            <Grid.Container
                gap={1}
                alignItems={"center"}
                style={{
                    paddingBottom: "30px",
                    paddingTop: network === WalletAdapterNetwork.Devnet ? "1px" : "40px",
                    paddingLeft: 0,
                    paddingRight: 0
                }}
            >

                <Grid xs={9} sm={4}>
                    <Link to="/">
                        <img
                            src={require("src/assets/brand/fullstak_logo_white.png")}
                            height={"46px"}
                            width={"auto"}
                            alt={"Fullstak logo"}
                            style={{maxHeight: "min(46px, 7vw)"}}
                        />
                    </Link>
                </Grid>

                <Grid xs={0} sm={4} justify={"center"}>
                    <Button.Group
                        rounded
                        borderWeight={"light"}
                        animated={false}
                        ripple={false}
                        color={"secondary"}
                    >
                        <Button
                            ghost={tab !== "Markets"}
                            style={{fontWeight: theme.fontWeights.bold.computedValue, minWidth: "150px", color: "white"}}
                            onClick={() => handleClick("Markets")}
                        >
                            MARKETS
                        </Button>
                        <Button
                            ghost={tab !== "Portfolio"}
                            style={{
                                fontWeight: theme.fontWeights.bold.computedValue,
                                minWidth: "150px",
                                color: "white"
                            }}
                            onClick={() => handleClick("Portfolio")}
                        >
                            PORTFOLIO
                        </Button>
                    </Button.Group>
                </Grid>

                <Grid xs={0} sm={4} justify={"flex-end"}>
                    <Popover>
                        <Popover.Trigger>
                            <Button auto style={{background: "none", marginRight: "10px"}}>
                                <ServerIcon color={"white"}/>
                            </Button>
                        </Popover.Trigger>
                        <Popover.Content>
                            <div style={{padding: "20px", background: theme.colors.accents2.computedValue}}>
                                <h4>Change Network</h4>
                                <Button
                                    ghost={network !== WalletAdapterNetwork.Mainnet}
                                    color={"primary"}
                                    style={{fontWeight: theme.fontWeights.bold.computedValue}}
                                    onClick={() => setNetwork(WalletAdapterNetwork.Mainnet)}
                                >
                                    Mainnet
                                </Button>
                                <Spacer y={0.5}/>
                                <Button
                                    ghost={network !== WalletAdapterNetwork.Devnet}
                                    color={"primary"}
                                    style={{fontWeight: theme.fontWeights.bold.computedValue}}
                                    onClick={() => setNetwork(WalletAdapterNetwork.Devnet)}
                                >
                                    Devnet
                                </Button>
                            </div>
                        </Popover.Content>
                    </Popover>
                    <WalletMultiButton/>
                </Grid>

                <Grid xs={3} sm={0} justify={"flex-end"}>
                    <Modal
                        closeButton
                        aria-labelledby={"menu-modal-title"}
                        open={menuOpen}
                        onClose={toggleMenu}
                    >

                        <Modal.Header>
                            <Text id={"menu-modal-title"} size={18} weight={"bold"}>Menu</Text>
                        </Modal.Header>

                        <Modal.Body>

                            <Button
                                style={{fontWeight: theme.fontWeights.bold.computedValue, color: "white"}}
                                onClick={() => handleClick("Markets")}
                            >
                                MARKETS
                            </Button>

                            <Button
                                style={{fontWeight: theme.fontWeights.bold.computedValue, color: "white"}}
                                onClick={() => handleClick("Portfolio")}
                            >
                                PORTFOLIO
                            </Button>

                            <Popover>
                                <Popover.Trigger>
                                    <Button style={{fontWeight: theme.fontWeights.bold.computedValue}}>
                                        <ServerIcon color={"white"}/>
                                        &nbsp;
                                        <Text color={"white"} weight={"bold"}>CHANGE NETWORK</Text>
                                    </Button>
                                </Popover.Trigger>
                                <Popover.Content>
                                    <div style={{padding: "20px", background: theme.colors.accents2.computedValue}}>
                                        <h4>Change Network</h4>
                                        <Button
                                            disabled
                                            ghost={network !== WalletAdapterNetwork.Mainnet}
                                            color={"primary"}
                                            style={{fontWeight: theme.fontWeights.bold.computedValue}}
                                            onClick={() => setNetwork(WalletAdapterNetwork.Mainnet)}
                                        >
                                            Mainnet
                                        </Button>
                                        <Spacer y={0.5}/>
                                        <Button
                                            ghost={network !== WalletAdapterNetwork.Devnet}
                                            color={"primary"}
                                            style={{fontWeight: theme.fontWeights.bold.computedValue}}
                                            onClick={() => setNetwork(WalletAdapterNetwork.Devnet)}
                                        >
                                            Devnet
                                        </Button>
                                    </div>
                                </Popover.Content>
                            </Popover>

                        </Modal.Body>

                        <Modal.Footer/>

                    </Modal>

                    <Button auto onClick={toggleMenu} style={{height: "35px"}}>
                        <MenuIcon/>
                    </Button>
                </Grid>

            </Grid.Container>
        </>
    )
}