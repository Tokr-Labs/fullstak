import React from "react";
import {Grid, useTheme} from "@nextui-org/react";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {Link} from "react-router-dom";

export const Navbar = () => {

    const theme = useTheme();

    return (
        <Grid.Container gap={1}>
            <Grid xs={6} alignItems={"center"}>
                <Link to="/">
                    <img src={require("src/assets/tokr_" + (theme.isDark ? "dark" : "light") + ".png")}
                         height={"auto"}
                         width={"150px"}
                         alt={"tokr logo"}/>
                </Link>
            </Grid>
            <Grid xs={6} justify={"flex-end"} alignItems={"center"}>
                <WalletMultiButton/>
            </Grid>
        </Grid.Container>
    )
}