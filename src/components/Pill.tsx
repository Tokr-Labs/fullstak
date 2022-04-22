import React from "react";

export const Pill = (props) => {

    return (
        <div style={{
            background: props.color,
            color: "white",
            minWidth: "75px",
            width: "max-content",
            padding: "3px 10px",
            marginLeft: "10px",
            marginBottom: "10px",
            borderRadius: "10px",
            textAlign: "center",
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.75px"
        }}>
            {props.text}
        </div>
    )

}