import React from "react";
import {Container, theme, Text, Spacer, Card} from "@nextui-org/react";
import {Navbar} from "../components/Navbar";
import {Link} from "react-router-dom";
import {Footer} from "../components/Footer";

export const NotFound = () => {

    return (
        <Container style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column"
        }}>

            <div style={{
                background: theme.colors.gradient.computedValue,
                height: "238px",
                zIndex: -1,
                width: "100%",
                top: 0,
                left: 0,
                position: "absolute"
            }}/>

            <Navbar/>

            <Spacer y={1}/>

            <Card>

                <Card.Header style={{justifyContent: "center"}}>
                    <h1 style={{marginLeft: "-30px"}}>404 Error</h1>
                </Card.Header>

                <Card.Body style={{textAlign: "center"}}>
                    <Text>
                        This page does not exist!<br/>
                        Click <Link to={"/markets"}>here</Link> to go back to the markets.
                    </Text>
                </Card.Body>

                <Card.Footer/>

            </Card>

            <Spacer y={1}/>

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