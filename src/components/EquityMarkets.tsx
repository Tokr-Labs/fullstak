import React from "react";
import {Button, Card, Grid, Text, Table, theme, Progress, User} from "@nextui-org/react";
import {Link} from "react-router-dom";
import {TooltipWithIcon} from "./TooltipWithIcon";

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
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>
                                    Target IRR
                                    <TooltipWithIcon
                                        color={"#666666"}
                                        content={`
                                            Internal Rate of Return (IRR) is a metric used to estimate 
                                            the profitability of potential investments. IRR is a discount 
                                            rate that makes the net present value (NPV) of all cash flows 
                                            from an investment equal to zero in a discounted cash flow 
                                            analysis––in other words, it is the annual rate of growth 
                                            that an investment is expected to generate. Generally speaking, 
                                            the higher an internal rate of return, the more desirable an 
                                            investment is to undertake. 
                                        `}
                                    />
                                </Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>
                                    Target TVPI
                                    <TooltipWithIcon
                                        color={"#666666"}
                                        content={`
                                            Total Value to Paid-in (“TVPI”) is the ratio of the current 
                                            value of current investments within a fund, plus the total 
                                            value of all distributions made to date, relative to the total 
                                            amount of capital paid into the fund to date.
                                        `}
                                    />
                                </Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>
                                    Target DPI
                                    <TooltipWithIcon
                                        color={"#666666"}
                                        content={`
                                            Distributions to Paid-in (“DPI”) is the ratio of money distributed to 
                                            investors by the fund, relative to the total amount of capital paid into 
                                            the fund.
                                        `}
                                    />
                                </Table.Column>
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
                                        <Progress size={"sm"} value={58} color={"success"} status={"success"}/>
                                        <Text size={12} color={"gray"}>$5,800,000 Raised</Text>
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
                                                DETAILS
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
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>
                                    Paid-in Capital
                                    <TooltipWithIcon
                                        color={"#666666"}
                                        content={`
                                            Paid-in Capital is the full amount of cash or other assets that 
                                            shareholders have contributed to a fund in exchange for ownership shares.
                                        `}
                                    />
                                </Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>
                                    Carrying Value
                                    <TooltipWithIcon
                                        color={"#666666"}
                                        content={`
                                            Carrying Value of an asset is the original purchase price or most recently 
                                            appraised value less any accumulated depreciation, amortization, or 
                                            impairment expenses from its original cost. Relative to a fund, this 
                                            metric measures the total carrying value of assets under management over 
                                            time, less any depreciation, amortization, or impairment expenses from 
                                            its original cost.
                                        `}
                                    />
                                </Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>
                                    Net IRR
                                    <TooltipWithIcon
                                        color={"#666666"}
                                        content={`
                                            Internal Rate of Return (IRR) is a metric used to estimate 
                                            the profitability of potential investments. IRR is a discount 
                                            rate that makes the net present value (NPV) of all cash flows 
                                            from an investment equal to zero in a discounted cash flow 
                                            analysis––in other words, it is the annual rate of growth 
                                            that an investment is expected to generate. Generally speaking, 
                                            the higher an internal rate of return, the more desirable an 
                                            investment is to undertake. 
                                        `}
                                    />
                                </Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>
                                    TVPI
                                    <TooltipWithIcon
                                        color={"#666666"}
                                        content={`
                                            Total Value to Paid-in (“TVPI”) is the ratio of the current 
                                            value of current investments within a fund, plus the total 
                                            value of all distributions made to date, relative to the total 
                                            amount of capital paid into the fund to date.
                                        `}
                                    />
                                </Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>
                                    DPI
                                    <TooltipWithIcon
                                        color={"#666666"}
                                        content={`
                                            Distributions to Paid-in (“DPI”) is the ratio of money distributed to 
                                            investors by the fund, relative to the total amount of capital paid into 
                                            the fund.
                                        `}
                                    />
                                </Table.Column>
                                <Table.Column align={"end"}>
                                    Fund Vintage
                                    <TooltipWithIcon
                                        color={"#666666"}
                                        content={`
                                            Fund Vintage refers to the year in which the first influx of investment 
                                            capital is delivered to a fund. 
                                        `}
                                    />
                                </Table.Column>
                                <Table.Column children={""}/>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <User size={"sm"} name={"Participant Crypto"}/>
                                    </Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>10M USDC</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>15M USDC</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>27%</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>4.50x</Table.Cell>
                                    <Table.Cell css={{textAlign: "end"}}>1.75x</Table.Cell>
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