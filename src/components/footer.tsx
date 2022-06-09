import React from "react";
import {Grid, Link, theme} from "@nextui-org/react";
import discordLogo from "src/assets/icons/discord_icon.svg"
import twitterLogo from "src/assets/icons/icons-twitter_export.svg"

require("boxicons");

export const Footer = () => {

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
                <Grid xs={0} md={4}/>
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
                        fontFamily: theme.fonts.mono.computedValue
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