import React, {useContext, useMemo, useState} from "react";
import {Link, Table} from "@nextui-org/react";
import {PublicKey} from "@solana/web3.js";
import {useConnection} from "@solana/wallet-adapter-react";
import {NetworkContext} from "../../App";
import {generateCapTable} from "@tokr-labs/cap-table";
import {CapTableEntry} from "@tokr-labs/cap-table/lib/models/cap-table-entry";

export const PoolMembers = () => {

    const connection = useConnection().connection;
    const {network} = useContext(NetworkContext);

    const data = require("src/daos/devnet/tj-test-dao.json")

    const [entries, setEntries] = useState<CapTableEntry[]>();

    useMemo(() => {

        generateCapTable(
            connection,
            new PublicKey("91TqzrHZe6QotBk9ohR4cYmJEZ89ZNAYCc2Jp8Jbbmvg"), // data.addresses.mint.lp_token_mint),
            new PublicKey("GfEMgXMEkxjQRf4vyBDo1sqjfcGKEQKp4VekNbFEkofJ"), // treasury stock account
            [
                new PublicKey("HMZtv7yMrcEUVTCEnsrwsCdpCWxkKnayyoVV562uACoa")
            ]
        ).then(capTable => {
            setEntries(capTable.entries);
        }).catch(error => {
            console.error(error.message);
        });

    }, [connection, data.addresses.mint.lp_token_mint])

    return (

        <Table sticked headerLined shadow={false}>

            <Table.Header>
                <Table.Column>Member</Table.Column>
                <Table.Column>Amount</Table.Column>
                <Table.Column>Ownership</Table.Column>
            </Table.Header>

            <Table.Body>

                {(entries ?? []).map((entry) => (

                        <Table.Row key={`${entry.holder}`}>

                            <Table.Cell>

                                <Link icon
                                      href={`https://explorer.solana.com/address/${entry.holder}?cluster=${network}`}
                                      target={"_blank"}>

                                    {entry.holder}

                                </Link>

                            </Table.Cell>

                            <Table.Cell>
                                {entry.tokensHeld} {data.token.ticker}
                            </Table.Cell>

                            <Table.Cell>
                                {entry.formattedPercentage}
                            </Table.Cell>

                        </Table.Row>

                    )
                )}

            </Table.Body>

        </Table>

    )

}