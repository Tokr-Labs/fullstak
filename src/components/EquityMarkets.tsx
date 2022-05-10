import React from "react";
import {Button, Card, Grid, Text, Table, theme, Progress, User} from "@nextui-org/react";
import {Link} from "react-router-dom";

export const EquityMarkets = () => {

    // TODO - iterate over available DAOs to build the table
    const data = require("src/daos/devnet/tj-test-dao.json")

    return (
        <Grid.Container gap={2}>

            <Grid xs={12}>
                <Card>

                    <Card.Header style={{padding: "20px 0 0 20px"}}>
                        <Text h3 css={{letterSpacing: "2px"}}>OPEN FUNDS</Text>
                    </Card.Header>

                    <Card.Body>
                        <Table shadow={false} sticked headerLined>
                            <Table.Header>
                                <Table.Column>Fund</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>Target IRR</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>Target TVPI</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>Target DPI</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>Strategy</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>Max Raise</Table.Column>
                                <Table.Column align={"center"}>Progress</Table.Column>
                                <Table.Column children=""/>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <User size={"sm"} name={data.name}/>
                                    </Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>{data.details.target_returns.irr}</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>4.30x</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>2.10x</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>Value-Add</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>{data.details.max_raise}</Table.Cell>
                                    {/*TODO - since LP tokens are issued 1:1, use the outstanding supply here*/}
                                    <Table.Cell css={{minWidth: "200px", padding: "15px 20px 5px 20px"}}>
                                        <Progress size={"sm"} value={50}/>
                                        <Text size={12} color={"gray"}>$5,000,000 Raised</Text>
                                    </Table.Cell>
                                    <Table.Cell css={{textAlign: "end", float: "right", margin: "5px 0"}}>
                                        <Link to={"/markets/equity/pool-details"}>
                                            <Button
                                                ghost
                                                color={"primary"}
                                                size={"xs"}
                                                borderWeight={"light"}
                                                style={{margin: 0, fontWeight: "bold", borderRadius: 0}}
                                            >
                                                INVEST
                                            </Button>
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Card.Body>

                    <Card.Footer/>

                </Card>

            </Grid>

            <Grid xs={12}>

                <Card>

                    <Card.Header style={{padding: "20px 0 0 20px"}}>
                        <Text h3 css={{letterSpacing: "2px"}}>ACTIVE FUNDS</Text>
                    </Card.Header>

                    <Card.Body>
                        <Table shadow={false} sticked headerLined>
                            <Table.Header>
                                <Table.Column>Fund</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>Paid-in Capital</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>Carrying Value</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>TVPI</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>DPI</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>Net IRR</Table.Column>
                                <Table.Column align={"end"}>Fund Vintage</Table.Column>
                                <Table.Column children={""}/>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <User size={"sm"} name={"Participant Crypto"}/>
                                    </Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>10M USDC</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>15M USDC</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>4.50x</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>1.75x</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>27%</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>May 2022</Table.Cell>
                                    <Table.Cell css={{textAlign: "end", float: "right", margin: "5px 0"}}>
                                        <Button
                                            light
                                            size={"xs"}
                                            borderWeight={"light"}
                                            style={{margin: 0, fontWeight: "bold"}}
                                        >
                                            DETAILS
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <User size={"sm"} name={"Full Send"}/>
                                    </Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>1B USDC</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>1.42B USDC</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>3.70x</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>1.75x</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>24%</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>June 2022</Table.Cell>
                                    <Table.Cell css={{textAlign: "end", float: "right", margin: "5px 0"}}>
                                        <Button
                                            light
                                            size={"xs"}
                                            borderWeight={"light"}
                                            style={{margin: 0, fontWeight: "bold"}}
                                        >
                                            DETAILS
                                        </Button>
                                    </Table.Cell>
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