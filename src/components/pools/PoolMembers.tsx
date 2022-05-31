import React, {useContext, useMemo, useState} from "react";
import {Link, Table} from "@nextui-org/react";
import {useConnection} from "@solana/wallet-adapter-react";
import {NetworkContext} from "../../App";
import {generateCapTable} from "@tokr-labs/cap-table";
import {CapTableEntry} from "@tokr-labs/cap-table/lib/models/cap-table-entry";
<<<<<<< HEAD
import {DaoInfoContext} from "../../models/contexts/dao-context";
import {PublicKey} from "@solana/web3.js";
=======
import {DaoInfo} from "../../models/dao/dao-info";
import {CapTable} from "@tokr-labs/cap-table/lib/models/cap-table";
>>>>>>> develop

export const PoolMembers = () => {

    const connection = useConnection().connection;
    const {network} = useContext(NetworkContext);
    const dao = useContext(DaoInfoContext);

    const [capTable, setCapTable] = useState<CapTable>();

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
            [
                new PublicKey("GHZQAZ3Nom1b4aWaFA8V5TiE5GgyR2bh3P2MjovucRst")
            ]
        ).then(capTable => {
            setCapTable(capTable);

            console.log(capTable.entries)

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

                {(capTable?.entries ?? []).map((entry: CapTableEntry) => (

                        <Table.Row key={`${entry.holder}`}>

                            <Table.Cell>

                                <Link icon
                                      href={`https://explorer.solana.com/address/${entry.holder}?cluster=${network}`}
                                      target={"_blank"}>

                                    {entry.holder.toString()}

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