import React from "react";
import {Table} from "@nextui-org/react";

export const PoolProposals = () => {

    return (
        <Table shadow={false} sticked headerLined style={{paddingTop: 0}}>

            <Table.Header>
                <Table.Column>Date</Table.Column>
                <Table.Column>Proposal</Table.Column>
                <Table.Column>Outcome</Table.Column>
                <Table.Column>Details</Table.Column>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>4/22/2022</Table.Cell>
                    <Table.Cell>Invest: 298 Greenley Rd</Table.Cell>
                    <Table.Cell>Passed</Table.Cell>
                    <Table.Cell>Investment Memo</Table.Cell>
                </Table.Row>
            </Table.Body>

        </Table>
    )

}