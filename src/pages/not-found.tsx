import React from "react";
import {Container, theme, Text, Spacer, Card} from "@nextui-org/react";
import {Navbar} from "../components/navbar";
import {Link} from "react-router-dom";
import {Footer} from "../components/footer";

export const NotFound = () => {

    return (
        <Container style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column"
        }}>

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

        </Container>
    )

}