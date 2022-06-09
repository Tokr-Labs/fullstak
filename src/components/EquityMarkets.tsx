import React, {useContext, useEffect, useMemo, useState} from "react";
import {Button, Card, Grid, Progress, Table, Text, theme} from "@nextui-org/react";
import {Link} from "react-router-dom";
import {TooltipWithIcon} from "./TooltipWithIcon";
import {TokenServices} from "../services/token-services";
import {useConnection} from "@solana/wallet-adapter-react";
import {USDC_DEVNET} from "../models/constants";
import {CurrencyFormatter} from "../utils/currency-formatter";
import {PublicKey} from "@solana/web3.js";
import {DaoCollection} from "../models/dao/dao-collection";
import {NetworkContext} from "../App";
import {DaoService} from "../services/dao-service";
import {DaoInfoContext} from "../models/contexts/dao-context";

export const EquityMarkets = () => {

    const connection = useConnection().connection;
    const {setDao} = useContext(DaoInfoContext);
    const {network} = useContext(NetworkContext);

    const tokenServices = useMemo(() => new TokenServices(connection), [connection])

    const [openFundProgress, setOpenFundProgress] = useState<{ amountRaised?: string, percentageComplete?: number }[]>([]);
    const [collection, setCollection] = useState<DaoCollection>({open: [], active: [], all: []});

    const daoService = useMemo<DaoService>(() => {
        return new DaoService()
    }, []);

    useEffect(() => {

        daoService.getDaos(network)
            .then(setCollection)
            .catch(console.error)

    }, [network, daoService]);

    useEffect(() => {

        const promises = collection.open.map(fund => {

            const lpTokenMintGovernance = fund?.addresses.governance.lpGovernance as PublicKey;

            return tokenServices.getTokenHoldingAmount(USDC_DEVNET, lpTokenMintGovernance)

        })

        Promise.all(promises ?? [])
            .then(result => {

                const fundProgresses: { amountRaised?: string, percentageComplete?: number }[] = [];

                collection.open.forEach((fund, i) => {

                    fundProgresses.push({
                        amountRaised: CurrencyFormatter.formatUsd(result[i] ?? 0, true),
                        percentageComplete: ((result[i] ?? 0) / fund.details.maxRaise) * 100
                    });

                })

                setOpenFundProgress(fundProgresses);
            })


    }, [connection, collection, tokenServices])

    return (
        <Grid.Container gap={2}>

            {/* OPEN FUNDS */}
            <Grid xs={12}>
                <Card>

                    <Card.Header>
                        <Text
                            size={24}
                            weight={"bold"}
                            css={{letterSpacing: 1.5}}
                        >
                            OPEN FUNDS
                        </Text>
                    </Card.Header>

                    <Card.Body>
                        <Table shadow={false} sticked headerLined aria-label="open funds">

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
                                <Table.Column align={"end"}
                                              css={{paddingRight: theme.space["5"].computedValue}}>Strategy</Table.Column>
                                <Table.Column align={"end"} css={{paddingRight: theme.space["5"].computedValue}}>Max
                                    Raise</Table.Column>
                                <Table.Column align={"center"}>Progress</Table.Column>
                                <Table.Column children=""/>

                            </Table.Header>

                            <Table.Body>

                                {
                                    (collection.open ?? []).map((fund, i) => (

                                        <Table.Row key={`open-fund-${i}`}>

                                            <Table.Cell>
                                                <img
                                                    src={fund.token.image}
                                                    height={20}
                                                    width={20}
                                                    alt={"Fund icon"}
                                                    style={{
                                                        borderRadius: "50%",
                                                        margin: "0 10px",
                                                        verticalAlign: "middle"
                                                    }}
                                                />
                                                <span style={{verticalAlign: "middle"}}>
                                                    {fund.name}
                                                </span>
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

                                            <Table.Cell css={{minWidth: "200px", padding: "15px 20px 5px 20px"}}>

                                                <Progress
                                                    size={"sm"}
                                                    indeterminated={openFundProgress[i]?.percentageComplete === undefined}
                                                    value={openFundProgress[i]?.percentageComplete}
                                                    color={
                                                        openFundProgress[i]?.percentageComplete === undefined
                                                            ? "secondary"
                                                            : "success"
                                                    }
                                                    status={"primary"}
                                                />

                                                <Text size={12} color={"gray"}>
                                                    {openFundProgress[i]?.amountRaised ?? "--"} Raised
                                                </Text>

                                            </Table.Cell>

                                            <Table.Cell css={{textAlign: "end", float: "right", margin: "5px 0"}}>

                                                <Link to={"/markets/equity/" + fund.token.ticker + "/fund-details"}>
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

                    <Card.Header>
                        <Text
                            size={24}
                            weight={"bold"}
                            css={{letterSpacing: 1.5}}
                        >
                            ACTIVE FUNDS
                        </Text>
                    </Card.Header>

                    <Card.Body>
                        <Table shadow={false} sticked headerLined aria-label="active funds">
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
                                {
                                    (collection.active ?? []).map((fund, i) => (
                                        <Table.Row key={`active-fund-${i}`}>

                                            <Table.Cell>
                                                <img
                                                    src={fund.token.image}
                                                    height={20}
                                                    width={20}
                                                    alt={"Fund icon"}
                                                    style={{
                                                        borderRadius: "50%",
                                                        margin: "0 10px",
                                                        verticalAlign: "middle"
                                                    }}
                                                />
                                                <span style={{verticalAlign: "middle"}}>
                                                    {fund.name}
                                                </span>
                                            </Table.Cell>

                                            <Table.Cell css={{textAlign: "end"}}>
                                                {fund.performance.formattedPaidInCapital}
                                            </Table.Cell>

                                            <Table.Cell css={{textAlign: "end"}}>
                                                {fund.performance.formattedCarryingValue}
                                            </Table.Cell>

                                            <Table.Cell css={{textAlign: "end"}}>
                                                {fund.performance.formattedNetIrr}
                                            </Table.Cell>

                                            <Table.Cell css={{textAlign: "end"}}>
                                                {fund.performance.formattedTvpi}
                                            </Table.Cell>

                                            <Table.Cell css={{textAlign: "end"}}>
                                                {fund.performance.formattedDpi}
                                            </Table.Cell>

                                            <Table.Cell css={{textAlign: "end"}}>
                                                {fund.details.vintageYear}
                                            </Table.Cell>

                                            <Table.Cell css={{textAlign: "end", float: "right", margin: "5px 0"}}>

                                                <Link to={"/markets/equity/" + fund.token.ticker + "/fund-details"}>
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