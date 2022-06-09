import React from "react";
import {createTheme, globalCss, theme} from "@nextui-org/react";

export const globalStyles = globalCss({
    body: {
        backgroundColor: theme.colors.background.computedValue,
        zIndex: 0
    },

    hr: {
        margin: "5px 0",
        opacity: 0.5,
        border: "1px solid " + theme.colors.primary.computedValue + " !important"
    },

    ".wallet-adapter-button-trigger": {
        background: theme.colors.primary.computedValue + " !important",
        borderRadius: theme.radii.pill.computedValue + " !important",
        height: "40px !important",
        fontFamily: "Montserrat, sans-serif !important"
    },

    ".nextui-table-container": {
        width: "100%"
    },

    ".nextui-table-column-header": {
        fontSize: 12,
        fontWeight: "normal",
    },

    ".nextui-table-cell": {
        fontSize: 14,
        fontWeight: "$semibold",
    },

    ".skinny-rows .nextui-table-cell": {
        paddingTop: theme.space["2"].computedValue,
        paddingBottom: theme.space["2"].computedValue
    },

    // Card headers
    ".nextui-c-bfHnFD": {
        padding: "30px 0 0 30px !important"
    },

    ".dark-card": {
        background: `linear-gradient(
                180deg,
                rgba(12,2,35,1) 0%,
                rgba(28,5,73,1) 100%
            ) !important`
    },

    ".dark-card .nextui-c-PJLV-ijXuRFq-css, .dark-card input, .dark-card label": {
        color: "white"
    },
})

export const lightTheme = createTheme({
    type: "light",
    theme: {
        colors: {
            primary: "#be00ff",
            primaryLight: "rgba(190,0,255,0.25)",
            secondary: "#650087",
            success: "#00ff4b",
            gradient: `linear-gradient(
                    180deg, 
                    rgba(12, 2, 35, 1) 0%, 
                    rgba(12, 2, 35, 1) 0%, 
                    rgba(12, 2, 36, 1) 24%, 
                    rgba(28, 5, 73, 1) 100%
                )`,
            background: "#f8f5f6"
        },
        fonts: {
            sans: "Montserrat, sans-serif",
            mono: "'PT Mono', source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"
        }
    }
})

// TODO - figure out how to share identical theme props between light and dark
export const darkTheme = createTheme({
    type: 'dark',
    theme: {
        colors: {
            primary: "#be00ff",
            primaryLight: "rgba(190,0,255,0.25)",
            secondary: "#650087",
            success: "#00ff4b",
            gradient: `linear-gradient(
                    180deg, 
                    rgba(12, 2, 35, 1) 0%, 
                    rgba(12, 2, 35, 1) 0%, 
                    rgba(12, 2, 36, 1) 24%, 
                    rgba(28, 5, 73, 1) 100%
                )`,
            background: "$black"
        },
        fonts: {
            sans: "Montserrat, sans-serif",
            mono: "'PT Mono', source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"
        }
    }
})