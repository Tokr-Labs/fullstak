import React, {useContext, useEffect, useMemo, useState} from "react";
import {Navbar} from "../components/Navbar";
import {Button, Card, Container, Grid, Spacer, Table} from "@nextui-org/react";
import {Footer} from "../components/Footer";
import {Link} from "react-router-dom";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {AccountInfo, LAMPORTS_PER_SOL, ParsedAccountData, PublicKey} from "@solana/web3.js";
import {TOKEN_PROGRAM_ID} from "@solana/spl-token"
import {NetworkContext} from "../App";
import {TokenServices} from "../services/token-services";

export const Portfolio = () => {

    const wallet = useWallet();
    const {connection} = useConnection();
    const {network} = useContext(NetworkContext);

    const tokenServices = useMemo(() => new TokenServices(connection), [connection]);

    const usdc = tokenServices.getUsdcMint(network);

    const [balance, setBalance] = useState<number>(0);
    const [usdcAmount, setUsdcAmount] = useState<number | null>();
    const [holdings, setHoldings] = useState<Array<{ pubkey: PublicKey, account: AccountInfo<ParsedAccountData> }>>();

    useEffect(() => {

        connection.getBalance(wallet.publicKey as PublicKey)
            .then(response => setBalance(response / LAMPORTS_PER_SOL));

        tokenServices.getTokenHoldingAmount(usdc, wallet.publicKey as PublicKey)
            .then(response => setUsdcAmount(response))

        connection.getParsedTokenAccountsByOwner(
            wallet.publicKey as PublicKey,
            {programId: TOKEN_PROGRAM_ID}
        ).then(response => setHoldings(response.value));

    }, [connection, tokenServices, usdc, wallet])

    return (
        <Container style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column"
        }}>
            {/*Background for header*/}
            <div style={{
                background: "linear-gradient(180deg, rgba(12,2,35,1) 0%, rgba(28,5,73,1) 100%)",
                height: "225px",
                zIndex: -1,
                width: "100vw",
                top: 0,
                left: 0,
                position: "absolute"
            }}/>

            <Navbar/>
            <Spacer y={1}/>

            <Card>
                <Card.Header/>
                <Card.Body>
                    <Grid.Container justify={"space-evenly"} style={{textAlign: "center"}}>
                        <Grid>
                            <h3>Balance</h3>
                            <span>{balance} SOL</span>
                        </Grid>
                        <Grid>
                            <h3>Available to Invest</h3>
                            <span>{usdcAmount} USDC</span>
                        </Grid>
                    </Grid.Container>
                </Card.Body>
                <Card.Footer/>
            </Card>

            <Spacer y={1}/>

            <Card>
                <Card.Header style={{padding: "20px 0 0 20px"}}>
                    <h3>Holdings</h3>
                </Card.Header>
                <Card.Body>
                    <Grid.Container>
                        <Grid xs={8}>
                            <Table shadow={false} sticked headerLined>
                                <Table.Header>
                                    <Table.Column>Token</Table.Column>
                                    <Table.Column>Amount</Table.Column>
                                    <Table.Column children=""/>
                                </Table.Header>
                                <Table.Body>

                                    {(holdings ?? []).map( holding => {

                                        console.log("Mint: " + holding.account.data.parsed.info.mint)
                                        console.log("USDC: " + usdc)

                                        return (
                                            <Table.Row>
                                                <Table.Cell>
                                                    {holding.account.data.parsed.info.mint}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {holding.account.data.parsed.info.tokenAmount.uiAmount}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {
                                                        holding.account.data.parsed.info.mint.toString() === usdc.toString()
                                                            ? <Link to={"/markets/equity"}>
                                                                <Button size={"xs"} ghost color={"gradient"}>Invest</Button>
                                                            </Link>
                                                            : ""
                                                    }
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                        </Grid>
                    </Grid.Container>
                </Card.Body>
                <Card.Footer/>
            </Card>

            <Footer/>

            {/*Background for footer*/}
            <div style={{
                background: "linear-gradient(0deg, rgba(12,2,35,1) 0%, rgba(28,5,73,1) 100%)",
                height: "60px",
                zIndex: -1,
                width: "100vw",
                bottom: 0,
                left: 0,
                position: "absolute"
            }}/>
        </Container>
    )

}
