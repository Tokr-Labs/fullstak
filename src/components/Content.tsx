import React from "react";
import {Grid} from "@nextui-org/react";
import {DebtReserves} from "./DebtReserves";
import {AccountInfo} from "./AccountInfo";
import {PrefEqOffs} from "./PrefEqOffs";

export const Content = () => {

    return (
        <Grid.Container gap={2} wrap={"wrap-reverse"}>
            <Grid md={8} xs={12}>
                <PrefEqOffs/>
            </Grid>
            <Grid md={4} xs={12}>
                <AccountInfo/>
            </Grid>
        </Grid.Container>
    )

}