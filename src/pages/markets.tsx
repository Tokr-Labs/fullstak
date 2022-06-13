import React from "react";
import {Container, theme} from "@nextui-org/react";
import {Navbar} from "../components/navbar";
import {SubNavbar} from "../components/sub-navbar";
import {Footer} from "../components/footer";
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
