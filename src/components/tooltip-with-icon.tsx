import React from "react";
import {Tooltip} from "@nextui-org/react";
import {TooltipIcon} from "./icons/tooltip-icon";

export const TooltipWithIcon = (props) => {

    return (
        <Tooltip
            style={{display: "inline", marginLeft: "2px"}}
            content={props.content}
        >
            <sup>
                <TooltipIcon color={props.color}/>
            </sup>
        </Tooltip>
    )

}
