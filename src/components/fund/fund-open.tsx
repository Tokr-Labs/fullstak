import React, {useContext, useEffect, useMemo, useState} from "react";
import {Button, Card, Grid, Progress, Spacer, Text, theme, Tooltip} from "@nextui-org/react";
import {CurrencyFormatter} from "../../utils/currency-formatter";
import {RaiseDetails} from "./raise-details";
import {InvestModal} from "../invest-modal";
import {IdentityVerificationModal} from "../identity-verification-modal";
import {TooltipWithIcon} from "../tooltip-with-icon";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {USDC_DEVNET, USDC_MAINNET} from "../../models/constants";
import {PublicKey} from "@solana/web3.js";
import {TokenServices} from "../../services/token-services";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {useNavigate} from "react-router-dom";
import {CapTableEntry} from "@tokr-labs/cap-table/lib/models/cap-table-entry";
import {IdentityRecord} from "@tokr-labs/identity-verification/lib/models/identity-record";
import {GetIdentityRecordAction} from "../../services/actions/get-identity-record-action";
import {generateCapTable} from "@tokr-labs/cap-table";
import {DaoInfoContext} from "../../models/contexts/dao-context";
import {ApproveIdentityRecordAction} from "../../services/actions/approve-identity-record-action";
import {IdentityStatus} from "@tokr-labs/identity-verification/lib/models/identity-status";
import {NetworkContext} from "../../models/contexts/network-context";

export const FundOpen = () => {

    const wallet = useWallet();
    const navigate = useNavigate();
    const {connection} = useConnection()
    const {dao} = useContext(DaoInfoContext)
    const {network} = useContext(NetworkContext)

    const tokenServices = useMemo(() => new TokenServices(connection), [connection])

    const [usdcHoldings, setUsdcHoldings] = useState<number | null>(0);

    const [capitalSupplyBalance, setCapitalSupplyBalance] = useState<number>();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {

        if (idvRecord && (idvRecord.status === IdentityStatus.initial || idvRecord.status === IdentityStatus.started)) {
            console.log("auto approving idvRecord")
            approveIdentityRecordAction.execute(dao)
                .catch(error => console.error(error))
        }

        setIsModalOpen(!isModalOpen)

    }

    const [entries, setEntries] = useState<CapTableEntry[]>();
    const [idvRecord, setIdvRecord] = useState<IdentityRecord>();

    const getIdentityRecordAction = useMemo<GetIdentityRecordAction>(() => {
        return new GetIdentityRecordAction(connection, wallet);
    }, [connection, wallet])

    const approveIdentityRecordAction = useMemo<ApproveIdentityRecordAction>(() => {
        return new ApproveIdentityRecordAction(wallet);
    }, [connection, wallet])

    useEffect(() => {

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

    useEffect(() => {

        getIdentityRecordAction.execute(dao)
            .then(record => setIdvRecord(record))
            .catch(console.error)

    }, [connection, dao, getIdentityRecordAction])

    useEffect(() => {

        if (wallet.connected) {

            tokenServices.getTokenHoldingAmount(
                network === WalletAdapterNetwork.Devnet ? USDC_DEVNET : USDC_MAINNET,
                wallet.publicKey as PublicKey
            ).then(amount => setUsdcHoldings(amount))
                .catch(_ => console.log(`Could not fetch USDC holdings for ${wallet.publicKey}`))

        }

        tokenServices.getTokenAccountBalance(
            dao.addresses.treasury.capitalSupply as PublicKey
        ).then(amount => setCapitalSupplyBalance(amount ?? 0))
            .catch(_ => console.log(`Could not get Capital Supply of ${dao.addresses.treasury.capitalSupply}`))

    }, [dao.addresses.treasury.capitalSupply, navigate, network, tokenServices, wallet])

    return (
        <>
            <Grid xs={12} md={8}>
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
                                        maxHeight: "15vw",
                                        maxWidth: "15vw",
                                        borderRadius: "50%",
                                        boxShadow: "0px 0px 10px 10px rgba(190,0,255, 0.5)",
                                    }}
                                />
                            </Grid>
                            <Grid style={{marginLeft: "20px"}}>
                                <Text
                                    size={"min(56px, 8vw)"}
                                    weight={"bold"}
                                    color={"white"}
                                    style={{margin: 0}}
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
                                            background: theme.colors.success.value,
                                            borderRadius: "50%",
                                            marginRight: "10px"
                                        }}/>
                                    <Text size={15} color={"white"}>Open</Text>
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
                            indeterminated={capitalSupplyBalance === undefined}
                            value={(capitalSupplyBalance! / dao.details.maxRaise) * 100}
                            style={{height: "8px"}}
                            color={
                                capitalSupplyBalance === undefined
                                    ? "secondary"
                                    : "success"
                            }
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
                                    {CurrencyFormatter.formatToken(capitalSupplyBalance ?? 0, "USDC")}
                                </Text>
                                <Text
                                    size={10}
                                    color={"white"}
                                    style={{letterSpacing: 1.33}}
                                >
                                    {CurrencyFormatter.formatUsd(capitalSupplyBalance ?? 0, true)}
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
                                    {CurrencyFormatter.formatToken(
                                        dao.details.maxRaise - (capitalSupplyBalance ?? 0),
                                        "USDC"
                                    )}
                                </Text>
                                <Text
                                    size={10}
                                    color={"white"}
                                    style={{letterSpacing: 1.33}}
                                >
                                    {CurrencyFormatter.formatUsd(
                                        dao.details.maxRaise - (capitalSupplyBalance ?? 0),
                                        true
                                    )}
                                </Text>
                            </Grid>
                        </Grid.Container>

                        <Spacer y={1}/>
                        <hr/>
                        <Spacer y={1}/>

                        <Grid.Container gap={1} justify={"space-between"}>
                            <RaiseDetails title={"Investors"} text={(entries?.length ?? "--") + " investors"}/>
                            <RaiseDetails title={"Max Raise"} text={dao.details.formattedMaxRaise}/>
                            <RaiseDetails title={"Min Investment"} text={dao.details.formattedMinInvestment}/>
                            <RaiseDetails title={"Annual Fee"} text={dao.details.fees.formattedAnnualFee}/>
                            <RaiseDetails title={"Close Date"} text={dao.details.formattedRaiseClose}/>
                        </Grid.Container>

                    </Card.Body>

                </Card>
            </Grid>

            <Grid xs={12} md={4}>
                <Grid.Container gap={1} css={{padding: 0}}>
                    <Grid xs={12}>

                        <Card className={"dark-card"}>

                            <Card.Body>
                                <Grid.Container justify={"center"} alignItems={"center"} style={{height: "100%"}}>
                                    <Grid direction={"column"}>

                                        {
                                            idvRecord && idvRecord.isVerified ?
                                                <InvestModal isOpen={isModalOpen}
                                                             setIsOpen={setIsModalOpen}
                                                             usdcHoldings={usdcHoldings}/> :
                                                <IdentityVerificationModal isOpen={isModalOpen}
                                                                           setIsOpen={setIsModalOpen}
                                                                           idvRecord={idvRecord}
                                                                           setIdvRecord={setIdvRecord}/>
                                        }

                                        <Tooltip content={wallet.connected ? "" : "Connect your wallet!"}>

                                            <Button size={"lg"}
                                                    color={"primary"}
                                                    onClick={() => toggleModal()}
                                                    style={{fontWeight: "bold", borderRadius: 0}}
                                                    disabled={!wallet.connected}>
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
                                    <Grid
                                        xs={12} md={4}
                                        direction={"column"} alignItems={"center"}
                                        style={{color: "white"}}
                                    >
                                        <Text
                                            size={48}
                                            color={"white"}
                                            weight={"bold"}
                                        >
                                            20%
                                        </Text>
                                        <div>
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
                                        </div>
                                    </Grid>
                                    <Grid
                                        xs={12} md={4}
                                        direction={"column"}
                                        alignItems={"center"}
                                        style={{color: "white"}}
                                    >
                                        <Text
                                            size={48}
                                            color={"white"}
                                            weight={"bold"}
                                        >
                                            4.0x
                                        </Text>
                                        <div>
                                            TVPI
                                            <TooltipWithIcon
                                                content={`
                                                    Total Value to Paid-in (“TVPI”) is the ratio of the current 
                                                    value of current investments within a fund, plus the total 
                                                    value of all distributions made to date, relative to the total 
                                                    amount of capital paid into the fund to date.
                                                `}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid
                                        xs={12} md={4}
                                        direction={"column"}
                                        alignItems={"center"}
                                        style={{color: "white"}}
                                    >
                                        <Text
                                            size={48}
                                            color={"white"}
                                            weight={"bold"}
                                        >
                                            2.1x
                                        </Text>
                                        <div>
                                            DPI
                                            <TooltipWithIcon
                                                content={`
                                                    Distributions to Paid-in (“DPI”) is the ratio of money 
                                                    distributed to investors by the fund, relative to the total 
                                                    amount of capital paid into the fund.
                                                `}
                                            />
                                        </div>
                                    </Grid>
                                </Grid.Container>
                            </Card.Body>
                        </Card>
                    </Grid>
                </Grid.Container>
            </Grid>
        </>
    )

}