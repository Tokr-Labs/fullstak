import {Grid, Text, theme} from "@nextui-org/react";
import React from "react";

export const FundConfiguration = () => {

    const Section = (props) => {
        return (
            <Grid xs={6} md={3} direction={"column"}>

                <Text
                    size={theme.fontSizes.xs.computedValue}
                    weight={"normal"}
                    color={theme.colors.accents6.computedValue}
                    style={{letterSpacing: theme.letterSpacings.widest.computedValue}}
                >
                    {props.title}
                </Text>

                <Text size={theme.fontSizes.sm.computedValue} weight={"semibold"}>
                    {props.text}
                </Text>

            </Grid>
        )
    }

    return (
        <>
            <Grid.Container gap={2} style={{padding: "0 20px"}}>
                <Section title={"Asset Type"} text={"Multifamily"}/>
                <Section title={"Asset Class"} text={"Class B & C"}/>
                <Section title={"Asset Vintage"} text={"1950-1990"}/>
                <Section title={"Asset Size"} text={"8-40 Units"}/>
                <Section title={"Investment Type"} text={"Equity"}/>
                <Section title={"Investment Strategy"} text={"Value-Add"}/>
                <Section title={"Target Hold"} text={"2-3"}/>
                <Section title={"Target Leverage"} text={"65-80% LTV"}/>
                <Section title={"Target Market"} text={"Miami Dade"}/>
                <Section title={"Target Equity"} text={"$500k-$4M"}/>
                <Section title={"Investment Period"} text={"18-24 Months"}/>
                <Section title={"Fees"} text={"1% per annum"}/>
            </Grid.Container>
        </>
    )
}
