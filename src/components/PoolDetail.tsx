import React, {useState} from "react";
import {Button, Card, Grid, Input, Modal, Progress, Spacer, Text, User, useTheme} from "@nextui-org/react";
import {Pill} from "./Pill";
import {BackIcon} from "./icons/BackIcon";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {DepositLiquidityAction} from "../services/actions/deposit-liquidity-action";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {PublicKey} from "@solana/web3.js";
import {FileIcon} from "./icons/FileIcon"

export const PoolDetail = () => {

    const pathname = useLocation().pathname;
    const segment = pathname.substring(pathname.lastIndexOf("/") + 1);
    const urlBasedTab = segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();

    const tabs = ["Assets", "Members", "Proposals", "Transactions"]
    const [activeTab, setActiveTab] = useState(tabs.includes(urlBasedTab) ? urlBasedTab : tabs[0]);

    const wallet = useWallet();
    const {connection} = useConnection()

    const theme = useTheme();

    const navigate = useNavigate();

    const handleClick = (tab) => {
        setActiveTab(tab);
        navigate(tab.toLowerCase());
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
        setTokensToReceive(0)
    }

    const [tokensToReceive, setTokensToReceive] = useState<number>(0);

    const depositLiquidity = () => {

        let action = new DepositLiquidityAction(connection, wallet)

        // @TODO - replace with realm pub key
        const group = new PublicKey("C8ooyFa5KTqYWuR8zdv4XHukfNCabWcBryUMvn7bXVyf")

        // @TODO: replace with whoever has update these records
        const authority = new PublicKey("HMZtv7yMrcEUVTCEnsrwsCdpCWxkKnayyoVV562uACoa")

        action.execute(group, authority)
            .catch(value => console.log(value))
            .catch(error => console.error(error))

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
                                <Pill color={theme.theme?.colors.primary.value} text={"Raising"}/>
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
                                <Modal
                                    closeButton
                                    aria-labelledby="modal-title"
                                    open={isModalOpen}
                                    onClose={toggleModal}
                                >
                                    <Modal.Header>
                                        <Text h3 id={"modal-title"}>Invest in <span style={{color: "red"}}>27 Crypto</span></Text>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Input
                                            type={"number"}
                                            label={"Deposit"}
                                            labelRight={"USDC"}
                                            style={{textAlign: "right"}}
                                            helperText={"You have XXX,XXX USDC available in your wallet"}
                                            onChange={(e) => {
                                                setTokensToReceive(Number(e.target.value))
                                            }}
                                        />
                                        <Spacer y={0.5}/>
                                        <Input
                                            disabled
                                            value={tokensToReceive}
                                            type={"number"}
                                            label={"Receive"}
                                            labelRight={"27C"}
                                            style={{textAlign: "right"}}
                                            helperText={"These tokens represent your stake in the fund"}
                                        />
                                        <Spacer y={0.5}/>
                                        <p>
                                            Clicking the "Invest" button below will launch a transaction
                                            preview window from your connected wallet for final approval.
                                        </p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button color={"gradient"}>Invest</Button>
                                    </Modal.Footer>
                                </Modal>
                                <Button size={"lg"} color={"gradient"} onClick={toggleModal}>
                                    Deposit
                                </Button>
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
                              style={{paddingLeft: 0}}
                        >
                            27 Capital
                        </User>
                        <Spacer y={1}/>

                        <h4>Data Room</h4>
                        <Grid.Container gap={1} alignItems={"center"}>
                            <Grid>
                                <FileIcon/>
                            </Grid>
                            <Grid>
                                <Button size={"sm"}>Download</Button>
                            </Grid>
                        </Grid.Container>

                        <h4>Target Returns</h4>
                        <Grid.Container>
                            <Grid xs={6}>IRR</Grid>
                            <Grid xs={6}>20%</Grid>
                            <Grid xs={6}>Cash on Cash</Grid>
                            <Grid xs={6}>15%</Grid>
                        </Grid.Container>
                        <Spacer y={1}/>

                        <h4>Delegate</h4>
                        <User name={"Tokr Labs"}
                              src={
                                  theme.isDark
                                      ? require("src/assets/tokr_icon_dark.png")
                                      : require("src/assets/tokr_icon_color.png")
                              }
                              squared
                              size={"xl"}
                              bordered
                              color={"gradient"}
                              style={{paddingLeft: 0}}
                        />
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