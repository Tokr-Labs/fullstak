import React, {useContext} from "react";
import {Button, Card, Grid, Spacer, Text} from "@nextui-org/react";
import {TooltipWithIcon} from "../TooltipWithIcon";
import {DaoInfoContext} from "../../models/contexts/dao-context";

export const FundSummary = () => {

    const {dao} = useContext(DaoInfoContext)

    return (
        <Grid xs={12} md={8}>

            <Card>

                <Card.Header>
                    <Text
                        size={24}
                        weight={"bold"}
                    >
                        Fund Summary
                    </Text>
                </Card.Header>

                <Card.Body style={{padding: "20px 30px 20px 30px"}}>

                    <Grid.Container>
                        <Grid xs={12} md={4} direction={"column"}>
                            <div style={{fontWeight: "bold", fontSize: 15}}>
                                Token
                            </div>
                            <Spacer y={0.3}/>
                            <div style={{marginBottom: "20px"}}>
                                <img
                                    src={require("src/assets/issuers/miami_fund_1.png")}
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
                                    size={24}
                                    weight={"bold"}
                                    style={{
                                        display: "inline",
                                        marginLeft: "10px",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    {dao.token.ticker}
                                </Text>
                            </div>
                        </Grid>
                        <Grid xs={12} md={4} direction={"column"}>
                            <div style={{fontWeight: "bold", fontSize: 15}}>
                                General Partner
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
                            <Spacer y={0.3}/>
                            <div style={{marginBottom: "20px"}}>
                                <img
                                    src={require("src/assets/issuers/miami_capital.png")}
                                    alt={"General Partner"}
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
                                    size={24}
                                    weight={"bold"}
                                    style={{
                                        display: "inline",
                                        marginLeft: "10px",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    {dao.stakeholders.sponsor.name}
                                </Text>
                            </div>
                        </Grid>
                        <Grid xs={12} md={4} direction={"column"}>
                            <div style={{fontWeight: "bold", fontSize: 15}}>
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
                            <Spacer y={0.3}/>
                            <div style={{marginBottom: "20px"}}>
                                <img
                                    src={require("src/assets/issuers/tokr_labs.png")}
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
                                    size={24}
                                    weight={"bold"}
                                    style={{
                                        display: "inline",
                                        marginLeft: "10px",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    {dao.stakeholders.delegate.name}
                                </Text>
                            </div>
                        </Grid>
                    </Grid.Container>

                    <Spacer y={1}/>

                    <Grid.Container>
                        <Grid xs={12} direction={"column"}>
                            <Text
                                size={15}
                                weight={"bold"}
                            >
                                Fund Overview
                            </Text>
                            <Text size={18}>
                                {dao.description}
                            </Text>
                        </Grid>
                    </Grid.Container>

                    <Spacer y={2}/>

                    <Grid.Container>
                        <Grid direction={"column"}>
                            <Text
                                size={15}
                                weight={"bold"}
                            >
                                Data Room
                            </Text>
                            <Spacer y={0.5}/>
                            <Button
                                ghost
                                disabled={!dao.details.dataRoom}
                                color={"primary"}
                                style={{fontWeight: "bold", borderRadius: 0}}
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