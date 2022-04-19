import React from "react";
import {Navbar} from "../components/Navbar";
import {Footer} from "../components/Footer";
import {Card, Grid, Spacer} from "@nextui-org/react";

export const DAO = () => {
    return (
        <>
            <Navbar/>
            <hr/>
            <Spacer y={1}/>
            <Grid.Container gap={2}>
                <Grid xs={8}>
                    <Card>
                        <Card.Header>
                            <h3>Name of Investment DAO</h3>
                        </Card.Header>
                        <Card.Body>
                            Info pertaining to specific deal and proposals from members
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={4}>
                    <Grid.Container gap={2} style={{padding: 0}}>
                        <Grid xs={12}>
                            <Card>
                                <Card.Header>
                                    <h3>Your Account</h3>
                                </Card.Header>
                                <Card.Body>
                                    Info about investment
                                </Card.Body>
                            </Card>
                        </Grid>
                        <Grid xs={12}>
                            <Card>
                                <Card.Header>
                                    <h3>Treasury</h3>
                                </Card.Header>
                                <Card.Body>
                                    Treasury balance and subaccounts
                                </Card.Body>
                            </Card>
                        </Grid>
                        <Grid xs={12}>
                            <Card>
                                <Card.Header>
                                    <h3>Program</h3>
                                </Card.Header>
                                <Card.Body>
                                    Link to program info
                                </Card.Body>
                            </Card>
                        </Grid>
                    </Grid.Container>
                </Grid>
            </Grid.Container>
            <Footer/>
        </>
    )
}