import React, {useEffect, useState} from "react";
import {Table} from "@nextui-org/react";
import {useConnection} from "@solana/wallet-adapter-react";
import {ParsedTransactionWithMeta, PublicKey} from "@solana/web3.js";

export const PoolTransactions = () => {

    const connection = useConnection().connection;

    const [transactions, setTransactions] = useState<(ParsedTransactionWithMeta | null)[]>();

    useEffect(() => {
        // UNQ Universe on devnet - primary SOL treasury account
        connection.getSignaturesForAddress(new PublicKey("9v1QG3i4jMgZAopAuqxnZVefq6ys63AbuYQKatSXYERD"))
            .then(signatures => signatures.map(signature => signature.signature))
            .then(signatures => {
                connection.getParsedTransactions(signatures)
                    .then(transactions => setTransactions(transactions))
            })
    }, [connection])

    return (
        <Table shadow={false} sticked headerLined style={{paddingTop: 0}}>

            <Table.Header>
                <Table.Column>Date</Table.Column>
                <Table.Column>Transaction Type</Table.Column>
                <Table.Column>Amount</Table.Column>
                <Table.Column>Details</Table.Column>
            </Table.Header>

            <Table.Body>

                {transactions?.map(transaction => {
                    if (transaction == null) {
                        return null;
                    }

                    // TODO - populate cells
                    return (
                        <Table.Row>
                            <Table.Cell>{transaction.blockTime}</Table.Cell>
                            <Table.Cell></Table.Cell>
                            {/*<Table.Cell>{transaction.transaction.message.instructions[0].parsed.info.lamports}</Table.Cell>*/}
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                    )
                })}

            </Table.Body>

        </Table>
    )

}