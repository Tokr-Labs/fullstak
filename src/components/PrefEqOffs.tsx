import React from "react";
import {Card, Table, User} from "@nextui-org/react";

// Preferred Equity Offerings
export const PrefEqOffs = () => {

    return (
        <Card>
            <Card.Header>
                <h3 style={{paddingTop: "20px", paddingLeft: "20px"}}>Preferred Equity Offerings</h3>
            </Card.Header>
            <Card.Body>
                <Table shadow={false} style={{paddingTop: "0"}}>
                    <Table.Header>
                        <Table.Column>Issuer</Table.Column>
                        <Table.Column>Min. Raise</Table.Column>
                        <Table.Column>Max. Raise</Table.Column>
                        <Table.Column>Target IRR</Table.Column>
                        <Table.Column>Div. Yield</Table.Column>
                        <Table.Column>Expiration</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row key={"1"}>
                            <Table.Cell>
                                <User src={require("src/assets/issuers/arash_gohari.png")}
                                      name="27 Capital"
                                      size="xl"
                                      squared
                                      bordered
                                      color="gradient"
                                      style={{paddingLeft: "0"}}
                                >
                                    Arash Gohari
                                </User>
                            </Table.Cell>
                            <Table.Cell>--</Table.Cell>
                            <Table.Cell>--</Table.Cell>
                            <Table.Cell>--</Table.Cell>
                            <Table.Cell>--</Table.Cell>
                            <Table.Cell>--</Table.Cell>
                        </Table.Row>
                        <Table.Row key={"2"}>
                            <Table.Cell>--</Table.Cell>
                            <Table.Cell>--</Table.Cell>
                            <Table.Cell>--</Table.Cell>
                            <Table.Cell>--</Table.Cell>
                            <Table.Cell>--</Table.Cell>
                            <Table.Cell>--</Table.Cell>
                        </Table.Row>
                        <Table.Row key={"3"}>
                            <Table.Cell>--</Table.Cell>
                            <Table.Cell>--</Table.Cell>
                            <Table.Cell>--</Table.Cell>
                            <Table.Cell>--</Table.Cell>
                            <Table.Cell>--</Table.Cell>
                            <Table.Cell>--</Table.Cell>
                        </Table.Row>
                        <Table.Row key={"4"}>
                            <Table.Cell>--</Table.Cell>
                            <Table.Cell>--</Table.Cell>
                            <Table.Cell>--</Table.Cell>
                            <Table.Cell>--</Table.Cell>
                            <Table.Cell>--</Table.Cell>
                            <Table.Cell>--</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Card.Body>
        </Card>
    )

}