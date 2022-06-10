import React from "react";
import {Grid, Link, Switch, Text, theme} from "@nextui-org/react";
import discordLogo from "src/assets/icons/discord_icon.svg"
import twitterLogo from "src/assets/icons/icons-twitter_export.svg"
import {SunIcon} from "./icons/SunIcon";
import {MoonIcon} from "./icons/MoonIcon";
import useDarkMode from "use-dark-mode";

require("boxicons");

export const Footer = () => {

    const darkMode = useDarkMode();

    return (
        <div style={{marginTop: "auto", height: "60px"}}>

            {/*Background - escapes bounds of the container*/}
            <div style={{
                background: "linear-gradient(0deg, rgba(12,2,35,1) 0%, rgba(28,5,73,1) 100%)",
                height: "60px",
                zIndex: -1,
                width: "100vw",
                bottom: 0,
                left: 0,
                position: "absolute"
            }}/>

            <Grid.Container alignItems={"center"} css={{height: "100%"}}>
                <Grid xs={0} md={4}>
                    <Switch
                        size={"lg"}
                        color={"primary"}
                        checked={darkMode.value}
                        onChange={darkMode.toggle}
                        iconOff={<SunIcon fill={theme.colors.text.computedValue} filled={true}/>}
                        iconOn={<MoonIcon fill={theme.colors.text.computedValue} filled={true}/>}
                        aria-label={"Toggle theme"}
                    />
                </Grid>
                <Grid xs={0} md={4} justify={"center"} alignItems={"center"}>
                    <Link
                        href={"https://discord.gg/nCGXWpFahv"}
                        target={"_blank"}
                        rel={"noreferrer"}
                    >
                        <img
                            src={discordLogo}
                            alt={"Discord logo"}
                            height={"20px"}
                            width={"auto"}
                            style={{margin: "0 15px"}}
                        />
                    </Link>
                    <Link
                        href={"https://twitter.com/tokrlabs"}
                        target={"_blank"}
                        rel={"noreferrer"}
                    >
                        <img
                            src={twitterLogo}
                            alt={"GitBook logo"}
                            height={"20px"}
                            width={"auto"}
                            style={{margin: "0 15px"}}
                        />
                    </Link>
                </Grid>
                <Grid
                    xs={12} md={4}
                    justify={window.innerWidth > 500 ? "flex-end" : "center"}
                    alignItems={"center"}
                    style={{
                        color: "white",
                        fontSize: "min(3vw, 1rem)",
                    }}
                >
                    Powered by
                    <img
                        src={require("src/assets/brand/tokr_dark.png")}
                        height={"20px"}
                        width={"auto"}
                        alt={"Tokr logo"}
                        style={{margin: "0 10px"}}
                    />
                    on
                    <img
                        src={require("src/assets/solana/solana_logo_dark.png")}
                        height={"20px"}
                        width={"auto"}
                        alt={"Solana logo"}
                        style={{margin: "0 10px"}}
                    />
                </Grid>
            </Grid.Container>

        </div>
    )

}