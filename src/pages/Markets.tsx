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

            <Navbar/>
            <SubNavbar/>
            <Outlet/>
            <Footer/>

        </Container>
    )
}
