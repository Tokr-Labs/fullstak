import React from "react";
import {Grid} from "@nextui-org/react";
import {Reserves} from "./Reserves";
import {AccountInfo} from "./AccountInfo";

export const Content = () => {

    return (
        <Grid.Container gap={2} wrap={"wrap-reverse"}>
            <Grid md={8} xs={12}>
                <Reserves/>
            </Grid>
            <Grid md={4} xs={12}>
                <AccountInfo/>
            </Grid>
        </Grid.Container>
    )

}