import React, {useContext, useEffect, useState} from "react";
import {Button, Card, Grid, Spacer, Text, useTheme} from "@nextui-org/react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {FundOpen} from "./fund/fund-open";
import {FundSummary} from "./fund/fund-summary";
import {FundActive} from "./fund/fund-active";
import {ROUTE_MARKETS_EQUITY} from "../models/constants";
import {NetworkContext} from "../App";
import {DaoInfoContext} from "../models/contexts/dao-context";

export const FundDetails = () => {

    const pathname = useLocation().pathname;
    const segment = pathname.substring(pathname.lastIndexOf("/") + 1);
    const urlBasedTab = segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();

    const tabs = ["Assets", "Members", "Transactions", "Proposals", "Configuration"]
    const [activeTab, setActiveTab] = useState(tabs.includes(urlBasedTab) ? urlBasedTab : tabs[0]);

    const theme = useTheme();
    const navigate = useNavigate();
    const dao = useContext(DaoInfoContext);
    const {network} = useContext(NetworkContext);

    const handleClick = (tab) => {
        setActiveTab(tab);
        navigate(tab.toLowerCase());
    }

    const [currentNetwork, setCurrentNetwork] = useState<string>();

    useEffect(() => {

        // upon a network change, pool details are no longer relevant and we should redirect to the markets
        if (currentNetwork !== undefined && network !== currentNetwork) {
            navigate(ROUTE_MARKETS_EQUITY);
        }

        // set the current network on-load so we can determine a change in network
        setCurrentNetwork(network);

    }, [currentNetwork, navigate, network])

    return (
        <>
            <Grid.Container gap={2}>

                <>
                    {dao.active ? <FundActive/> : <FundOpen/>}
                </>

                <FundSummary/>

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

            <Spacer y={1}/>
        </>
    )

}