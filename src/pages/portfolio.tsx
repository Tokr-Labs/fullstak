import React, {useContext, useEffect, useMemo, useState} from "react";
import {Navbar} from "../components/navbar";
import {Button, Card, Container, Grid, Spacer, Table, theme} from "@nextui-org/react";
import {Footer} from "../components/footer";
import {Link} from "react-router-dom";
import {Link as NextUiLink} from "@nextui-org/react"
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {AccountInfo, LAMPORTS_PER_SOL, ParsedAccountData, PublicKey} from "@solana/web3.js";
import {TOKEN_PROGRAM_ID} from "@solana/spl-token"
import {TokenServices} from "../services/token-services";
import {TranslatedToken} from "../components/translated-token";
import {CurrencyFormatter} from "../utils/currency-formatter";
import { ROUTE_MARKETS_EQUITY } from "../models/constants";
import {NetworkContext} from "../models/contexts/network-context";

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

        if (wallet.publicKey !== null) {
            // @TODO: better error handling when accounts dont return a balance
            connection.getBalance(wallet.publicKey as PublicKey)
                .then(response => setSolBalance(response / LAMPORTS_PER_SOL))
                .catch(_ => console.log(`Could not fetch SOL balance of ${wallet.publicKey}`));

            tokenServices.getTokenHoldingAmount(usdc, wallet.publicKey as PublicKey)
                .then(response => setUsdcBalance(response))
                .catch(_ => console.log(`Could not fetch USDC balance of ${wallet.publicKey}`));

            connection.getParsedTokenAccountsByOwner(
                wallet.publicKey as PublicKey,
                {programId: TOKEN_PROGRAM_ID}
            ).then(response => setHoldings(response.value))
            .catch(_ => `Could not fetch holdings of ${wallet.publicKey}`);
        }

    }, [connection, tokenServices, usdc, wallet])

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

                                    {(holdings ?? []).map((holding, i) => {

                                        const mint = holding.account.data.parsed.info.mint;

                                        return (
                                            <Table.Row key={i}>
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
                                                            ? <Link to={ROUTE_MARKETS_EQUITY}>
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

        </Container>
    )

}
