import React from "react";
import {Avatar, Card, Table, Text} from "@nextui-org/react";

export const DebtReserves = () => {

    return (
        <Card>
            <Card.Header>
                <Text h3 style={{paddingTop: "20px", paddingLeft: "20px"}}>Reserves</Text>
            </Card.Header>
            <Card.Body>
                {/* TODO - dynamically generate this table */}
                <Table sticked headerLined shadow={false}>
                    <Table.Header>
                        <Table.Column>ASSET</Table.Column>
                        <Table.Column align={"end"}>LTV</Table.Column>
                        <Table.Column align={"end"}>TOTAL SUPPLY</Table.Column>
                        <Table.Column align={"end"}>SUPPLY APY</Table.Column>
                        <Table.Column align={"end"}>TOTAL BORROW</Table.Column>
                        <Table.Column align={"end"}>BORROW APY</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row key="1">
                            <Table.Cell>
                                <Avatar
                                    size={"sm"}
                                    src={require("src/assets/usdc.png")}
                                    css={{float: "left"}}
                                />
                                <Text>&nbsp;&nbsp;USDC</Text>
                            </Table.Cell>
                            <Table.Cell css={{textAlign: "right"}}>0%</Table.Cell>
                            <Table.Cell css={{textAlign: "right"}}>$0.00</Table.Cell>
                            <Table.Cell css={{textAlign: "right"}}>0.00%</Table.Cell>
                            <Table.Cell css={{textAlign: "right"}}>$0.00</Table.Cell>
                            <Table.Cell css={{textAlign: "right"}}>0.00%</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Card.Body>
        </Card>
    )

}