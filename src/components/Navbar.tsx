import React, {useEffect, useState} from "react";
import {Button, Grid, Spacer, useTheme} from "@nextui-org/react";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {Link, useNavigate} from "react-router-dom";

export const Navbar = () => {

    const theme = useTheme();

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
        <Grid.Container gap={1}>

            <Grid xs={4} alignItems={"center"}>
                <Link to="/">
                    <img src={require("src/assets/tokr_" + (theme.isDark ? "dark" : "light") + ".png")}
                         height={"auto"}
                         width={"150px"}
                         alt={"tokr logo"}/>
                </Link>
            </Grid>

            <Grid xs={4} justify={"center"} alignItems={"center"}>
                <Button color={"gradient"}
                        ghost={tab !== "Markets"}
                        shadow={tab === "Markets"}
                        onClick={() => handleClick("Markets")}
                >
                    Markets
                </Button>
                <Spacer x={1}/>
                <Button color={"gradient"}
                        ghost={tab !== "Portfolio"}
                        shadow={tab === "Portfolio"}
                        onClick={() => handleClick("Portfolio")}
                >
                    Portfolio
                </Button>
            </Grid>

            <Grid xs={4} justify={"flex-end"} alignItems={"center"}>
                <WalletMultiButton/>
            </Grid>

        </Grid.Container>
    )
}