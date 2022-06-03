import React from "react";
import {Grid, Link, Text, theme} from "@nextui-org/react";
import solanaLogo from "src/assets/solana/solana_logo.svg"
import discordLogo from "src/assets/icons/discord_icon.svg"
import twitterLogo from "src/assets/icons/icons-twitter_export.svg"

require("boxicons");

export const Footer = () => {

    return (
        <div style={{marginTop: "auto", height: "60px"}}>
            <Grid.Container alignItems={"center"} css={{height: "100%"}}>
                <Grid xs={4}/>
                <Grid xs={4} justify={"center"} alignItems={"center"}>
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
                    xs={4}
                    justify={"flex-end"}
                    alignItems={"center"}
                    style={{
                        color: "white",
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