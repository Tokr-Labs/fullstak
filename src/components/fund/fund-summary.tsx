import React from "react";
import {Button, Card, Grid, Spacer, Text, theme} from "@nextui-org/react";
import {TooltipWithIcon} from "../tooltip-with-icon";
import {DaoInfo} from "../../models/dao/dao-info";

export interface FundSummaryProps {
    dao?: DaoInfo
}

export const FundSummary = (props: FundSummaryProps) => {

    const {dao} = props

    return (
        <Grid xs={12} md={8}>

            <Card>

                <Card.Header>
                    <Text
                        size={theme.fontSizes.xl.computedValue}
                        weight={"bold"}
                    >
                        Fund Summary
                    </Text>
                </Card.Header>

                <Card.Body style={{padding: "20px 30px 20px 30px"}}>

                    <Grid.Container justify={"space-between"}>
                        <Grid xs={12} md={3} direction={"column"}>
                            <div style={{
                                fontWeight: theme.fontWeights.bold.computedValue,
                                fontSize: theme.fontSizes.base.computedValue
                            }}>
                                CEO
                                <TooltipWithIcon
                                    color={"black"}
                                    content={`
                                                A General Partner (“GP”) has the authority to deploy capital on 
                                                behalf of the fund. GPs bring specialized knowledge and skills to 
                                                the fund with the goal of generating returns for investors. Unlike 
                                                a limited partner, the general partner may have unlimited liability 
                                                for the debts of the business. GPs may be removed from the fund at 
                                                any time by investors.
                                            `}
                                />
                            </div>
                            <Spacer y={0.5}/>
                            <div style={{marginBottom: "20px"}}>
                                <img
                                    src={dao?.stakeholders.sponsor.image}
                                    alt={"CEO"}
                                    height={40}
                                    width={40}
                                    style={{
                                        verticalAlign: "middle",
                                        borderRadius: "50%",
                                        boxShadow: "0px 0px 10px rgba(190,0,255, 0.5)",
                                        backgroundColor: "rgba(21,3,53, 1)"
                                    }}
                                />
                                <Text
                                    size={theme.fontSizes.lg.computedValue}
                                    weight={"bold"}
                                    style={{
                                        display: "inline",
                                        marginLeft: "10px",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    {dao?.stakeholders.sponsor.name}
                                </Text>
                            </div>
                        </Grid>
                        <Grid xs={12} md={3} direction={"column"}>
                            <div style={{
                                fontWeight: theme.fontWeights.bold.computedValue,
                                fontSize: theme.fontSizes.base.computedValue
                            }}>
                                Chairman
                                <TooltipWithIcon
                                    color={"black"}
                                    content={`
                                                A General Partner (“GP”) has the authority to deploy capital on 
                                                behalf of the fund. GPs bring specialized knowledge and skills to 
                                                the fund with the goal of generating returns for investors. Unlike 
                                                a limited partner, the general partner may have unlimited liability 
                                                for the debts of the business. GPs may be removed from the fund at 
                                                any time by investors.
                                            `}
                                />
                            </div>
                            <Spacer y={0.5}/>
                            <div style={{marginBottom: "20px"}}>
                                <img
                                    src={dao?.stakeholders.chairman.image}
                                    alt={"Chairman"}
                                    height={40}
                                    width={40}
                                    style={{
                                        verticalAlign: "middle",
                                        borderRadius: "50%",
                                        boxShadow: "0px 0px 10px rgba(190,0,255, 0.5)",
                                        backgroundColor: "rgba(21,3,53, 1)"
                                    }}
                                />
                                <Text
                                    size={theme.fontSizes.lg.computedValue}
                                    weight={"bold"}
                                    style={{
                                        display: "inline",
                                        marginLeft: "10px",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    {dao?.stakeholders.chairman.name}
                                </Text>
                            </div>
                        </Grid>
                        <Grid xs={12} md={3} direction={"column"}>
                            <div style={{
                                fontWeight: theme.fontWeights.bold.computedValue,
                                fontSize: theme.fontSizes.base.computedValue
                            }}>
                                Fund Administrator
                                <TooltipWithIcon
                                    color={"black"}
                                    content={`
                                                A Fund Administrator has the responsibility of ensuring a fund’s GP 
                                                is acting in the best interest of investors. Additionally, investors 
                                                delegate to Fund Administrators the authority to act on their behalf 
                                                and in their best interests. Like GPs, Fund Administrators can be 
                                                removed at any time through a vote by investors.
                                            `}
                                />
                            </div>
                            <Spacer y={0.5}/>
                            <div style={{marginBottom: "20px"}}>
                                <img
                                    src={dao?.stakeholders.delegate.image}
                                    alt={"Fund Administrator"}
                                    height={40}
                                    width={40}
                                    style={{
                                        verticalAlign: "middle",
                                        borderRadius: "50%",
                                        boxShadow: "0px 0px 10px rgba(190,0,255, 0.5)",
                                        backgroundColor: "rgba(21,3,53, 1)"
                                    }}
                                />
                                <Text
                                    size={theme.fontSizes.lg.computedValue}
                                    weight={"bold"}
                                    style={{
                                        display: "inline",
                                        marginLeft: "10px",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    {dao?.stakeholders.delegate.name}
                                </Text>
                            </div>
                        </Grid>
                        <Grid xs={12} md={3} direction={"column"}>
                            <div style={{
                                fontWeight: theme.fontWeights.bold.computedValue,
                                fontSize: theme.fontSizes.base.computedValue
                            }}>
                                Token
                            </div>
                            <Spacer y={0.5}/>
                            <div style={{marginBottom: "20px"}}>
                                <img
                                    src={dao?.token.image}
                                    alt={"Token"}
                                    height={40}
                                    width={40}
                                    style={{
                                        verticalAlign: "middle",
                                        borderRadius: "50%",
                                        boxShadow: "0px 0px 10px rgba(190,0,255, 0.5)",
                                        backgroundColor: "rgba(21,3,53, 1)"
                                    }}
                                />
                                <Text
                                    size={theme.fontSizes.lg.computedValue}
                                    weight={"bold"}
                                    style={{
                                        display: "inline",
                                        marginLeft: "10px",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    {dao?.token.ticker}
                                </Text>
                            </div>
                        </Grid>
                    </Grid.Container>

                    <Spacer y={1}/>

                    <Grid.Container>
                        <Grid xs={12} direction={"column"}>
                            <Text
                                size={theme.fontSizes.base.computedValue}
                                weight={"bold"}
                            >
                                Fund Overview
                            </Text>
                            <Text size={theme.fontSizes.md.computedValue}>
                                {dao?.description}
                            </Text>
                        </Grid>
                    </Grid.Container>

                    <Spacer y={2}/>

                    <Grid.Container>
                        <Grid direction={"column"}>
                            <Text
                                size={theme.fontSizes.base.computedValue}
                                weight={"bold"}
                            >
                                Data Room
                            </Text>
                            <Spacer y={0.5}/>
                            <Button
                                ghost
                                disabled={!dao?.details.dataRoom}
                                color={"primary"}
                                style={{
                                    fontWeight: theme.fontWeights.bold.computedValue,
                                    borderRadius: 0
                                }}
                            >
                                DOWNLOAD
                            </Button>
                        </Grid>
                    </Grid.Container>

                </Card.Body>

            </Card>

        </Grid>
    )

}