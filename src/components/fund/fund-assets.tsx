import React, {useContext, useEffect, useMemo, useState} from "react";
import {Button, Spacer, Table} from "@nextui-org/react";
import {useConnection} from "@solana/wallet-adapter-react";
import {DaoInfoContext} from "../../models/contexts/dao-context";
import {TokenServices} from "../../services/token-services";
import {PublicKey} from "@solana/web3.js";
import {CurrencyFormatter} from "../../utils/currency-formatter";

export const FundAssets = () => {

    const {connection} = useConnection()

    const tokenServices = useMemo(() => new TokenServices(connection), [connection])

    const {dao} = useContext(DaoInfoContext);

    const [capitalSupplyBalance, setCapitalSupplyBalance] = useState<number>(0)
    const [treasuryStockBalance, setTreasuryStockBalance] = useState<number>(0)
    const [distributionsBalance, setDistributionsBalance] = useState<number>(0)

    useEffect(() => {

        tokenServices.getTokenAccountBalance(dao.addresses.treasury.capitalSupply as PublicKey)
            .then(amount => setCapitalSupplyBalance(amount ?? 0))

        tokenServices.getTokenAccountBalance(dao.addresses.treasury.stockSupply as PublicKey)
            .then(amount => setTreasuryStockBalance(amount ?? 0))

        tokenServices.getTokenAccountBalance(dao.addresses.treasury.distributions as PublicKey)
            .then(amount => setDistributionsBalance(amount ?? 0))

    }, [connection, dao, tokenServices])


    return (
        <>
            <Table sticked headerLined shadow={false} className={"skinny-rows"} aria-label="pool assets account">
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
                        <Table.Cell>{CurrencyFormatter.formatToken(capitalSupplyBalance, "USDC")}</Table.Cell>
                        <Table.Cell>{CurrencyFormatter.formatUsd(capitalSupplyBalance, true)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Treasury Stock</Table.Cell>
                        <Table.Cell>{dao.token.ticker}</Table.Cell>
                        <Table.Cell>{CurrencyFormatter.formatToken(treasuryStockBalance, "MF1")}</Table.Cell>
                        <Table.Cell>{CurrencyFormatter.formatUsd(treasuryStockBalance, true)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Distributions</Table.Cell>
                        <Table.Cell>USDC</Table.Cell>
                        <Table.Cell>{CurrencyFormatter.formatToken(distributionsBalance, "USDC")}</Table.Cell>
                        <Table.Cell>{CurrencyFormatter.formatUsd(distributionsBalance, true)}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>

            <Spacer y={2}/>

            {/*TODO - pull in this data from json file*/}
            <Table sticked headerLined shadow={false} className={"skinny-rows"} aria-label="pool assets real world assets">
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
                                disabled
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
                                disabled
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