import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {Button, Card, Grid, Input, Modal, Progress, Spacer, Text, Tooltip, User, useTheme} from "@nextui-org/react";
import {Pill} from "./Pill";
import {BackIcon} from "./icons/BackIcon";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {PublicKey, Transaction} from "@solana/web3.js";
import {FileIcon} from "./icons/FileIcon"
import {NetworkContext} from "../App";
import {WalletAdapterNetwork, WalletNotConnectedError} from "@solana/wallet-adapter-base";
import {TokenServices} from "../services/token-services";
import {USDC_DEVNET, USDC_MAINNET} from "../models/constants";
import {createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID} from "@solana/spl-token";

export const PoolDetail = () => {

    const pathname = useLocation().pathname;
    const segment = pathname.substring(pathname.lastIndexOf("/") + 1);
    const urlBasedTab = segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();

    const tabs = ["Assets", "Members", "Proposals", "Transactions"]
    const [activeTab, setActiveTab] = useState(tabs.includes(urlBasedTab) ? urlBasedTab : tabs[0]);

    const wallet = useWallet();
    const {connection} = useConnection()
    const {network} = useContext(NetworkContext)

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

    const tokenServices = useMemo(() => new TokenServices(connection), [connection])

    const [usdcHoldings, setUsdcHoldings] = useState<number | null>(0);

    useEffect(() => {
        if (wallet.connected) {
            tokenServices.getTokenHoldingAmount(
                network === WalletAdapterNetwork.Devnet ? USDC_DEVNET : USDC_MAINNET,
                wallet.publicKey as PublicKey
            ).then(amount => setUsdcHoldings(amount))
        }
    }, [network, tokenServices, wallet])

    // TODO - make this specific to both the url path and RPC network selection
    const data = require("src/daos/devnet/tj-test-dao.json")

    const makeDeposit = useCallback(async () => {
        if (!wallet.publicKey) throw new WalletNotConnectedError()

        const usdc = network === WalletAdapterNetwork.Devnet ? USDC_DEVNET : USDC_MAINNET

        const sourceTokenAccount = await getAssociatedTokenAddress(
            usdc,
            wallet.publicKey
        )

        const decimals = await tokenServices.getTokenDecimals(usdc)

        const transaction = new Transaction().add(
            createTransferInstruction(
                sourceTokenAccount,
                new PublicKey(data.addresses.treasury.capital_supply),
                wallet.publicKey,
                tokensToReceive * (10**decimals),
                [],
                TOKEN_PROGRAM_ID
            )
        )

        const signature = await wallet.sendTransaction(transaction, connection)

        await connection.confirmTransaction(signature, "processed")

        // TODO - hacky way to get rid of modal and update balances, refactor this
        window.location.reload()

    }, [connection, data.addresses.treasury.capital_supply, network, tokenServices, tokensToReceive, wallet])

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
                                <h3>{data.name}</h3>
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
                                <span>{data.details.min_raise}</span>
                            </Grid>
                            <Grid xs={4} direction={"column"}>
                                <b>Maximum raise</b>
                                <span>{data.details.max_raise}</span>
                            </Grid>
                            <Grid xs={4} direction={"column"}>
                                <b>Fundraise Closing</b>
                                <span>{data.details.raise_close}</span>
                            </Grid>
                            <Grid xs={12}>
                                <br/>
                            </Grid>
                            <Grid xs={4} direction={"column"}>
                                <b>LP Token Minted</b>
                                <span style={{color: "red"}}>5,000,000 27C</span>
                            </Grid>
                            <Grid xs={4} direction={"column"}>
                                <b>LP Token Max Supply</b>
                                <span style={{color: "red"}}>10,000,000 27C</span>
                            </Grid>
                            <Grid xs={4} direction={"column"}>
                                <b>Fund Term</b>
                                <span>{data.details.fund_term}</span>
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
                                        <Text h3 id={"modal-title"}>
                                            Invest in <span>{data.name}</span>
                                        </Text>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Input
                                            type={"number"}
                                            label={"Deposit"}
                                            status={tokensToReceive > usdcHoldings! ? "error" : "default"}
                                            labelRight={"USDC"}
                                            style={{textAlign: "right"}}
                                            helperText={"You have " + usdcHoldings + " USDC available in your wallet"}
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
                                        <Button color={"gradient"}
                                                disabled={tokensToReceive > usdcHoldings!}
                                                onClick={makeDeposit}
                                        >
                                            Invest
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <Tooltip content={wallet.connected ? "" : "Connect your wallet!"}>
                                    <Button size={"lg"}
                                            color={"gradient"}
                                            onClick={toggleModal}
                                            disabled={!wallet.connected}
                                    >
                                        Deposit
                                    </Button>
                                </Tooltip>
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
                        <p>{data.description}</p>

                        <h4>Sponsor</h4>
                        <User name={data.people.sponsor.name}
                              // TODO - source image from json file
                              src={require("src/assets/issuers/tj_kyner.png")}
                              squared
                              size={"xl"}
                              bordered
                              color={"gradient"}
                              style={{paddingLeft: 0}}
                        >
                            {data.people.sponsor.company}
                        </User>
                        <Spacer y={1}/>

                        <h4>Data Room</h4>
                        <Grid.Container gap={1} alignItems={"center"}>
                            <Grid>
                                <FileIcon/>
                            </Grid>
                            <Grid>
                                <Button size={"sm"} color={"gradient"}>Download</Button>
                            </Grid>
                        </Grid.Container>

                        <h4>Target Returns</h4>
                        <Grid.Container>
                            <Grid xs={6}>IRR</Grid>
                            <Grid xs={6}>{data.details.target_returns.irr}</Grid>
                            <Grid xs={6}>Cash on Cash</Grid>
                            <Grid xs={6}>{data.details.target_returns.coc}</Grid>
                        </Grid.Container>
                        <Spacer y={1}/>

                        <h4>Delegate</h4>
                        <User name={data.people.delegate.name}
                              // TODO - source image from json file
                              src={require("src/assets/issuers/tj_kyner.png")}
                              squared
                              size={"xl"}
                              bordered
                              color={"gradient"}
                              style={{paddingLeft: 0}}
                        >
                            {data.people.delegate.company}
                        </User>
                        <Spacer y={1}/>

                        <h4>Fees</h4>
                        <Grid.Container>
                            <Grid xs={6}>Closing</Grid>
                            <Grid xs={6}>{data.details.fees.closing}</Grid>
                            <Grid xs={6}>Annual</Grid>
                            <Grid xs={6}>{data.details.fees.annual}</Grid>
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