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
                fontSize: "28px",
                fontWeight: 700,
                textAlign: "center",
                textTransform: "uppercase",
            }}>
                {props.title}
            </p>
            <p style={{
                marginTop: 0,
                textAlign: "center",
                fontFamily: theme.fonts.mono.computedValue,
                fontSize: "14px"
            }}>
                {props.description}
            </p>
        </Grid>
    )

}