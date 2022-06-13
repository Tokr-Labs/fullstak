import React from "react";
import {Grid, Text, theme} from "@nextui-org/react";

export const RaiseDetails = (props) => {

    return (
        <Grid xs={6} md={2} direction={"column"}>
            <Text
                size={theme.fontSizes.sm.computedValue}
                color={"white"}
            >
                {props.title}
            </Text>
            <Text
                size={theme.fontSizes.md.computedValue}
                color={"white"}
                weight={"semibold"}
            >
                {props.text}
            </Text>
        </Grid>
    )

}
