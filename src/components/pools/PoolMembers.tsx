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
        <Table shadow={false} sticked headerLined style={{paddingTop: 0}}>

            <Table.Header>
                <Table.Column>Member</Table.Column>
                <Table.Column>Share of Pool</Table.Column>
            </Table.Header>

            <Table.Body>

                {/*@ts-ignore*/}
                {members?.map(member => {
                    console.log(member.account.data.parsed)
                    return (
                        <Table.Row>
                            <Table.Cell>
                                <Link
                                    icon
                                    href={
                                        "https://explorer.solana.com/address/"
                                        + member.account.data.parsed.info.owner
                                        + "?cluster=" + network
                                    }
                                    target={"_blank"}
                                >
                                    {member.account.data.parsed.info.owner}
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                {/*TODO - find a better solution for if the token supply is null or zero*/}
                                {
                                    (member.account.data.parsed.info.tokenAmount.uiAmount
                                    / ((lpTokenSupply! > 0 ? lpTokenSupply! : 1) * 100)).toFixed(2)
                                    + "%"
                                }
                            </Table.Cell>
                        </Table.Row>
                    )
                })}

            </Table.Body>

        </Table>
    )

}