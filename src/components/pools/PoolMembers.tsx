import React, {useContext, useMemo, useState} from "react";
import {Link, Table} from "@nextui-org/react";
import {useConnection} from "@solana/wallet-adapter-react";
import {NetworkContext} from "../../App";
import {generateCapTable} from "@tokr-labs/cap-table";
import {CapTableEntry} from "@tokr-labs/cap-table/lib/models/cap-table-entry";
import {DaoInfoContext} from "../../models/contexts/dao-context";

export const PoolMembers = () => {

    const connection = useConnection().connection;
    const {network} = useContext(NetworkContext);
    const dao = useContext(DaoInfoContext);

    const [entries, setEntries] = useState<CapTableEntry[]>();

    useMemo(() => {

        const lpTokenMint = dao.addresses.mint.lpTokenMint;
        const treasuryStock = dao.addresses.treasury.stockSupply;

        if (!lpTokenMint || !treasuryStock) {
            return
        }

        generateCapTable(
            connection,
            lpTokenMint,
            treasuryStock, // treasury stock account
            []
        ).then(capTable => {
            setEntries(capTable.entries);
        }).catch(error => {
            console.error(error.message);
        });

    }, [connection, dao])

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
                                {entry.tokensHeld} {dao.token.ticker}
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