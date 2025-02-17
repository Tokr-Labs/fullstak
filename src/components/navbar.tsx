import React, {useContext, useEffect, useState} from "react";
import {Button, Grid, Modal, Popover, Spacer, Switch, Text, theme} from "@nextui-org/react";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {Link, useNavigate} from "react-router-dom";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {NetworkContext} from "../models/contexts/network-context";
import useDarkMode from "use-dark-mode";
import {FaMoon, FaServer, FaSun} from "react-icons/fa";
import {IoIosMenu} from "react-icons/io";

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

    const darkMode = useDarkMode();

    return (
        <>
            {/*Background - escapes the bounds of the container*/}
            <div style={{
                // background: theme.colors.gradient.computedValue,
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
                <Grid xs={12} style={{paddingTop: 60}}>
                    {/* <div style={{
                        width: "100%",
                        fontWeight: theme.fontWeights.bold.computedValue,
                        color: "white",
                        textAlign: "center",
                        padding: "5px",
                        marginBottom: "5px",
                        borderBottomLeftRadius: theme.radii.sm.computedValue,
                        borderBottomRightRadius: theme.radii.sm.computedValue,
                        background: theme.colors.error.computedValue,
                        display: network === WalletAdapterNetwork.Devnet || network === WalletAdapterNetwork.Testnet
                            ? "inline-block"
                            : "none"
                    }}>
                        Notice: You are currently on {network.toUpperCase()}
                    </div> */}
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

                <Grid xs={9} md={4}>
                    <Link to="/" style={{height: 40}}>
                        <img
                            src={require("src/assets/brand/rhove_logo_white.png")}
                            height={"40px"}
                            width={"auto"}
                            alt={"Fullstak logo"}
                            style={{maxHeight: "min(46px, 7vw)"}}
                        />
                    </Link>
                </Grid>

                <Grid xs={0} md={4} justify={"center"}>
                    <Button.Group
                        rounded={false}
                        borderWeight={"light"}
                        animated={false}
                        ripple={false}
                        color={"secondary"}
                        style={{margin: 0}}
                    >
                        <Button
                            ghost={tab !== "Markets"}
                            style={{
                                fontWeight: theme.fontWeights.bold.computedValue,
                                minWidth: "150px",
                                color: "white"
                            }}
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

                <Grid xs={0} md={4} justify={"flex-end"}>

                    <Button
                        auto
                        bordered
                        borderWeight={"light"}
                        color={"secondary"}
                        style={{
                            borderRadius: 0,
                            fontWeight: theme.fontWeights.bold.computedValue,
                            color: "white"
                        }}
                    >
                        0.0000
                        <img
                            src={"/tokr_labs.png"}
                            alt={"tokr logo"}
                            height={25}
                            width={25}
                            style={{marginLeft: 10}}
                        />
                    </Button>

                    <Popover>
                        <Popover.Trigger>
                            <Button auto animated={false} style={{background: "none", marginLeft: 20}}>
                                <FaServer style={{height: 20, width: 20}}/>
                            </Button>
                        </Popover.Trigger>
                        <Popover.Content>
                            <div style={{padding: "20px", background: theme.colors.backgroundContrast.computedValue,color: "black"}}>
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
                                    style={{fontWeight: theme.fontWeights.bold.computedValue, color: "black"}}
                                    onClick={() => setNetwork(WalletAdapterNetwork.Devnet)}
                                    
                                >
                                    Devnet
                                </Button>
                            </div>
                        </Popover.Content>
                    </Popover>
                    <WalletMultiButton/>
                </Grid>

                {/* Mobile nav */}
                <Grid xs={3} md={0} justify={"flex-end"}>
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

                            <Button style={{fontWeight: theme.fontWeights.bold.computedValue, color: "white"}}>
                                0.0000
                                <img
                                    src={"/tokr_labs.png"}
                                    alt={"tokr logo"}
                                    height={25}
                                    width={25}
                                    style={{marginLeft: 10}}
                                />
                            </Button>

                            <Popover>
                                <Popover.Trigger>
                                    <Button style={{fontWeight: theme.fontWeights.bold.computedValue}}>
                                        <FaServer style={{marginRight: 10}}/>
                                        <Text color={"black"} weight={"bold"}>CHANGE NETWORK</Text>
                                    </Button>
                                </Popover.Trigger>
                                <Popover.Content>
                                    <div style={{
                                        padding: "20px",
                                        background: theme.colors.backgroundContrast.computedValue
                                    }}>
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

                        <Modal.Footer>
                            {/* <Switch
                                size={"lg"}
                                color={"primary"}
                                checked={darkMode.value}
                                onChange={darkMode.toggle}
                                iconOff={<FaSun/>}
                                iconOn={<FaMoon/>}
                                aria-label={"Toggle theme"}
                            /> */}
                        </Modal.Footer>

                    </Modal>

                    <Button auto onClick={toggleMenu} style={{height: "35px"}}>
                        <IoIosMenu style={{height: 30, width: 30}}/>
                    </Button>
                </Grid>

            </Grid.Container>
        </>
    )
}