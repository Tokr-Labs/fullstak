import React from "react";
import {Navbar} from "../components/Navbar";
import {Button, Card, Container, Grid, Spacer, Table} from "@nextui-org/react";
import {Footer} from "../components/Footer";
import { Link } from "react-router-dom";

export const Portfolio = () => {

    return (
        <Container style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column"
        }}>
            <Navbar/>

            <Spacer y={1}/>

            <Card>

                <Card.Header/>

                <Card.Body>
                    <Grid.Container justify={"space-evenly"} style={{textAlign: "center"}}>
                        <Grid>
                            <h3>Wallet Balance</h3>
                            <span>$1,234,567.89</span>
                        </Grid>
                        <Grid>
                            <h3>Available to Deposit</h3>
                            <span>$100,000.00</span>
                        </Grid>
                        <Grid>
                            <h3>Total Pool Earnings</h3>
                            <span>$235,456.91</span>
                        </Grid>
                    </Grid.Container>
                </Card.Body>

                <Card.Footer/>

            </Card>

            <Spacer y={1}/>

            <Card>

                <Card.Header>
                    <h3>Holdings</h3>
                </Card.Header>

                <Card.Body>

                    <h4>Assets</h4>
                    <Grid.Container>
                        <Grid xs={8}>
                            <Table shadow={false} sticked headerLined>
                                <Table.Header>
                                    <Table.Column>Pools</Table.Column>
                                    <Table.Column>Holdings</Table.Column>
                                    <Table.Column>All-Time Return (APY)</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>27C</Table.Cell>
                                        <Table.Cell>100,000 27C</Table.Cell>
                                        <Table.Cell>20.00%</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>PCF</Table.Cell>
                                        <Table.Cell>7,000,000 PCF</Table.Cell>
                                        <Table.Cell>12.50%</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid>
                    </Grid.Container>

                    <Spacer y={2}/>

                    <h4>Wallet</h4>
                    <Grid.Container>
                        <Grid xs={8}>
                            <Table shadow={false} sticked headerLined>
                                <Table.Header>
                                    <Table.Column>Tokens</Table.Column>
                                    <Table.Column>Amount</Table.Column>
                                    <Table.Column>Value</Table.Column>
                                    <Table.Column/>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>SOL</Table.Cell>
                                        <Table.Cell>100 SOL</Table.Cell>
                                        <Table.Cell>$10,500.00</Table.Cell>
                                        <Table.Cell/>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>USDC</Table.Cell>
                                        <Table.Cell>100,000 USDC</Table.Cell>
                                        <Table.Cell>$100,000.00</Table.Cell>
                                        <Table.Cell>
                                            <Link to={"/markets"}>
                                                <Button size={"xs"} color={"gradient"} ghost>
                                                    Invest
                                                </Button>
                                            </Link>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid>
                    </Grid.Container>

                </Card.Body>

                <Card.Footer/>

            </Card>

            <Footer/>
        </Container>
    )

}
