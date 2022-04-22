import React from "react";
import {Card, Spacer, Table, theme} from "@nextui-org/react";
import {Pill} from "./Pill";

export const EquityMarket = () => {

    return (
        <Card>

            <Card.Header>
                <h2 style={{paddingLeft: "20px"}}>Pools</h2>
            </Card.Header>

            <Card.Body>

                <Pill color={theme.colors.primary.computedValue} text={"Raising"}/>
                <Table shadow={false} sticked headerLined>
                    <Table.Header>
                        <Table.Column>Name</Table.Column>
                        <Table.Column>Token</Table.Column>
                        <Table.Column align={"end"}>Total Supply</Table.Column>
                        <Table.Column align={"end"}>Total Raised</Table.Column>
                        <Table.Column align={"end"}>Target IRR</Table.Column>
                        <Table.Column align={"end"}>Target CoC</Table.Column>
                        <Table.Column align={"end"}>Target Date</Table.Column>
                        <Table.Column align={"end"}>Fund Term</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Cell 1</Table.Cell>
                            <Table.Cell>Cell 2</Table.Cell>
                            <Table.Cell css={{textAlign: "end"}}>Cell 3</Table.Cell>
                            <Table.Cell css={{textAlign: "end"}}>Cell 4</Table.Cell>
                            <Table.Cell css={{textAlign: "end"}}>Cell 5</Table.Cell>
                            <Table.Cell css={{textAlign: "end"}}>Cell 6</Table.Cell>
                            <Table.Cell css={{textAlign: "end"}}>Cell 7</Table.Cell>
                            <Table.Cell css={{textAlign: "end"}}>Cell 8</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>

                <Spacer y={2}/>

                <Pill color={theme.colors.secondary.computedValue} text={"Active"}/>
                <Table shadow={false} sticked headerLined>
                    <Table.Header>
                        <Table.Column>Name</Table.Column>
                        <Table.Column>Token</Table.Column>
                        <Table.Column align={"end"}>Total Supply</Table.Column>
                        <Table.Column align={"end"}>Target IRR</Table.Column>
                        <Table.Column align={"end"}>Current IRR</Table.Column>
                        <Table.Column align={"end"}>Target CoC</Table.Column>
                        <Table.Column align={"end"}>Current CoC</Table.Column>
                        <Table.Column align={"end"}>Vintage Year</Table.Column>
                        <Table.Column align={"end"}>Fund Term</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Cell 1</Table.Cell>
                            <Table.Cell>Cell 2</Table.Cell>
                            <Table.Cell css={{textAlign: "end"}}>Cell 3</Table.Cell>
                            <Table.Cell css={{textAlign: "end"}}>Cell 4</Table.Cell>
                            <Table.Cell css={{textAlign: "end"}}>Cell 5</Table.Cell>
                            <Table.Cell css={{textAlign: "end"}}>Cell 6</Table.Cell>
                            <Table.Cell css={{textAlign: "end"}}>Cell 7</Table.Cell>
                            <Table.Cell css={{textAlign: "end"}}>Cell 8</Table.Cell>
                            <Table.Cell css={{textAlign: "end"}}>Cell 9</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>

            </Card.Body>

            <Card.Footer/>

        </Card>
    )

}