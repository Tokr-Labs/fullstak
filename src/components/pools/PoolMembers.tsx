import React, {useContext, useMemo, useState} from "react";
import {Link, Table, theme} from "@nextui-org/react";
import {useConnection} from "@solana/wallet-adapter-react";
import {NetworkContext} from "../../App";
import {generateCapTable} from "@tokr-labs/cap-table";
import {CapTableEntry} from "@tokr-labs/cap-table/lib/models/cap-table-entry";
import {DaoInfo} from "../../models/dao/dao-info";
import {CapTable} from "@tokr-labs/cap-table/lib/models/cap-table";

export const PoolMembers = () => {

    const connection = useConnection().connection;
    const {network} = useContext(NetworkContext);

    const dao = useMemo(() => {
        // @TODO: This needs to move out and be passed in via context
        const data = require("src/daos/devnet/mf1.json")
        return DaoInfo.with(data);
    }, []);

    const [capTable, setCapTable] = useState<CapTable>();

    useMemo(() => {

        generateCapTable(
            connection,
            dao.addresses.mint.lpTokenMint,
            dao.addresses.treasury.stockSupply, // treasury stock account
            []
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
                <Table.Column align={"end"}>Amount</Table.Column>
                <Table.Column align={"end"}>Ownership</Table.Column>
            </Table.Header>

            <Table.Body>

                {(capTable?.entries ?? []).map((entry: CapTableEntry) => (

                        <Table.Row key={`${entry.holder}`}>

                            <Table.Cell>

                                <Link icon
                                      href={`https://explorer.solana.com/address/${entry.holder}?cluster=${network}`}
                                      target={"_blank"}
                                      style={{fontFamily: theme.fonts.mono.computedValue}}
                                >

                                    {entry.holder.toString()}

                                </Link>

                            </Table.Cell>

                            <Table.Cell css={{textAlign: "end"}}>
                                {entry.tokensHeld} {dao.token.ticker}
                            </Table.Cell>

                            <Table.Cell css={{textAlign: "end"}}>
                                {entry.formattedPercentage}
                            </Table.Cell>

                        </Table.Row>

                    )
                )}

            </Table.Body>

        </Table>

    )

}