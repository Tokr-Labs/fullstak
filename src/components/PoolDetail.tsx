import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {Button, Card, Grid, Input, Modal, Progress, Spacer, Text, Tooltip, User, useTheme} from "@nextui-org/react";
import {Pill} from "./Pill";
import {BackIcon} from "./icons/BackIcon";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {PublicKey, Transaction} from "@solana/web3.js";
import {NetworkContext} from "../App";
import {WalletAdapterNetwork, WalletNotConnectedError} from "@solana/wallet-adapter-base";
import {TokenServices} from "../services/token-services";
import {USDC_DEVNET, USDC_MAINNET} from "../models/constants";
import {createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID} from "@solana/spl-token";
import {DaoInfo} from "../models/dao/dao-info";
import {DaoInfoContext} from "../models/contexts/dao-context";
import {CapTableEntry} from "@tokr-labs/cap-table/lib/models/cap-table-entry";
import {generateCapTable} from "@tokr-labs/cap-table";

export const PoolDetail = () => {

    const pathname = useLocation().pathname;
    const segment = pathname.substring(pathname.lastIndexOf("/") + 1);
    const urlBasedTab = segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();

    const tabs = ["Assets", "Members", "Details"]
    const [activeTab, setActiveTab] = useState(tabs.includes(urlBasedTab) ? urlBasedTab : tabs[0]);

    const wallet = useWallet();
    const {connection} = useConnection()
    const {network} = useContext(NetworkContext)
    const dao = useContext(DaoInfoContext)

    const theme = useTheme();

    const [entries, setEntries] = useState<CapTableEntry[]>();

    useMemo(() => {

        const lpTokenMint = dao.addresses.mint.lpTokenMint;
        const treasuryStock = dao.addresses.treasury.stockSupply;

        if (!lpTokenMint || !treasuryStock) {
            return
        }

        generateCapTable(
            connection,
            lpTokenMint,
            treasuryStock, // treasury stock account
            []
        ).then(capTable => {
            setEntries(capTable.entries);
        }).catch(error => {
            console.error(error.message);
        });

    }, [connection, dao])

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

    const makeDeposit = useCallback(async () => {
        if (!wallet.publicKey) throw new WalletNotConnectedError()

        const capitalSupply = dao.addresses.treasury.capitalSupply;

        if (!capitalSupply) {
            return
        }

        const usdc = network === WalletAdapterNetwork.Devnet ? USDC_DEVNET : USDC_MAINNET

        const sourceTokenAccount = await getAssociatedTokenAddress(
            usdc,
            wallet.publicKey
        )

        const decimals = await tokenServices.getTokenDecimals(usdc)

        const transaction = new Transaction().add(
            createTransferInstruction(
                sourceTokenAccount,
                new PublicKey(capitalSupply),
                wallet.publicKey,
                tokensToReceive * (10 ** decimals),
                [],
                TOKEN_PROGRAM_ID
            )
        )

        const signature = await wallet.sendTransaction(transaction, connection)

        await connection.confirmTransaction(signature, "processed")

        // TODO - hacky way to get rid of modal and update balances, refactor this
        window.location.reload()

    }, [connection, network, tokenServices, tokensToReceive, wallet, dao])

    return (

        <DaoInfoContext.Provider value={dao}>

            <Grid.Container gap={2}>

                <Grid xs={8}>
                    <Card className={"dark-card"}>

                        <Card.Header>
                            <Grid.Container gap={1} alignItems={"center"}>
                                <Grid css={{alignSelf: "flex-end"}}>
                                    <Link to={"/markets/equity"}>
                                        <BackIcon/>
                                    </Link>
                                </Grid>
                                <Grid>
                                    <Text h3 color={"white"}>{dao.name}</Text>
                                </Grid>
                                <Grid>
                                    <Pill color={theme.theme?.colors.primary.value} text={"OPEN"}/>
                                </Grid>
                            </Grid.Container>
                        </Card.Header>

                        <Card.Body style={{padding: "0 30px 20px 30px"}}>

                            <Text h4>Fundraising Details</Text>
                            <Spacer y={0.5}/>
                            <Progress
                                value={58}
                                color={"success"}
                                status={"success"}
                            />

                            <Spacer y={1}/>

                            <Grid.Container>
                                <Grid xs={6} direction={"column"}>
                                    <Text>Raised</Text>
                                    <Text weight={"bold"}>5.8M USDC</Text>
                                    <Text>$5,800,000</Text>
                                </Grid>
                                <Grid xs={6} direction={"column"} alignItems={"flex-end"}>
                                    <Text>Remaining</Text>
                                    <Text weight={"bold"}>4.2M USDC</Text>
                                    <Text>$4,200,000</Text>
                                </Grid>
                            </Grid.Container>

                            <Spacer y={1}/>
                            <hr/>
                            <Spacer y={1}/>

                            <Grid.Container justify={"space-between"}>
                                <Grid xs={2} direction={"column"}>
                                    <Text weight={"bold"}>Investors</Text>
                                    <Text>{entries?.length ?? "--"} investors</Text>
                                </Grid>
                                <Grid xs={2} direction={"column"}>
                                    <Text weight={"bold"}>Max Raise</Text>
                                    <Text>{dao.details.formattedMaxRaise}</Text>
                                </Grid>
                                <Grid xs={2} direction={"column"}>
                                    <Text weight={"bold"}>Min Investment</Text>
                                    <Text>{dao.details.formattedMinInvestment}</Text>
                                </Grid>
                                <Grid xs={2} direction={"column"}>
                                    <Text weight={"bold"}>Annual Fee</Text>
                                    <Text>{dao.details.fees.formattedAnnualFee}</Text>
                                </Grid>
                                <Grid xs={2} direction={"column"}>
                                    <Text weight={"bold"}>Close Date</Text>
                                    <Text>{dao.details.formattedRaiseClose}</Text>
                                </Grid>
                            </Grid.Container>

                        </Card.Body>

                    </Card>
                </Grid>

                <Grid xs={4}>
                    <Grid.Container gap={1} css={{padding: 0}}>
                        <Grid xs={12}>

                            <Card className={"dark-card"}>

                                {/*<Card.Header>*/}
                                {/*    <Text h4>Invest</Text>*/}
                                {/*</Card.Header>*/}

                                <Card.Body>
                                    <Grid.Container justify={"center"} alignItems={"center"} style={{height: "100%"}}>
                                        <Grid direction={"column"}>
                                            <Modal
                                                closeButton
                                                aria-labelledby="modal-title"
                                                open={isModalOpen}
                                                onClose={toggleModal}
                                            >
                                                <Modal.Header>
                                                    <Text h3 id={"modal-title"}>
                                                        Invest in <span>{dao.name}</span>
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
                                                        readOnly
                                                        value={tokensToReceive}
                                                        type={"number"}
                                                        label={"Receive"}
                                                        labelRight={dao.token.ticker}
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
                                                    <Button
                                                        color={"primary"}
                                                        style={{fontWeight: "bold", borderRadius: 0}}
                                                        disabled={tokensToReceive > usdcHoldings! || tokensToReceive === 0}
                                                        onClick={makeDeposit}
                                                    >
                                                        Invest
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>


                                            {/*<Spacer y={1}/>*/}
                                            {/*<Input*/}
                                            {/*    underlined*/}
                                            {/*    css={{color: "white"}}*/}
                                            {/*    color={"primary"}*/}
                                            {/*    type={"number"}*/}
                                            {/*    shadow={false}*/}
                                            {/*    fullWidth={true}*/}
                                            {/*    labelPlaceholder={"Enter a value"}*/}
                                            {/*/>*/}
                                            {/*<Spacer y={1}/>*/}

                                            <Tooltip content={wallet.connected ? "" : "Connect your wallet!"}>
                                                <Button
                                                    size={"lg"}
                                                    color={"primary"}
                                                    onClick={toggleModal}
                                                    style={{fontWeight: "bold", borderRadius: 0}}
                                                    disabled={!wallet.connected}
                                                >
                                                    INVEST
                                                </Button>
                                            </Tooltip>
                                        </Grid>
                                    </Grid.Container>

                                </Card.Body>

                            </Card>
                        </Grid>

                        <Grid xs={12}>
                            <Card className={"dark-card"}>
                                <Card.Header style={{paddingBottom: 0}}>
                                    <Text h4>Target Returns</Text>
                                </Card.Header>
                                <Card.Body style={{paddingTop: 0}}>
                                    <Grid.Container alignItems={"center"} style={{height: "100%"}}>
                                        <Grid xs={4} direction={"column"} alignItems={"center"}>
                                            <Text h2>20%</Text>
                                            <Text>NET IRR</Text>
                                        </Grid>
                                        <Grid xs={4} direction={"column"} alignItems={"center"}>
                                            <Text h2>4.0x</Text>
                                            <Text>TVPI</Text>
                                        </Grid>
                                        <Grid xs={4} direction={"column"} alignItems={"center"}>
                                            <Text h2>2.1x</Text>
                                            <Text>DPI</Text>
                                        </Grid>
                                    </Grid.Container>
                                </Card.Body>
                            </Card>
                        </Grid>
                    </Grid.Container>
                </Grid>

                <Grid xs={8}>

                    <Card>

                        <Card.Header>
                            <Text h4>Fund Summary</Text>
                        </Card.Header>

                        <Card.Body style={{padding: "0 30px 20px 30px"}}>

                            <Grid.Container>
                                <Grid xs={4} direction={"column"}>
                                    <Text weight={"bold"}>Token</Text>
                                    <Spacer y={0.3}/>
                                    <User
                                        bordered
                                        size={"xl"}
                                        name={dao.name}
                                        color={"secondary"}
                                        style={{paddingLeft: 0}}
                                    >
                                        M27
                                    </User>
                                </Grid>
                                <Grid xs={4} direction={"column"}>
                                    <Text weight={"bold"}>General Partner</Text>
                                    <Spacer y={0.3}/>
                                    <User
                                        bordered
                                        size={"xl"}
                                        name={dao.stakeholders.sponsor.name}
                                        color={"secondary"}
                                        style={{paddingLeft: 0}}
                                        src={dao.stakeholders.sponsor.image}
                                    >
                                        {dao.stakeholders.sponsor.company}
                                    </User>
                                </Grid>
                                <Grid xs={4} direction={"column"}>
                                    <Text weight={"bold"}>Fund Administrator</Text>
                                    <Spacer y={0.3}/>
                                    <User
                                        bordered
                                        size={"xl"}
                                        name={dao.stakeholders.delegate.name}
                                        color={"secondary"}
                                        style={{paddingLeft: 0}}
                                        src={dao.stakeholders.delegate.image}
                                    >
                                        {dao.stakeholders.delegate.company}
                                    </User>
                                </Grid>
                            </Grid.Container>

                            <Spacer y={2}/>

                            <Grid.Container>
                                <Grid xs={7} direction={"column"}>
                                    <Text weight={"bold"}>Fund Overview</Text>
                                    <Text>{dao.description}</Text>
                                </Grid>
                            </Grid.Container>

                            <Spacer y={2}/>

                            <Grid.Container>
                                <Grid direction={"column"}>
                                    <Text weight={"bold"}>Data Room</Text>
                                    <Spacer y={0.5}/>
                                    <Button
                                        ghost
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

                <Grid.Container>
                    <Grid>
                        <Spacer y={1}/>
                        <Button.Group css={{paddingLeft: "6px"}} color={"secondary"}>
                            {tabs.map(tab => {
                                return (
                                    <Button
                                        ghost={activeTab !== tab}
                                        style={{fontWeight: "bold"}}
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

                <Grid xs={8}>
                    <Card style={{minHeight: "300px"}}>

                        <Card.Header>
                            <Text h3>{activeTab}</Text>
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