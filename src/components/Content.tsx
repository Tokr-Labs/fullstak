import React from "react";
import {Grid} from "@nextui-org/react";
import {EquityMarket} from "./EquityMarket";

export const Content = () => {

    return (
        <Grid.Container gap={2} wrap={"wrap-reverse"}>
            <Grid xs={12}>
                <EquityMarket/>
            </Grid>
        </Grid.Container>
    )

}