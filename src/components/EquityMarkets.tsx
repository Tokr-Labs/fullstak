import React, {useEffect, useMemo, useState} from "react";
import {Button, Card, Grid, Text, Table, theme, Progress, User} from "@nextui-org/react";
import {Link} from "react-router-dom";
import {DaoInfo} from "../models/dao/dao-info";
import {TokenServices} from "../services/token-services";
import {connection} from "@project-serum/common";
import {useConnection} from "@solana/wallet-adapter-react";
import {USDC_DEVNET} from "../models/constants";
import {CurrencyFormatter} from "../utils/currency-formatter";

export const EquityMarkets = () => {

    // TODO - iterate over available DAOs to build the table

    const connection = useConnection().connection;

    const tokenServices = useMemo(() => new TokenServices(connection), [connection])

    const [openFundProgress, setOpenFundProgress] = useState<{ amountRaised?: string, percentageComplete?: number }[]>([]);

    const funds: { open: DaoInfo[], active: DaoInfo[] } = useMemo(() => {

        const mf1 = require("../daos/devnet/mf1.json");
        const enj = require("../daos/devnet/enj.json");
        const ez = require("../daos/devnet/ez.json");

        return {
            open: [
                DaoInfo.with(mf1)
            ],
            active: [
                DaoInfo.with(enj),
                DaoInfo.with(ez)
            ]
        }

    }, []);

    useEffect(() => {

        const promises = funds.open.map(fund => {

            const lpTokenMintGovernance = fund.addresses.governance.lpTokenMintGovernance!;

            return tokenServices.getTokenHoldingAmount(USDC_DEVNET, lpTokenMintGovernance)

        })

        Promise.all(promises)
            .then(result => {

                const fundProgresses: { amountRaised?: string, percentageComplete?: number }[] = [];

                funds.open.forEach((fund, i) => {

                    fundProgresses.push({
                        amountRaised: CurrencyFormatter.formatUsdc(result[i] ?? 0, true),
                        percentageComplete: ((result[i] ?? 0) / fund.details.maxRaise) * 100
                    });

                })

                setOpenFundProgress(fundProgresses);
            })


    }, [connection, funds])

    return (
        <Grid.Container gap={2}>

            {/* OPEN FUNDS */}
            <Grid xs={12}>
                <Card>

                    <Card.Header style={{padding: "20px 0 0 20px"}}>
                        <Text h3 css={{letterSpacing: "2px"}}>OPEN FUNDS</Text>
                    </Card.Header>

                    <Card.Body>
                        <Table shadow={false} sticked headerLined>

                            <Table.Header>

                                <Table.Column>
                                    Fund
                                </Table.Column>

                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>
                                    Target IRR
                                </Table.Column>

                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>
                                    Target TVPI
                                </Table.Column>

                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>
                                    Target DPI
                                </Table.Column>

                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>
                                    Strategy
                                </Table.Column>

                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>
                                    Max Raise
                                </Table.Column>

                                <Table.Column align={"center"}>
                                    Progress
                                </Table.Column>

                                <Table.Column children=""/>

                            </Table.Header>

                            <Table.Body>

                                {
                                    (funds.open ?? []).map((fund, i) => (

                                        <Table.Row>

                                            <Table.Cell>
                                                <User size={"sm"} name={fund.name} src={fund.token.image}/>
                                            </Table.Cell>

                                            <Table.Cell css={{textAlign: "end"}}>
                                                {fund.details.targetReturns.formattedIrr}
                                            </Table.Cell>

                                            <Table.Cell css={{textAlign: "end"}}>
                                                {fund.details.targetReturns.formattedTvpi}
                                            </Table.Cell>

                                            <Table.Cell css={{textAlign: "end"}}>
                                                {fund.details.targetReturns.formattedDpi}
                                            </Table.Cell>

                                            <Table.Cell css={{textAlign: "end"}}>
                                                {fund.strategy.description}
                                            </Table.Cell>

                                            <Table.Cell css={{textAlign: "end"}}>
                                                {fund.details.formattedMaxRaise}
                                            </Table.Cell>

                                            {/*TODO - since LP tokens are issued 1:1, use the outstanding supply here*/}

                                            <Table.Cell css={{minWidth: "200px", padding: "15px 20px 5px 20px"}}>

                                                <Progress size={"sm"} value={openFundProgress[i]?.percentageComplete ?? 0} color={"success"} status={"success"}/>

                                                <Text size={12} color={"gray"}>
                                                    {openFundProgress[i]?.amountRaised ?? "--"} Raised
                                                </Text>

                                            </Table.Cell>

                                            <Table.Cell css={{textAlign: "end", float: "right", margin: "5px 0"}}>
                                                <Link to={"/markets/equity/pool-details"}>
                                                    <Button ghost
                                                            color={"primary"}
                                                            size={"xs"}
                                                            borderWeight={"light"}
                                                            style={{margin: 0, fontWeight: "bold", borderRadius: 0}}>

                                                        DETAILS

                                                    </Button>

                                                </Link>

                                            </Table.Cell>

                                        </Table.Row>

                                    ))

                                }
                            </Table.Body>

                        </Table>

                    </Card.Body>

                    <Card.Footer/>

                </Card>

            </Grid>

            {/* ACTIVE FUNDS */}
            <Grid xs={12}>

                <Card>

                    <Card.Header style={{padding: "20px 0 0 20px"}}>
                        <Text h3 css={{letterSpacing: "2px"}}>ACTIVE FUNDS</Text>
                    </Card.Header>

                    <Card.Body>
                        <Table shadow={false} sticked headerLined>
                            <Table.Header>
                                <Table.Column>Fund</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>Paid-in
                                    Capital</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>Carrying
                                    Value</Table.Column>
                                <Table.Column align={"end"}
                                              css={{paddingRight: theme.space["5"].computedValue}}>TVPI</Table.Column>
                                <Table.Column align={"end"}
                                              css={{paddingRight: theme.space["5"].computedValue}}>DPI</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>Net
                                    IRR</Table.Column>
                                <Table.Column align={"end"}>Fund Vintage</Table.Column>
                                <Table.Column children={""}/>
                            </Table.Header>
                            <Table.Body>
                                {
                                    (funds.active ?? []).map(fund => (
                                        <Table.Row>

                                            <Table.Cell>
                                                <User size={"sm"} name={fund.name} src={fund.token.image}/>
                                            </Table.Cell>

                                            <Table.Cell css={{textAlign: "end"}}>
                                                {fund.performance.formattedPaidInCapital}
                                            </Table.Cell>

                                            <Table.Cell css={{textAlign: "end"}}>
                                                {fund.performance.formattedCarryingValue}
                                            </Table.Cell>

                                            <Table.Cell css={{textAlign: "end"}}>
                                                {fund.performance.formattedTvpi}
                                            </Table.Cell>

                                            <Table.Cell css={{textAlign: "end"}}>
                                                {fund.performance.formattedDpi}
                                            </Table.Cell>

                                            <Table.Cell css={{textAlign: "end"}}>
                                                {fund.performance.formattedNetIrr}
                                            </Table.Cell>

                                            <Table.Cell css={{textAlign: "end"}}>
                                                {fund.details.vintageYear}
                                            </Table.Cell>

                                            <Table.Cell css={{textAlign: "end", float: "right", margin: "5px 0"}}>

                                                <Button light
                                                        size={"xs"}
                                                        borderWeight={"light"}
                                                        disabled={true}
                                                        style={{margin: 0, fontWeight: "bold"}}>

                                                    DETAILS

                                                </Button>

                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                }

                            </Table.Body>
                        </Table>
                    </Card.Body>

                    <Card.Footer/>

                </Card>

            </Grid>

        </Grid.Container>
    )

}