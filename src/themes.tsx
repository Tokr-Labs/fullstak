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
        borderRadius: 0 + " !important",
        height: "40px !important",
        fontFamily: "Montserrat, sans-serif !important"
    },

    ".nextui-table-container": {
        width: "100%"
    },

    ".nextui-table-column-header": {
        fontWeight: theme.fontWeights.normal.computedValue,
        fontSize: theme.fontSizes.xs.computedValue,
        letterSpacing: theme.letterSpacings.widest.computedValue
    },

    ".nextui-table-cell": {
        fontWeight: theme.fontWeights.semibold.computedValue,
        fontSize: theme.fontSizes.sm.computedValue,
    },

    ".skinny-rows .nextui-table-cell": {
        paddingTop: theme.space["2"].computedValue,
        paddingBottom: theme.space["2"].computedValue
    },

    // Card headers
    ".nextui-c-jxECYO": {
        padding: "30px !important",
        paddingBottom: "0 !important"
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

// export const lightTheme = createTheme({
//     type: "light",
//     theme: {
//         colors: {
//             background: "#F7F6F4",
//             primary: "#47DB00",
//             secondary: "#BE00FF",
//             success: "#00A87E",
//             pillGreenTextColor: "#E9F3ED",
//             pillGreenFillColor: "#50C860",
//             orangeGradient: "radial-gradient(circle at 10% 92%, #f39f44, rgba(240, 72, 98, 0) 28%), radial-gradient(circle at 88% 92%, #d33077, rgba(240, 72, 98, 0) 34%), linear-gradient(to bottom, #f04862, #f04862)",
//             greenGradient: "radial-gradient(circle at 115% 111%, rgba(255, 255, 255, 0), #2ebea1 82%), linear-gradient(to bottom, #2ac294, #2ac294)",
//             green: "#2ac294"
//         },
//     }
// })

// TODO - figure out how to share identical theme props between light and dark
export const darkTheme = createTheme({
    type: "dark",
    theme: {
        colors: {
            primary: "#62FF00",
            secondary: "#BE00FF",
            success: "#00A87E",
            pillGreenTextColor: "#E9F3ED",
            pillGreenFillColor: "#50C860",
            orangeGradient: "radial-gradient(circle at 10% 92%, #f39f44, rgba(240, 72, 98, 0) 28%), radial-gradient(circle at 88% 92%, #d33077, rgba(240, 72, 98, 0) 34%), linear-gradient(to bottom, #f04862, #f04862)",
            greenGradient: "radial-gradient(circle at 115% 111%, rgba(255, 255, 255, 0), #2ebea1 82%), linear-gradient(to bottom, #2ac294, #2ac294)",
            green: "#2ac294"
        }
    }
})