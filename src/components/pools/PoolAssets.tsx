import React, {useContext, useEffect, useState} from "react";
import {Button, Card, Grid, Link, Spacer, Table, Text, theme} from "@nextui-org/react";
import {NetworkContext} from "../../App";
import {useConnection} from "@solana/wallet-adapter-react";
import {PublicKey} from "@solana/web3.js";
import {DaoInfoContext} from "../../models/contexts/dao-context";
import {generateCapTable} from "@tokr-labs/cap-table";
import {CapTable} from "@tokr-labs/cap-table/lib/models/cap-table";

export const PoolAssets = () => {

    const {connection} = useConnection()
    const {network} = useContext(NetworkContext)

    const dao = useContext(DaoInfoContext);

    const [capitalSupplyBalance, setCapitalSupplyBalance] = useState<number|null>()
    const [treasuryStockBalance, setTreasuryStockBalance] = useState()
    const [distributionsBalance, setDistributionsBalance] = useState<number|null>()

    useEffect(() => {

        // @TODO: Get current balances

    }, [connection, dao])

    return (
        <>
            {/*TODO - pull in treasury accounts data from on-chain*/}
            <Table sticked headerLined shadow={false} className={"skinny-rows"}>
                <Table.Header>
                    <Table.Column>Account</Table.Column>
                    <Table.Column>Token</Table.Column>
                    <Table.Column>Amount</Table.Column>
                    <Table.Column>Value</Table.Column>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Capital Supply</Table.Cell>
                        <Table.Cell>USDC</Table.Cell>
                        <Table.Cell>1,000,000 USDC</Table.Cell>
                        <Table.Cell>$1,000,000</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Treasury Stock</Table.Cell>
                        <Table.Cell>M27</Table.Cell>
                        <Table.Cell>5,000,000 M27</Table.Cell>
                        <Table.Cell>$5,000,000</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Distributions</Table.Cell>
                        <Table.Cell>USDC</Table.Cell>
                        <Table.Cell>0 USDC</Table.Cell>
                        <Table.Cell>$0</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>

            <Spacer y={2}/>

            {/*TODO - pull in this data from json file*/}
            <Table sticked headerLined shadow={false} className={"skinny-rows"}>
                <Table.Header>
                    <Table.Column>Real-World Asset</Table.Column>
                    <Table.Column>Fund Allocation</Table.Column>
                    <Table.Column>Basis</Table.Column>
                    <Table.Column children={""}/>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>298 Greenley Rd</Table.Cell>
                        <Table.Cell>50%</Table.Cell>
                        <Table.Cell>2,500,000 USDC</Table.Cell>
                        <Table.Cell>
                            <Button
                                light
                                size={"xs"}
                                borderWeight={"light"}
                                style={{margin: 0, fontWeight: "bold"}}
                            >
                                DETAILS
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>1600 Pennsylvania Ave</Table.Cell>
                        <Table.Cell>50%</Table.Cell>
                        <Table.Cell>2,500,000 USDC</Table.Cell>
                        <Table.Cell>
                            <Button
                                light
                                size={"xs"}
                                borderWeight={"light"}
                                style={{margin: 0, fontWeight: "bold"}}
                            >
                                DETAILS
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </>
    )

}