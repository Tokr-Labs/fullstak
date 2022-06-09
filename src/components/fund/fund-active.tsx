import React, {useContext, useState} from "react";
import {Button, Card, Grid, Spacer, Text, useTheme} from "@nextui-org/react";
import {DaoInfoContext} from "../../models/contexts/dao-context";
import {TooltipWithIcon} from "../tooltip-with-icon";
import {Area, AreaChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';

export const FundActive = () => {

    const {theme} = useTheme();
    const {dao} = useContext(DaoInfoContext)

    const [performanceTimeframe, setPerformanceTimeframe] = useState("All");
    const [performanceMetric, setPerformanceMetric] = useState("CV");

    const updateTimeframe = (timeframe) => {
        setPerformanceTimeframe(timeframe)
    }

    const updateMetric = (metric) => {
        setPerformanceMetric(metric)
    }

    const DetailsSection = (props: { title: string, tooltipContent: string, value: string }) => {
        return (
            <Grid xs={4} direction={"column"}>
                <div style={{letterSpacing: 1, fontSize: 15}}>
                    {props.title}
                    <TooltipWithIcon
                        color={"white"}
                        content={props.tooltipContent}
                    />
                </div>
                <Text
                    size={32}
                    weight={"bold"}
                    color={"white"}
                    margin={0}
                >
                    {props.value}
                </Text>
            </Grid>
        )
    }

    const data = [
        {
            x: 'Jan',
            y: 2400,
        },
        {
            x: 'Feb',
            y: 1398,
        },
        {
            x: 'Mar',
            y: 4000,
        },
        {
            x: 'Apr',
            y: 3600,
        },
        {
            x: 'May',
            y: 8800,
        },
        {
            x: 'Jun',
            y: 7200,
        },
    ];

    return (
        <Grid xs={12}>
            <Card className={"dark-card"}>

                <Card.Body style={{padding: "30px 30px", color: "white"}}>
                    <Grid.Container>

                        <Grid xs={12} md={6} direction={"column"}>

                            <Grid.Container gap={1} alignItems={"center"}>
                                <Grid style={{paddingLeft: 0}}>
                                    <img
                                        src={require("src/assets/issuers/miami_fund_1.png")}
                                        height={"100px"}
                                        width={"100px"}
                                        alt={"Miami Fund 1 logo"}
                                        style={{
                                            maxHeight: "15vw",
                                            maxWidth: "15vw",
                                            borderRadius: "50%",
                                            boxShadow: "0px 0px 10px 10px rgba(190,0,255, 0.5)",
                                        }}
                                    />
                                </Grid>
                                <Grid style={{marginLeft: "20px"}}>
                                    <Text
                                        size={"min(56px, 8vw)"}
                                        weight={"bold"}
                                        color={"white"}
                                        style={{margin: 0}}
                                    >
                                        {dao.name}
                                    </Text>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center"
                                    }}>
                                        <span style={{
                                            height: "10px",
                                            width: "10px",
                                            background: theme?.colors.primary.value,
                                            borderRadius: "50%",
                                            marginRight: "10px"
                                        }}/>
                                        <Text size={15} color={"white"}>Active</Text>
                                    </div>
                                </Grid>
                            </Grid.Container>

                            <Spacer y={3}/>

                            <Grid.Container gap={1}>
                                <DetailsSection
                                    title={"Fund Vintage"}
                                    tooltipContent={`
                                        Fund Vintage refers to the year in which the first 
                                        influx of investment capital is delivered to a fund.
                                    `}
                                    value={dao.details.vintageYear}
                                />
                                <DetailsSection
                                    title={"Paid-in Capital"}
                                    tooltipContent={`
                                        Paid-in Capital is the full amount of cash or other assets 
                                        that shareholders have contributed to a fund in exchange 
                                        for ownership shares.
                                    `}
                                    value={"--"}
                                />
                                <DetailsSection
                                    title={"Carrying Value"}
                                    tooltipContent={`
                                        Carrying Value of an asset is the original purchase price 
                                        or most recently appraised value less any accumulated 
                                        depreciation, amortization, or impairment expenses from 
                                        its original cost. Relative to a fund, this metric measures 
                                        the total carrying value of assets under management over 
                                        time, less any depreciation, amortization, or impairment 
                                        expenses from its original cost.
                                    `}
                                    value={"--"}
                                />
                                <DetailsSection
                                    title={"Net IRR"}
                                    tooltipContent={`
                                        Internal Rate of Return (IRR) is a metric used to estimate 
                                        the profitability of potential investments. IRR is a 
                                        discount rate that makes the net present value (NPV) of 
                                        all cash flows from an investment equal to zero in a 
                                        discounted cash flow analysis––in other words, it is the 
                                        annual rate of growth that an investment is expected to 
                                        generate. Generally speaking, the higher an internal rate 
                                        of return, the more desirable an investment is to undertake.
                                    `}
                                    value={"--"}
                                />
                                <DetailsSection
                                    title={"TVPI"}
                                    tooltipContent={`
                                        Total Value to Paid-in (“TVPI”) is the ratio of the current 
                                        value of current investments within a fund, plus the total 
                                        value of all distributions made to date, relative to the total 
                                        amount of capital paid into the fund to date.
                                    `}
                                    value={"--"}
                                />
                                <DetailsSection
                                    title={"DPI"}
                                    tooltipContent={`
                                        Distributions to Paid-in (“DPI”) is the ratio of money 
                                        distributed to investors by the fund, relative to the 
                                        total amount of capital paid into the fund.
                                    `}
                                    value={"--"}
                                />
                            </Grid.Container>

                        </Grid>

                        <Grid xs={12} md={6} direction={"column"}>
                            <Spacer y={1}/>

                            <Text size={15} weight={"bold"} color={"white"}>Performance</Text>

                            <Button.Group size={"sm"}>
                                {Array.of("1D", "1W", "1M", "3M", "6M", "1Y", "All")
                                    .map((timeframe, i) => {
                                        return (
                                            <Button
                                                key={timeframe}
                                                onClick={() => updateTimeframe(timeframe)}
                                                style={{
                                                    backgroundColor: performanceTimeframe === timeframe
                                                        ? theme?.colors.secondary.value
                                                        : "#150335"
                                                }}
                                            >
                                                {timeframe}
                                            </Button>
                                        )
                                    })
                                }
                            </Button.Group>

                            <Button.Group size={"sm"}>
                                {Array.of("CV", "IRR", "TVPI", "DPI")
                                    .map((metric, i) => {
                                        return (
                                            <Button
                                                key={metric}
                                                onClick={() => updateMetric(metric)}
                                                style={{
                                                    backgroundColor: performanceMetric === metric
                                                        ? theme?.colors.secondary.value
                                                        : "#150335"
                                                }}
                                            >
                                                {metric}
                                            </Button>
                                        )
                                    })
                                }
                            </Button.Group>

                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={data}
                                    margin={{
                                        top: 30,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={theme?.colors.primary.value} stopOpacity={1}/>
                                            <stop offset="100%" stopColor={theme?.colors.primary.value} stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="x"
                                        tick={{ fill: "white"}}
                                    />
                                    <YAxis tick={{ fill: "white" }}/>
                                    <Area
                                        type="monotone"
                                        dataKey="y"
                                        stroke={theme?.colors.primary.value}
                                        strokeWidth={2}
                                        fill="url(#colorY)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>

                        </Grid>

                    </Grid.Container>
                </Card.Body>

            </Card>
        </Grid>
    )

}