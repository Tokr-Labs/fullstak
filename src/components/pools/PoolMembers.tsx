import React from "react";
import {Table} from "@nextui-org/react";

export const PoolMembers = () => {

    return (
        <Table shadow={false} sticked headerLined style={{paddingTop: 0}}>

            <Table.Header>
                <Table.Column>Member</Table.Column>
                <Table.Column>Share of Pool</Table.Column>
                <Table.Column>Value</Table.Column>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>3ZDc...Fume</Table.Cell>
                    <Table.Cell>24%</Table.Cell>
                    <Table.Cell>$10,000.00</Table.Cell>
                </Table.Row>
            </Table.Body>

        </Table>
    )

}