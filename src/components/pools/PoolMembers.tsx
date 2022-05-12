import React, {useContext, useMemo, useState} from "react";
import {Link, Table} from "@nextui-org/react";
import {PublicKey} from "@solana/web3.js";
import {useConnection} from "@solana/wallet-adapter-react";
import {TokenServices} from "../../services/token-services";
import {NetworkContext} from "../../App";

export const PoolMembers = () => {

    const connection = useConnection().connection;
    const {network} = useContext(NetworkContext);

    const data = require("src/daos/devnet/tj-test-dao.json")

    const [members, setMembers] = useState<any[]>();
    const [lpTokenSupply, setLpTokenSupply] = useState<number | null>();

    useMemo(() => {

        connection.getTokenSupply(new PublicKey(data.addresses.mint.lp_token_mint))
            .then(supply => setLpTokenSupply(supply.value.uiAmount))

        const tokenServices = new TokenServices(connection)

        tokenServices.getTokenHoldersForMint(new PublicKey(data.addresses.mint.lp_token_mint))
            .then(response => setMembers(response))


    }, [connection, data.addresses.mint.lp_token_mint])

    return (
        <Table sticked headerLined shadow={false}>
            <Table.Header>
                <Table.Column>Member</Table.Column>
                <Table.Column>Amount</Table.Column>
                <Table.Column>Ownership</Table.Column>
            </Table.Header>
            <Table.Body>

                {/*@ts-ignore*/}
                {members?.sort((a, b) => {
                    const aAmount = a.account.data.parsed.info.tokenAmount.amount;
                    const bAmount = b.account.data.parsed.info.tokenAmount.amount;
                    return bAmount - aAmount;
                }).filter(value => value.account.data.parsed.info.tokenAmount.amount > 0)
                    .map(member => {
                        const owner = member.account.data.parsed.info.owner;
                        const uiAmount = member.account.data.parsed.info.tokenAmount.uiAmount;
                        return (
                            <Table.Row>
                                <Table.Cell>
                                    <Link
                                        icon
                                        href={"https://explorer.solana.com/address/" + owner + "?cluster=" + network}
                                        target={"_blank"}
                                    >
                                        {owner}
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    {uiAmount} {data.token.ticker}
                                </Table.Cell>
                                <Table.Cell>
                                    {/*TODO - find a better solution for if the token supply is null or zero*/}
                                    {
                                        ((uiAmount * 100) / ((lpTokenSupply! > 0 ? lpTokenSupply! : 1)))
                                            .toFixed(2) + "%"
                                    }
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
            </Table.Body>
        </Table>
    )

}