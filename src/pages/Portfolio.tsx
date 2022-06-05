import React, {useContext, useEffect, useMemo, useState} from "react";
import {Navbar} from "../components/Navbar";
import {Button, Card, Container, Grid, Spacer, Table, theme} from "@nextui-org/react";
import {Footer} from "../components/Footer";
import {Link} from "react-router-dom";
import {Link as NextUiLink} from "@nextui-org/react"
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {AccountInfo, LAMPORTS_PER_SOL, ParsedAccountData, PublicKey} from "@solana/web3.js";
import {TOKEN_PROGRAM_ID} from "@solana/spl-token"
import {NetworkContext} from "../App";
import {TokenServices} from "../services/token-services";
import {TokenListProvider} from "@solana/spl-token-registry";
import {TranslatedToken} from "../components/TranslatedToken";
import {CurrencyFormatter} from "../utils/currency-formatter";

export const Portfolio = () => {

    const wallet = useWallet();
    const {connection} = useConnection();
    const {network} = useContext(NetworkContext);

    const tokenServices = useMemo(() => new TokenServices(connection), [connection]);

    const usdc = tokenServices.getUsdcMint(network);

    const [solBalance, setSolBalance] = useState<number>(0);
    const [usdcBalance, setUsdcBalance] = useState<number | null>(0);
    const [holdings, setHoldings] = useState<Array<{ pubkey: PublicKey, account: AccountInfo<ParsedAccountData> }>>([]);

    useEffect(() => {

        // @TODO: better error handling when accounts dont return a balance
        connection.getBalance(wallet.publicKey as PublicKey)
            .then(response => setSolBalance(response / LAMPORTS_PER_SOL))
            .catch(error => console.log(error));

        tokenServices.getTokenHoldingAmount(usdc, wallet.publicKey as PublicKey)
            .then(response => setUsdcBalance(response))
            .catch(error => console.log(error));

        connection.getParsedTokenAccountsByOwner(
            wallet.publicKey as PublicKey,
            {programId: TOKEN_PROGRAM_ID}
        ).then(response => setHoldings(response.value))
        .catch(error => console.log(error));

    }, [connection, tokenServices, usdc, wallet])

    return (
        <Container style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column"
        }}>
            {/*Background for header*/}
            <div style={{
                background: theme.colors.gradient.computedValue,
                height: "238px",
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
                            <span>
                                {CurrencyFormatter.formatToken(
                                    solBalance ?? 0,
                                    "SOL",
                                    false,
                                    4
                                )}
                            </span>
                        </Grid>
                        <Grid>
                            <h3>Available to Invest</h3>
                            <span>
                                {CurrencyFormatter.formatToken(
                                    usdcBalance ?? 0,
                                    "USDC",
                                    false,
                                    2
                                )}
                            </span>
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
                        <Grid xs={12} md={8}>
                            <Table shadow={false} sticked headerLined aria-label="balances">
                                <Table.Header>
                                    <Table.Column>Token</Table.Column>
                                    <Table.Column align={"end"}>Amount</Table.Column>
                                    <Table.Column children=""/>
                                </Table.Header>
                                <Table.Body>

                                    {(holdings ?? []).map(holding => {

                                        const mint = holding.account.data.parsed.info.mint;

                                        return (
                                            <Table.Row>
                                                <Table.Cell css={{fontFamily: theme.fonts.mono.computedValue}}>
                                                    <NextUiLink
                                                        icon
                                                        rel={"noreferrer"}
                                                        target={"_blank"}
                                                        href={`https://explorer.solana.com/address/${mint}?cluster=${network}`}
                                                    >
                                                        <TranslatedToken mint={mint} iconSize={20}/>
                                                    </NextUiLink>
                                                </Table.Cell>
                                                <Table.Cell css={{textAlign: "end"}}>
                                                    {CurrencyFormatter.formatToken(
                                                        holding.account.data.parsed.info.tokenAmount.uiAmount,
                                                        "",
                                                        true,
                                                        4
                                                    )}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {
                                                        mint.toString() === usdc.toString()
                                                            ? <Link to={"/markets/equity"}>
                                                                <Button
                                                                    size={"xs"}
                                                                    ghost
                                                                    color={"primary"}
                                                                    style={{
                                                                        fontWeight: "bold",
                                                                        borderRadius: 0
                                                                }}
                                                                >
                                                                    INVEST
                                                                </Button>
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

            <Spacer y={1}/>

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
