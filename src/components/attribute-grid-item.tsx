import React from "react";
import {Grid, theme} from "@nextui-org/react";

export const AttributeGridItem = (props) => {

    return (
        <Grid xs={12} lg={3} direction={"column"}>
            <div style={{
                textAlign: "center",
                fontSize: "100px"
            }}>
                {props.image}
            </div>
            <p style={{
                opacity: 1,
                fontSize: theme.fontSizes.xl3.computedValue,
                fontWeight: theme.fontWeights.bold.computedValue,
                textAlign: "center",
                textTransform: "uppercase",
                color: theme.colors.text.computedValue,
                letterSpacing: theme.letterSpacings.wider.computedValue
            }}>
                {props.title}
            </p>
            <p style={{
                marginTop: 0,
                textAlign: "center",
                fontFamily: theme.fonts.mono.computedValue,
                fontSize: theme.fontSizes.md.computedValue,
                color: theme.colors.text.computedValue
            }}>
                {props.description}
            </p>
        </Grid>
    )

}