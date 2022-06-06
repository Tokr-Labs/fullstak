import React, {useContext, useState} from "react";
import {Button, Card, Grid, Spacer, Text, useTheme} from "@nextui-org/react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {DaoInfoContext} from "../models/contexts/dao-context";
import {TooltipWithIcon} from "./TooltipWithIcon";
import {FundOpen} from "./fund/fund-open";

export const FundDetail = () => {

    const pathname = useLocation().pathname;
    const segment = pathname.substring(pathname.lastIndexOf("/") + 1);
    const urlBasedTab = segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();

    const tabs = ["Assets", "Members", "Transactions", "Proposals", "Configuration"]
    const [activeTab, setActiveTab] = useState(tabs.includes(urlBasedTab) ? urlBasedTab : tabs[0]);

    const dao = useContext(DaoInfoContext)

    const theme = useTheme();

    const navigate = useNavigate();

    const handleClick = (tab) => {
        setActiveTab(tab);
        navigate(tab.toLowerCase());
    }

    return (

        <DaoInfoContext.Provider value={dao}>

            <Grid.Container gap={2}>

                <FundOpen/>

                <Grid xs={12} md={8}>

                    <Card>

                        <Card.Header>
                            <Text
                                size={24}
                                weight={"bold"}
                                style={{letterSpacing: 3.2}}
                            >
                                Fund Summary
                            </Text>
                        </Card.Header>

                        <Card.Body style={{padding: "20px 30px 20px 30px"}}>

                            <Grid.Container>
                                <Grid xs={12} md={4} direction={"column"}>
                                    <div style={{letterSpacing: 1, fontWeight: "bold", fontSize: 15}}>
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
                                                letterSpacing: 1
                                            }}
                                        >
                                            {dao.token.ticker}
                                        </Text>
                                    </div>
                                </Grid>
                                <Grid xs={12} md={4} direction={"column"}>
                                    <div style={{letterSpacing: 1, fontWeight: "bold", fontSize: 15}}>
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
                                                letterSpacing: 1
                                            }}
                                        >
                                            {dao.stakeholders.sponsor.name}
                                        </Text>
                                    </div>
                                </Grid>
                                <Grid xs={12} md={4} direction={"column"}>
                                    <div style={{letterSpacing: 1, fontWeight: "bold", fontSize: 15}}>
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
                                                letterSpacing: 1
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
                                        style={{letterSpacing: 2}}
                                    >
                                        Fund Overview
                                    </Text>
                                    <Text
                                        size={18}
                                        style={{letterSpacing: 0.75}}
                                    >
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
                                        style={{letterSpacing: 2}}
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

                <Grid.Container style={{marginTop: "10px"}}>
                    <Grid xs={12}>
                        <Button.Group
                            rounded
                            color={"secondary"}
                            borderWeight={"light"}
                            vertical={window.innerWidth < 600}
                            css={{width: "100%"}}
                        >
                            {tabs.map((tab, i) => {
                                return (
                                    <Button
                                        key={`tab-${i}`}
                                        style={{
                                            color: tab === "Transactions" || tab === "Proposals" ? "gray" : "white",
                                            fontSize: 15,
                                            fontWeight: "bold",
                                            letterSpacing: 2,
                                            textTransform: "uppercase",
                                            backgroundColor: activeTab === tab
                                                ? theme.theme?.colors.primary.computedValue
                                                : "#150335"
                                        }}
                                        disabled={tab === "Transactions" || tab === "Proposals"}
                                        animated={false}
                                        ripple={false}
                                        onClick={() => handleClick(tab)}
                                    >
                                        {tab}
                                    </Button>
                                )
                            })}
                        </Button.Group>
                    </Grid>
                </Grid.Container>

                <Grid xs={12} md={8}>
                    <Card style={{minHeight: "300px"}}>

                        <Card.Header>
                            <Text
                                size={15}
                                weight={"bold"}
                                style={{letterSpacing: 2}}
                            >
                                {activeTab}
                            </Text>
                        </Card.Header>

                        <Card.Body>
                            <Outlet/>
                        </Card.Body>

                        <Card.Footer/>

                    </Card>
                </Grid>

            </Grid.Container>

            <Spacer y={2}/>

        </DaoInfoContext.Provider>

    )

}