import React from "react";
import {Table} from "@nextui-org/react";

export const PoolAssets = () => {

    return (
        <Table shadow={false} sticked headerLined style={{paddingTop: 0}}>

            <Table.Header>
                <Table.Column>Token</Table.Column>
                <Table.Column>Amount</Table.Column>
                <Table.Column>Value</Table.Column>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>SOL</Table.Cell>
                    <Table.Cell>100 SOL</Table.Cell>
                    <Table.Cell>$10,509.12</Table.Cell>
                </Table.Row>
            </Table.Body>

        </Table>
    )

}