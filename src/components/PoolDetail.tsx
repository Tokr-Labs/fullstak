import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {Button, Card, Grid, Input, Modal, Progress, Spacer, Text, Tooltip, User, useTheme} from "@nextui-org/react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {PublicKey, Transaction} from "@solana/web3.js";
import {NetworkContext} from "../App";
import {WalletAdapterNetwork, WalletNotConnectedError} from "@solana/wallet-adapter-base";
import {TokenServices} from "../services/token-services";
import {USDC_DEVNET, USDC_MAINNET} from "../models/constants";
import {createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID} from "@solana/spl-token";
import {DaoInfoContext} from "../models/contexts/dao-context";
import {CapTableEntry} from "@tokr-labs/cap-table/lib/models/cap-table-entry";
import {generateCapTable} from "@tokr-labs/cap-table";
import {TooltipWithIcon} from "./TooltipWithIcon";
import {RaiseDetail} from "./pools/RaiseDetail";

export const PoolDetail = () => {

    const pathname = useLocation().pathname;
    const segment = pathname.substring(pathname.lastIndexOf("/") + 1);
    const urlBasedTab = segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();

    const tabs = ["Assets", "Members", "Transactions", "Proposals", "Configuration"]
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
                                <Grid style={{paddingLeft: 0}}>
                                    <img
                                        src={require("src/assets/issuers/miami_fund_1.png")}
                                        height={"100px"}
                                        width={"100px"}
                                        alt={"Miami Fund 1 logo"}
                                        style={{
                                            borderRadius: "50%",
                                            boxShadow: "0px 0px 10px 10px rgba(190,0,255, 0.5)",
                                        }}
                                    />
                                </Grid>
                                <Grid style={{marginLeft: "20px"}}>
                                    <Text
                                        size={56}
                                        weight={"bold"}
                                        color={"white"}
                                        style={{
                                            margin: 0,
                                            letterSpacing: 7.47
                                        }}
                                    >
                                        {dao.name}
                                    </Text>
                                    <div style={{
                                        display: dao.active ? "none" : "flex",
                                        alignItems: "center"
                                    }}>
                                        <span style={{
                                            height: "10px",
                                            width: "10px",
                                            background: theme.theme?.colors.success.value,
                                            borderRadius: "50%",
                                            marginRight: "10px"
                                        }}/>
                                        <Text size={15} color={"white"}>{dao.active ? "Active" : "Open"}</Text>
                                    </div>
                                </Grid>
                            </Grid.Container>
                        </Card.Header>

                        <Card.Body style={{padding: "30px 30px"}}>

                            <Text
                                size={15}
                                weight={"bold"}
                                color={"white"}
                                style={{letterSpacing: 2}}
                            >
                                Fundraising Details
                            </Text>
                            <Spacer y={1.5}/>
                            <Progress
                                value={58}
                                style={{height: "8px"}}
                                color={"success"}
                                status={"primary"}
                            />

                            <Spacer y={1.5}/>

                            <Grid.Container>
                                <Grid xs={6} direction={"column"}>
                                    <Text
                                        size={12}
                                        color={"white"}
                                        style={{letterSpacing: 1.6}}
                                    >
                                        Raised
                                    </Text>
                                    <Text
                                        size={18}
                                        color={"white"}
                                        weight={"semibold"}
                                        style={{letterSpacing: 2.4}}
                                    >
                                        5.8M USDC
                                    </Text>
                                    <Text
                                        size={10}
                                        color={"white"}
                                        style={{letterSpacing: 1.33}}
                                    >
                                        $5,800,000
                                    </Text>
                                </Grid>
                                <Grid xs={6} direction={"column"} alignItems={"flex-end"}>
                                    <Text
                                        size={12}
                                        color={"white"}
                                        style={{letterSpacing: 1.6}}
                                    >
                                        Remaining
                                    </Text>
                                    <Text
                                        size={18}
                                        color={"white"}
                                        weight={"semibold"}
                                        style={{letterSpacing: 2.4}}
                                    >
                                        4.2M USDC
                                    </Text>
                                    <Text
                                        size={10}
                                        color={"white"}
                                        style={{letterSpacing: 1.33}}
                                    >
                                        $4,200,000
                                    </Text>
                                </Grid>
                            </Grid.Container>

                            <Spacer y={1}/>
                            <hr/>
                            <Spacer y={1}/>

                            <Grid.Container justify={"space-between"}>
                                <RaiseDetail title={"Investors"} text={(entries?.length ?? "--") + " investors"}/>
                                <RaiseDetail title={"Max Raise"} text={dao.details.formattedMaxRaise}/>
                                <RaiseDetail title={"Min Investment"} text={dao.details.formattedMinInvestment}/>
                                <RaiseDetail title={"Annual Fee"} text={dao.details.fees.formattedAnnualFee}/>
                                <RaiseDetail title={"Close Date"} text={dao.details.formattedRaiseClose}/>
                            </Grid.Container>

                        </Card.Body>

                    </Card>
                </Grid>

                <Grid xs={4}>
                    <Grid.Container gap={1} css={{padding: 0}}>
                        <Grid xs={12}>

                            <Card className={"dark-card"}>

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
                                                        status={tokensToReceive > (usdcHoldings ?? 0) ? "error" : "default"}
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
                                                        disabled={tokensToReceive > (usdcHoldings ?? 0) || tokensToReceive === 0}
                                                        onClick={makeDeposit}
                                                    >
                                                        Invest
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>

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
                                    <Text
                                        size={15}
                                        color={"white"}
                                        weight={"bold"}
                                        style={{letterSpacing: 2}}
                                    >
                                        Target Returns
                                    </Text>
                                </Card.Header>
                                <Card.Body style={{paddingTop: 0}}>
                                    <Grid.Container alignItems={"center"} style={{height: "100%"}}>
                                        <Grid xs={4} direction={"column"} alignItems={"center"}>
                                            <Text
                                                size={48}
                                                color={"white"}
                                                weight={"bold"}
                                            >
                                                20%
                                            </Text>
                                            <Text>
                                                NET IRR
                                                <TooltipWithIcon
                                                    content={`
                                                        Internal Rate of Return (IRR) is a metric used to estimate 
                                                        the profitability of potential investments. IRR is a discount 
                                                        rate that makes the net present value (NPV) of all cash flows 
                                                        from an investment equal to zero in a discounted cash flow 
                                                        analysis––in other words, it is the annual rate of growth 
                                                        that an investment is expected to generate. Generally speaking, 
                                                        the higher an internal rate of return, the more desirable an 
                                                        investment is to undertake. 
                                                    `}
                                                />
                                            </Text>
                                        </Grid>
                                        <Grid xs={4} direction={"column"} alignItems={"center"}>
                                            <Text
                                                size={48}
                                                color={"white"}
                                                weight={"bold"}
                                            >
                                                4.0x
                                            </Text>
                                            <Text>
                                                TVPI
                                                <TooltipWithIcon
                                                    content={`
                                                        Total Value to Paid-in (“TVPI”) is the ratio of the current 
                                                        value of current investments within a fund, plus the total 
                                                        value of all distributions made to date, relative to the total 
                                                        amount of capital paid into the fund to date.
                                                    `}
                                                />
                                            </Text>
                                        </Grid>
                                        <Grid xs={4} direction={"column"} alignItems={"center"}>
                                            <Text
                                                size={48}
                                                color={"white"}
                                                weight={"bold"}
                                            >
                                                2.1x
                                            </Text>
                                            <Text>
                                                DPI
                                                <TooltipWithIcon
                                                    content={`
                                                        Distributions to Paid-in (“DPI”) is the ratio of money 
                                                        distributed to investors by the fund, relative to the total 
                                                        amount of capital paid into the fund.
                                                    `}
                                                />
                                            </Text>
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
                                <Grid xs={4} direction={"column"}>
                                    <Text weight={"bold"} size={15} style={{letterSpacing: 1}}>
                                        Token
                                    </Text>
                                    <Spacer y={0.3}/>
                                    <div>
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
                                <Grid xs={4} direction={"column"}>
                                    <Text weight={"bold"} size={15} style={{letterSpacing: 1}}>
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
                                    </Text>
                                    <Spacer y={0.3}/>
                                    <div>
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
                                <Grid xs={4} direction={"column"}>
                                    <Text weight={"bold"} size={15} style={{letterSpacing: 1}}>
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
                                    </Text>
                                    <Spacer y={0.3}/>
                                    <div>
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

                            <Spacer y={2}/>

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

                <Grid.Container>
                    <Grid>
                        <Spacer y={1}/>
                        <Button.Group
                            rounded
                            color={"secondary"}
                            borderWeight={"light"}
                            css={{paddingLeft: "6px"}}
                        >
                            {tabs.map(tab => {
                                return (
                                    <Button
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

                <Grid xs={8}>
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