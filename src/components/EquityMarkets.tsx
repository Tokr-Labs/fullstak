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
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>Total Raised</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>Max Raise</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>Target IRR</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>Target TVPI</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>Target DPI</Table.Column>
                                <Table.Column align={"center"}>Strategy</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>Target Close</Table.Column>
                                <Table.Column children=""/>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>{data.name}</Table.Cell>
                                    {/*TODO - include ticker of token and link to explorer page here*/}
                                    <Table.Cell>{data.token.ticker}</Table.Cell>
                                    {/*TODO - since LP tokens are issued 1:1, use the outstanding supply here*/}
                                    <Table.Cell css={{textAlign: "end"}}>587,250 USDC</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>{data.details.max_raise}</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>{data.details.target_returns.irr}</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>1.75x</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>1.75x</Table.Cell>
                                    <Table.Cell css={{textAlign: "center"}}>Value-Add Multifamily</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>{data.details.raise_close}</Table.Cell>
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
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>Paid-in Capital</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>Carrying Value</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>TVPI</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>DPI</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>Net IRR</Table.Column>
                                <Table.Column align={"end"}>Vintage Year</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>Miami DAO</Table.Cell>
                                    <Table.Cell>MIA</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>10,000,000 USDC</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>15,000,000 USDC</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>4.75x</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>1.75x</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>27%</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>2022</Table.Cell>
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