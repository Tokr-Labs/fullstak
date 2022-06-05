import React from "react";
import {Container, theme} from "@nextui-org/react";
import {Navbar} from "../components/Navbar";
import {SubNavbar} from "../components/SubNavbar";
import {Footer} from "../components/Footer";
import {Outlet} from "react-router-dom";

export const Markets = () => {

    return (
        <Container style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column"
        }}>
            {/*Background for header*/}
            <div style={{
                background: theme.colors.gradient.computedValue,
                height: "238px",
                zIndex: -1,
                width: "100vw",
                top: 0,
                left: 0,
                position: "absolute"
            }}/>

            <Navbar/>
            <SubNavbar/>
            <Outlet/>
            <Footer/>

            {/*Background for footer*/}
            <div style={{
                background: "linear-gradient(0deg, rgba(12,2,35,1) 0%, rgba(28,5,73,1) 100%)",
                height: "60px",
                zIndex: -1,
                width: "100vw",
                bottom: 0,
                left: 0,
                position: "absolute"
            }}/>
        </Container>
    )
}
