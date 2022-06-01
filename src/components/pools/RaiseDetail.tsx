import React from "react";
import {Grid, Text} from "@nextui-org/react";

export const RaiseDetail = (props) => {

    return (
        <Grid xs={2} direction={"column"}>
            <Text
                size={12}
                color={"white"}
                style={{letterSpacing: 1.6}}
            >
                {props.title}
            </Text>
            <Text
                size={14}
                color={"white"}
                weight={"semibold"}
                style={{letterSpacing: 1.87}}
            >
                {props.text}
            </Text>
        </Grid>
    )

}
