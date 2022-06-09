import React from "react";

export const ServerIcon = (props) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path
                d="M20 3H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM4 9V5h16v4zm16 4H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2zM4 19v-4h16v4z"
                fill={props.color}
            />
            <path
                d="M17 6h2v2h-2zm-3 0h2v2h-2zm3 10h2v2h-2zm-3 0h2v2h-2z"
                fill={props.color}
            />
        </svg>
    )

}