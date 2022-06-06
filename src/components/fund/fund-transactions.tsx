import React, {useContext, useEffect, useState} from "react";
import {Link, Table, theme} from "@nextui-org/react";
import {useConnection} from "@solana/wallet-adapter-react";
import {ParsedTransactionWithMeta, PublicKey} from "@solana/web3.js";
import {NetworkContext} from "../../App";
import {Pill} from "../Pill";

export const FundTransactions = () => {

    const connection = useConnection().connection;
    const {network} = useContext(NetworkContext);

    // TODO - make this a context
    const data = require("src/daos/devnet/tj-test-dao.json")

    const [transactions, setTransactions] = useState<(ParsedTransactionWithMeta | null)[]>();

    // TODO - include distribution account transactions too
    useEffect(() => {

        connection.getConfirmedSignaturesForAddress2(
            new PublicKey(data.addresses.treasury.capital_supply),
            {limit: 25}
        ).then(sigInfo => {
            connection.getParsedTransactions(sigInfo.map(info => info.signature))
                .then(parsedTxs => setTransactions(parsedTxs))
        })

    }, [connection, data.addresses.treasury.capital_supply])

    return (
        <>
            <Table shadow={false} sticked headerLined style={{paddingTop: 0, maxWidth: "1000px"}} aria-label='pool transactions'>

                <Table.Header>
                    <Table.Column>Date</Table.Column>
                    <Table.Column>Account</Table.Column>
                    <Table.Column>Signature</Table.Column>
                    <Table.Column>Status</Table.Column>
                </Table.Header>

                <Table.Body>

                    {/*@ts-ignore*/}
                    {transactions?.map(transaction => {
                        if (transaction == null) {
                            return null;
                        }

                        const date = new Date(transaction.blockTime! * 1000)

                        return (
                            <Table.Row>
                                <Table.Cell>
                                    {date.toLocaleDateString() + " " + date.toLocaleTimeString()}
                                </Table.Cell>
                                <Table.Cell>Capital Supply</Table.Cell>
                                <Table.Cell>
                                    <Link
                                        icon
                                        href={
                                            "https://explorer.solana.com/tx/"
                                            + transaction.transaction.signatures
                                            + "?cluster=" + network
                                        }
                                        target={"_blank"}
                                        rel={"noreferrer"}
                                    >
                                        {transaction.transaction.signatures[0].slice(0, 6)
                                            + "..."
                                            + transaction.transaction.signatures[0].slice(-6)
                                        }
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    {
                                        transaction.meta?.err === null
                                            ? <Pill color={theme.colors.success.value} text={"Success"}/>
                                            : <Pill color={theme.colors.error.value} text={"Failed"}/>
                                    }
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}

                </Table.Body>

            </Table>
        </>
    )

}