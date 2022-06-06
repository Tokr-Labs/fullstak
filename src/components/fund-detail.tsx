import React, {useState} from "react";
import {Button, Card, Grid, Spacer, Text, useTheme} from "@nextui-org/react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {FundOpen} from "./fund/fund-open";
import {FundSummary} from "./fund/fund-summary";

export const FundDetail = () => {

    const pathname = useLocation().pathname;
    const segment = pathname.substring(pathname.lastIndexOf("/") + 1);
    const urlBasedTab = segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();

    const tabs = ["Assets", "Members", "Transactions", "Proposals", "Configuration"]
    const [activeTab, setActiveTab] = useState(tabs.includes(urlBasedTab) ? urlBasedTab : tabs[0]);

    const theme = useTheme();

    const navigate = useNavigate();

    const handleClick = (tab) => {
        setActiveTab(tab);
        navigate(tab.toLowerCase());
    }

    return (
        <>
            <Grid.Container gap={2}>

                <FundOpen/>

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