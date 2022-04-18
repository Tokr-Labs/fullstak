import React from "react";
import {Container} from "@nextui-org/react";
import {Navbar} from "../components/Navbar";
import {Pools} from "../components/Pools";
import {Content} from "../components/Content";
import {Footer} from "../components/Footer";

export const Invest = () => {
    return (
        <Container style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column"
        }}>
            <Navbar/>
            <hr/>
            <Pools/>
            <hr/>
            <Content/>
            <Footer/>
        </Container>
    )
}
