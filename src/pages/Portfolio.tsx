import React, {useEffect, useState} from "react";
import {Navbar} from "../components/Navbar";
import {Button, Card, Container, Grid, Spacer, Table} from "@nextui-org/react";
import {Footer} from "../components/Footer";
import {Link} from "react-router-dom";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {AccountInfo, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import {AccountLayout, TOKEN_PROGRAM_ID} from "@solana/spl-token"

export const Portfolio = () => {

    const wallet = useWallet();
    const {connection} = useConnection();

    // TODO - store this as a constant somewhere
    const usdc = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";

    const [balance, setBalance] = useState<number>(0);
    const [holdings, setHoldings] = useState<Array<{ pubkey: PublicKey, account: AccountInfo<Buffer> }>>();

    useEffect(() => {

        connection.getBalance(wallet.publicKey as PublicKey)
            .then(response => setBalance(response / LAMPORTS_PER_SOL));

        connection.getTokenAccountsByOwner(
            wallet.publicKey as PublicKey,
            {programId: TOKEN_PROGRAM_ID}
        ).then(response => setHoldings(response.value));

    }, [connection, wallet])

    return (
        <Container style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column"
        }}>
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
                            <span style={{color: "red"}}>$100,000.00</span>
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

                                    {/*@ts-ignore*/}
                                    {holdings?.map(holding => {

                                        const accountInfo = AccountLayout.decode(holding.account.data)

                                        return (
                                            <Table.Row>
                                                <Table.Cell>
                                                    {accountInfo.mint.toBase58()}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {/*TODO - need to fetch token decimals*/}
                                                    {accountInfo.amount.toString()}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {
                                                        accountInfo.mint.toBase58() === usdc
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
        </Container>
    )

}
