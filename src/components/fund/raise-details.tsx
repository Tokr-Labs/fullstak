import React from "react";
import {Grid, Text} from "@nextui-org/react";

export const RaiseDetails = (props) => {

    return (
        <Grid xs={6} md={2} direction={"column"}>
            <Text
                size={12}
                color={"white"}
            >
                {props.title}
            </Text>
            <Text
                size={14}
                color={"white"}
                weight={"semibold"}
            >
                {props.text}
            </Text>
        </Grid>
    )

}
