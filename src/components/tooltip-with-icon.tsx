import React from "react";
import {Tooltip} from "@nextui-org/react";
import {BsInfoCircle} from "react-icons/bs";

export const TooltipWithIcon = (props) => {

    return (
        <Tooltip
            style={{display: "inline", marginLeft: "2px"}}
            content={
                <div style={{width: "min(400px, 75vw)"}}>
                    {props.content}
                </div>
            }
        >
            <sup>
                <BsInfoCircle size={7}/>
            </sup>
        </Tooltip>
    )

}
