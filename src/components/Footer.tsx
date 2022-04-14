import React from "react";
import {changeTheme, Grid, Link, Switch, Text, useTheme} from "@nextui-org/react";
import {MoonIcon} from "./icons/MoonIcon";
import {SunIcon} from "./icons/SunIcon";
import useDarkMode from "use-dark-mode";

require("boxicons");

export const Footer = () => {

    const theme = useTheme();
    const darkMode = useDarkMode();

    const getLogoColor = () => {
        return theme.isDark ? "white" : "black";
    }

    return (
        <div style={{marginTop: "auto"}}>
            <hr/>
            <Grid.Container gap={2} style={{paddingBottom: 0}}>
                <Grid xs={4} alignItems={"center"}>
                    <a href={"https://twitter.com/tokrfi"}
                       target={"_blank"}
                       rel="noreferrer"
                       style={{display: "flex"}}
                    >
                        {/*@ts-ignore*/}
                        <box-icon type={"logo"} name={"twitter"} color={getLogoColor()}/>
                    </a>
                    <a href={"https://github.com/TOKR-labs"}
                       target={"_blank"}
                       rel="noreferrer"
                       style={{display: "flex"}}
                    >
                        {/*@ts-ignore*/}
                        <box-icon type={"logo"} name={"github"} color={getLogoColor()}/>
                    </a>
                    {/* TODO - add link for discord */}
                    {/*@ts-ignore*/}
                    <box-icon type={"logo"} name={"discord-alt"} color={getLogoColor()}/>
                </Grid>
                <Grid xs={4} justify={"center"} alignItems={"center"} style={{textAlign: "center"}}>
                    <Text color={"$gray500"}>Made with 💜 by <Link href={"https://tokrlabs.xyz"} target={"_blank"}>tokr_labs</Link>
                    </Text>
                </Grid>
                <Grid xs={4} justify={"flex-end"} alignItems={"center"}>
                    <Switch checked={false}
                            size={"lg"}
                            color={"primary"}
                            iconOff={<MoonIcon filled/>}
                            iconOn={<SunIcon filled/>}
                            onChange={() => darkMode.toggle()}
                    />
                </Grid>
            </Grid.Container>
        </div>
    )

}