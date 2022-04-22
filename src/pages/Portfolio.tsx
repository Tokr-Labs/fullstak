import React from "react";
import {Navbar} from "../components/Navbar";
import {Container} from "@nextui-org/react";
import {Footer} from "../components/Footer";

export const Portfolio = () => {

    return (
        <Container style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column"
        }}>
            <Navbar/>
            <Footer/>
        </Container>
    )

}
