import React, {useContext, useMemo, useState} from "react";
import {Link, Table, theme} from "@nextui-org/react";
import {useConnection} from "@solana/wallet-adapter-react";
import {NetworkContext} from "../../App";
import {generateCapTable} from "@tokr-labs/cap-table";
import {CapTableEntry} from "@tokr-labs/cap-table/lib/models/cap-table-entry";
import {DaoInfoContext} from "../../models/contexts/dao-context";
import {PublicKey} from "@solana/web3.js";
import {CapTable} from "@tokr-labs/cap-table/lib/models/cap-table";
import {CurrencyFormatter} from "../../utils/currency-formatter";

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
            treasuryStock,
            [
                // TODO - change this to be the actual Treasury Stock account
                dao.addresses.governance.delegateTokenMintGovernance as PublicKey
            ]
        ).then(capTable => {
            setCapTable(capTable);
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

                {(capTable?.entries.sort((a, b) => {
                    return b.tokensHeld - a.tokensHeld
                }) ?? []).map((entry: CapTableEntry) => (

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
                                {CurrencyFormatter.formatToken(entry.tokensHeld, dao.token.ticker, true)}
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