import React from "react";
import {Table} from "@nextui-org/react";

export const PoolTransactions = () => {

    return (
        <Table shadow={false} sticked headerLined style={{paddingTop: 0}}>

            <Table.Header>
                <Table.Column>Date</Table.Column>
                <Table.Column>Transaction Type</Table.Column>
                <Table.Column>Amount</Table.Column>
                <Table.Column>Details</Table.Column>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>4/22/2022</Table.Cell>
                    <Table.Cell>Deposit</Table.Cell>
                    <Table.Cell>10,000 USDC</Table.Cell>
                    <Table.Cell>Deposited by 3ZDc...Fume</Table.Cell>
                </Table.Row>
            </Table.Body>

        </Table>
    )

}