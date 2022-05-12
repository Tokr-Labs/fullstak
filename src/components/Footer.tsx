import React from "react";
import {Grid, Link, Text} from "@nextui-org/react";
import solanaLogo from "src/assets/solana_logo.svg"
import gitbookLogo from "src/assets/icons/icons-gitbook_export.svg"
import githubLogo from "src/assets/icons/icons-github_export.svg"
import twitterLogo from "src/assets/icons/icons-twitter_export.svg"

require("boxicons");

export const Footer = () => {

    return (
        <div style={{marginTop: "auto", height: "60px"}}>
            <Grid.Container alignItems={"center"} css={{height: "100%"}}>
                <Grid xs={4}/>
                <Grid xs={4} justify={"center"} alignItems={"center"}>
                    <Link
                        href={"https://tokr.gitbook.io/tokr-main-docs/"}
                        target={"_blank"}
                        rel={"noreferrer"}
                    >
                        <img
                            src={gitbookLogo}
                            alt={"GitBook logo"}
                            height={"20px"}
                            width={"auto"}
                            style={{margin: "0 15px"}}
                        />
                    </Link>
                    <Link
                        href={"https://github.com/tokr-labs"}
                        target={"_blank"}
                        rel={"noreferrer"}
                    >
                        <img
                            src={githubLogo}
                            alt={"GitBook logo"}
                            height={"22px"}
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
                <Grid xs={4} justify={"flex-end"} alignItems={"center"}>
                    <Text color={"white"}>Powered by</Text>
                    <img
                        src={solanaLogo}
                        alt={"Solana logo"}
                        height={"20px"}
                        width={"auto"}
                        style={{marginLeft: "10px"}}
                    />
                </Grid>
            </Grid.Container>
        </div>
    )

}