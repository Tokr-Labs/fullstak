import React, {useMemo, useState} from "react";
import {Link, Table} from "@nextui-org/react";
import {getAllTokenOwnerRecords, ProgramAccount, TokenOwnerRecord} from "@tokr-labs/governance";
import {PublicKey} from "@solana/web3.js";
import {useConnection} from "@solana/wallet-adapter-react";

export const PoolMembers = () => {

    const connection = useConnection().connection;

    const [members, setMembers] = useState<ProgramAccount<TokenOwnerRecord>[]>();
    const [communityMintSupply, setCommunityMintSupply] = useState<number | null>();

    // TODO - needs to be filtered down to just the community token mint
    useMemo(() => {

        const communityMint = "Hope16zbz1yraofEJezcpj6JcSLHHjpmJ632RUohvyWi";
        connection.getTokenSupply(new PublicKey(communityMint))
            .then(supply => setCommunityMintSupply(supply.value.uiAmount))
            .then(() => console.log(communityMintSupply))

        // The Sanctuary on mainnet-beta
        // TODO - seems to only return users with deposited tokens
        getAllTokenOwnerRecords(
            connection,
            new PublicKey("Ghope52FuF6HU3AAhJuAAyS2fiqbVhkAotb7YprL5tdS"),
            new PublicKey("CS3HBXBdZ44g7FdZfgPAz6nSBe4FSThg6ANuVdowTT6G"),
        ).then(records => setMembers(
                records.sort((a, b) => {
                    return b.account.governingTokenDepositAmount.toNumber() - a.account.governingTokenDepositAmount.toNumber()
                }).filter((member) => {
                    return member.account.governingTokenMint.toBase58() === communityMint
                        && member.account.governingTokenDepositAmount.toNumber() > 0
                })
            )
        )

    }, [communityMintSupply, connection])

    return (
        <Table shadow={false} sticked headerLined style={{paddingTop: 0}}>

            <Table.Header>
                <Table.Column>Member</Table.Column>
                <Table.Column>Share of Pool</Table.Column>
                <Table.Column>Value</Table.Column>
            </Table.Header>

            <Table.Body>

                {/*@ts-ignore*/}
                {members?.map(member => {
                    return (
                        <Table.Row>
                            <Table.Cell>
                                <Link icon
                                      href={"https://explorer.solana.com/address/" + member.account.governingTokenOwner.toBase58()}
                                      target={"_blank"}
                                >
                                    {member.account.governingTokenOwner.toBase58()}
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                {
                                    ((member.account.governingTokenDepositAmount.toNumber()
                                        / (10_000 * (communityMintSupply ?? 1)))
                                    ).toFixed(3) + "%"
                                }
                            </Table.Cell>
                            <Table.Cell>Incorporate Pyth?</Table.Cell>
                        </Table.Row>
                    )
                })}

            </Table.Body>

        </Table>
    )

}