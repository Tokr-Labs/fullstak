import React, {useContext, useEffect, useState} from "react";
import {Card, Grid, Link, Text, theme} from "@nextui-org/react";
import {NetworkContext} from "../../App";
import {useConnection} from "@solana/wallet-adapter-react";
import {PublicKey} from "@solana/web3.js";

export const PoolTreasury = () => {

    const {connection} = useConnection()
    const {network} = useContext(NetworkContext)

    const data = require("src/daos/devnet/tj-test-dao.json")

    const [capitalSupplyBalance, setCapitalSupplyBalance] = useState<number|null>()
    // const [treasuryStockBalance, setTreasuryStockBalance] = useState()
    const [distributionsBalance, setDistributionsBalance] = useState<number|null>()

    useEffect(() => {

        connection.getTokenAccountBalance(new PublicKey(data.addresses.treasury.capital_supply))
            .then(response => setCapitalSupplyBalance(response.value.uiAmount))

        // TODO - set up and incorporate Treasury Stock account

        connection.getTokenAccountBalance(new PublicKey(data.addresses.treasury.distributions))
            .then(response => setDistributionsBalance(response.value.uiAmount))

    }, [connection, data.addresses.treasury.capital_supply, data.addresses.treasury.distributions])

    return (
        <Grid.Container gap={2} justify={"space-evenly"}>
            <Grid sm={4} xs={12}>
                <Card bordered shadow={false}>
                    <Card.Header>
                        <Link
                            href={
                                "https://explorer.solana.com/address/"
                                + data.addresses.treasury.capital_supply
                                + "?cluster=" + network
                            }
                            target={"_blank"}
                            rel={"noreferrer"}
                            icon
                            color={"primary"}
                        >
                            <Text h3 color={theme.colors.primary.computedValue}>Capital Supply</Text>
                        </Link>
                    </Card.Header>
                    <Card.Body>
                        {capitalSupplyBalance} USDC
                    </Card.Body>
                    <Card.Footer/>
                </Card>
            </Grid>
            <Grid sm={4} xs={12}>
                <Card bordered shadow={false}>
                    <Card.Header>
                        <Text h3>Treasury Stock</Text>
                    </Card.Header>
                    <Card.Body/>
                    <Card.Footer/>
                </Card>
            </Grid>
            <Grid sm={4} xs={12}>
                <Card  bordered shadow={false}>
                    <Card.Header>
                        <Link
                            href={
                                "https://explorer.solana.com/address/"
                                + data.addresses.treasury.distributions
                                + "?cluster=" + network
                            }
                            target={"_blank"}
                            rel={"noreferrer"}
                            icon
                            color={"primary"}
                        >
                            <Text h3 color={theme.colors.primary.computedValue}>Distributions</Text>
                        </Link>
                    </Card.Header>
                    <Card.Body>
                        {distributionsBalance} USDC
                    </Card.Body>
                    <Card.Footer/>
                </Card>
            </Grid>
        </Grid.Container>
    )

}