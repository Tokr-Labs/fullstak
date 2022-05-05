import React from "react";
import {Container} from "@nextui-org/react";
import {Navbar} from "../components/Navbar";
import {Pools} from "../components/Pools";
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
            <Pools/>
            <Outlet/>
            <Footer/>
        </Container>
    )
}
