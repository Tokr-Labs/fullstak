import React, {useState} from "react";
import {Button, Card, Grid, Progress, Spacer, theme, User} from "@nextui-org/react";
import {Pill} from "./Pill";
import {BackIcon} from "./icons/BackIcon";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";

export const PoolDetail = () => {

    const pathname = useLocation().pathname;
    const segment = pathname.substring(pathname.lastIndexOf("/") + 1);
    const urlBasedTab = segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();

    const tabs = ["Assets", "Members", "Proposals", "Transactions"]
    const [activeTab, setActiveTab] = useState(tabs.includes(urlBasedTab) ? urlBasedTab : tabs[0]);

    const navigate = useNavigate();

    const handleClick = (tab) => {
        setActiveTab(tab);
        navigate(tab.toLowerCase());
    }

    return (
        <Grid.Container gap={2}>

            <Grid xs={8}>
                <Card>

                    <Card.Header>
                        <Grid.Container gap={1} alignItems={"center"}>
                            <Grid css={{alignSelf: "flex-end"}}>
                                <Link to={"/markets/equity"}>
                                    <BackIcon/>
                                </Link>
                            </Grid>
                            <Grid>
                                <h3>27 Crypto</h3>
                            </Grid>
                            <Grid>
                                <Pill color={theme.colors.primary.computedValue} text={"Raising"}/>
                            </Grid>
                        </Grid.Container>
                    </Card.Header>

                    <Card.Body>

                        <h4>Progress</h4>
                        <Progress value={50} shadow={true} color={"gradient"}/>

                        <Spacer y={2}/>

                        <Grid.Container>
                            <Grid xs={4} direction={"column"}>
                                <b>Minimum Raise</b>
                                500,000 USDC
                            </Grid>
                            <Grid xs={4} direction={"column"}>
                                <b>Maximum raise</b>
                                10,000,000 USDC
                            </Grid>
                            <Grid xs={4} direction={"column"}>
                                <b>Fundraise Closing</b>
                                July 31st
                            </Grid>
                            <Grid xs={12}>
                                <br/>
                            </Grid>
                            <Grid xs={4} direction={"column"}>
                                <b>LP Token Minted</b>
                                5,000,000 27C
                            </Grid>
                            <Grid xs={4} direction={"column"}>
                                <b>LP Token Max Supply</b>
                                10,000,000 27C
                            </Grid>
                            <Grid xs={4} direction={"column"}>
                                <b>Fund Term</b>
                                5 Years
                            </Grid>
                        </Grid.Container>

                        <Spacer y={2}/>

                        <Grid.Container>
                            <Grid xs={5}>
                                <Button size={"lg"} color={"gradient"}>Deposit</Button>
                            </Grid>
                        </Grid.Container>

                    </Card.Body>

                </Card>
            </Grid>

            <Grid xs={4}>
                <Card>

                    <Card.Header style={{padding: "20px 0 0 20px"}}>
                        <h3>Pool Details</h3>
                    </Card.Header>

                    <Card.Body>
                        <p>
                            This is a $10M fund designed to deploy capital into preferred
                            equity investments in Miami multifamily acquisitions/repositions.
                        </p>

                        <h4>Sponsor</h4>
                        <User name={"Arash Gohari"}
                              src={require("src/assets/issuers/arash_gohari.png")}
                              squared
                              size={"xl"}
                              bordered
                              color={"gradient"}
                        >
                            27 Capital
                        </User>
                        <Spacer y={1}/>

                        <h4>Data Room</h4>
                        <p>Icon and button here</p>

                        <h4>Target Returns</h4>
                        <Grid.Container>
                            <Grid xs={6}>IRR</Grid>
                            <Grid xs={6}>20%</Grid>
                            <Grid xs={6}>Cash on Cash</Grid>
                            <Grid xs={6}>15%</Grid>
                        </Grid.Container>
                        <Spacer y={1}/>

                        <h4>Delegate</h4>
                        <User name={"First Last"}
                              squared
                              size={"xl"}
                              bordered
                              color={"gradient"}
                        >
                            Tokr Labs
                        </User>
                        <Spacer y={1}/>

                        <h4>Fees</h4>
                        <Grid.Container>
                            <Grid xs={6}>Closing</Grid>
                            <Grid xs={6}>1.00%</Grid>
                            <Grid xs={6}>Annual</Grid>
                            <Grid xs={6}>1.00%</Grid>
                        </Grid.Container>

                    </Card.Body>

                    <Card.Footer/>

                </Card>
            </Grid>

            <Grid xs={12}>
                <Card>

                    <Card.Header>
                        <Grid.Container gap={2}>
                            {tabs.map(tab => {
                                return (
                                    <Grid>
                                        <Button ghost={activeTab !== tab}
                                                color={"gradient"}
                                                onClick={() => handleClick(tab)}
                                        >
                                            {tab}
                                        </Button>
                                    </Grid>
                                )
                            })}
                        </Grid.Container>
                    </Card.Header>

                    <Card.Body>
                        <Outlet/>
                    </Card.Body>

                    <Card.Footer/>

                </Card>
            </Grid>

        </Grid.Container>
    )

}