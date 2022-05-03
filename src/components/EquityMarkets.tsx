import React from "react";
import {Button, Card, Grid, Spacer, Table, theme} from "@nextui-org/react";
import {Pill} from "./Pill";
import {Link} from "react-router-dom";

export const EquityMarkets = () => {

    // TODO - iterate over available DAOs to build the table
    const data = require("src/daos/devnet/tj-test-dao.json")

    return (
        <Grid.Container gap={2}>

            <Grid xs={12}>
                <Card>

                    <Card.Header>
                        <h3 style={{paddingLeft: "20px"}}>Pools</h3>
                    </Card.Header>

                    <Card.Body>

                        <span style={{margin: "0 0 10px 10px"}}>
                            <Pill color={theme.colors.primary.computedValue} text={"Raising"}/>
                        </span>
                        <Table shadow={false} sticked headerLined>
                            <Table.Header>
                                <Table.Column>Name</Table.Column>
                                <Table.Column>Token</Table.Column>
                                <Table.Column align={"end"}>Current Raise</Table.Column>
                                <Table.Column align={"end"}>Max Raise</Table.Column>
                                <Table.Column align={"end"}>Target IRR</Table.Column>
                                <Table.Column align={"end"}>Target CoC</Table.Column>
                                <Table.Column align={"end"}>Vintage Year</Table.Column>
                                <Table.Column align={"end"}>Fund Term</Table.Column>
                                <Table.Column children=""/>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>{data.name}</Table.Cell>
                                    {/*TODO - include ticker of token and link to explorer page here*/}
                                    <Table.Cell css={{color: "red"}}>Cell 2</Table.Cell>
                                    {/*TODO - since LP tokens are issued 1:1, use the outstanding supply here*/}
                                    <Table.Cell css={{textAlign: "end", color: "red"}}>Cell 3</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>{data.details.max_raise}</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>{data.details.target_returns.irr}</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>{data.details.target_returns.irr}</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>{data.details.vintage_year}</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>{data.details.fund_term}</Table.Cell>
                                    <Table.Cell css={{textAlign: "end", float: "right"}}>
                                        <Link to={"/markets/equity/pool-details"}>
                                            <Button size={"xs"} style={{margin: 0}}>View Details</Button>
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>

                        <Spacer y={2}/>

                        <span style={{margin: "0 0 10px 10px"}}>
                            <Pill color={theme.colors.secondary.computedValue} text={"Active"}/>
                        </span>
                        <Table shadow={false} sticked headerLined>
                            <Table.Header>
                                <Table.Column>Name</Table.Column>
                                <Table.Column>Token</Table.Column>
                                <Table.Column align={"end"}>Total Supply</Table.Column>
                                <Table.Column align={"end"}>Target IRR</Table.Column>
                                <Table.Column align={"end"}>Current IRR</Table.Column>
                                <Table.Column align={"end"}>Target CoC</Table.Column>
                                <Table.Column align={"end"}>Current CoC</Table.Column>
                                <Table.Column align={"end"}>Vintage Year</Table.Column>
                                <Table.Column align={"end"}>Fund Term</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>Cell 1</Table.Cell>
                                    <Table.Cell>Cell 2</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>Cell 3</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>Cell 4</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>Cell 5</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>Cell 6</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>Cell 7</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>Cell 8</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>Cell 9</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>

                    </Card.Body>

                    <Card.Footer/>

                </Card>
            </Grid>

        </Grid.Container>
    )

}