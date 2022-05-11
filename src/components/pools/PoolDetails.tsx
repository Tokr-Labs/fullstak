import { Grid, Text } from "@nextui-org/react";
import React from "react";

export const PoolDetails = () => {
    return (
        <>
            <Grid.Container gap={2} style={{paddingTop: 0}}>
                <Grid xs={3} direction={"column"}>
                    <Text small color={"gray"}>Asset Type</Text>
                    <Text weight={"bold"}>Multifamily</Text>
                </Grid>
                <Grid xs={3} direction={"column"}>
                    <Text small color={"gray"}>Asset Class</Text>
                    <Text weight={"bold"}>Class B & C</Text>
                </Grid>
                <Grid xs={3} direction={"column"}>
                    <Text small color={"gray"}>Asset Vintage</Text>
                    <Text weight={"bold"}>1950-1990</Text>
                </Grid>
                <Grid xs={3} direction={"column"}>
                    <Text small color={"gray"}>Asset Size</Text>
                    <Text weight={"bold"}>8-40 Units</Text>
                </Grid>
                <Grid xs={3} direction={"column"}>
                    <Text small color={"gray"}>Investment Type</Text>
                    <Text weight={"bold"}>Equity</Text>
                </Grid>
                <Grid xs={3} direction={"column"}>
                    <Text small color={"gray"}>Investment Strategy</Text>
                    <Text weight={"bold"}>Value-Add</Text>
                </Grid>
                <Grid xs={3} direction={"column"}>
                    <Text small color={"gray"}>Target Hold</Text>
                    <Text weight={"bold"}>2-3</Text>
                </Grid>
                <Grid xs={3} direction={"column"}>
                    <Text small color={"gray"}>Target Leverage</Text>
                    <Text weight={"bold"}>65-80% LTV</Text>
                </Grid>
                <Grid xs={3} direction={"column"}>
                    <Text small color={"gray"}>Target Market</Text>
                    <Text weight={"bold"}>Miami Dade</Text>
                </Grid>
                <Grid xs={3} direction={"column"}>
                    <Text small color={"gray"}>Target Equity</Text>
                    <Text weight={"bold"}>$500k - $4M</Text>
                </Grid>
                <Grid xs={3} direction={"column"}>
                    <Text small color={"gray"}>Investment Period</Text>
                    <Text weight={"bold"}>18-24 Months</Text>
                </Grid>
                <Grid xs={3} direction={"column"}>
                    <Text small color={"gray"}>Fees</Text>
                    <Text weight={"bold"}>1% per annum</Text>
                </Grid>
            </Grid.Container>
        </>
    )
}
