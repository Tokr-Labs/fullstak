import React from "react";
import {Card, Grid} from "@nextui-org/react";

export const PoolDetail = () => {

    return (
        <Grid.Container gap={2}>

            <Grid xs={8}>
                <Card>Raise status</Card>
            </Grid>

            <Grid xs={4}>
                <Card>Details</Card>
            </Grid>

            <Grid xs={12}>
                <Card>Assets, members, etc.</Card>
            </Grid>

        </Grid.Container>
    )

}