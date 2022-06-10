import React from "react";
import {theme} from "@nextui-org/react";

export const Pill = (props) => {

    return (
        <div style={{
            background: props.color,
            color: "white",
            minWidth: "75px",
            width: "max-content",
            padding: "3px 10px",
            borderRadius: "10px",
            textAlign: "center",
            fontSize: theme.fontSizes.xs.computedValue,
            textTransform: "uppercase",
        }}>
            {props.text}
        </div>
    )

}