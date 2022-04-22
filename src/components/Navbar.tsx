import React, {useState} from "react";
import {Button, Grid, Spacer, useTheme} from "@nextui-org/react";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {Link} from "react-router-dom";

export const Navbar = () => {

    const theme = useTheme();

    const [tab, setTab] = useState("Markets");

    const handleClick = (tab) => {
        setTab(tab)
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
                        disabled
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