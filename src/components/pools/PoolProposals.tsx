import React, {useEffect, useState} from "react";
import {Table} from "@nextui-org/react";
import {getAllProposals, ProgramAccount, Proposal, ProposalState} from "@tokr-labs/governance";
import {PublicKey} from "@solana/web3.js";
import {useConnection} from "@solana/wallet-adapter-react";

export const PoolProposals = () => {

    const connection = useConnection().connection;

    const data = require("src/daos/devnet/tj-test-dao.json")

    const [proposals, setProposal] = useState<ProgramAccount<Proposal>[]>();

    useEffect(() => {
        getAllProposals(
            connection,
            new PublicKey(data.addresses.owner),
            new PublicKey(data.addresses.pubkey),
        ).then(proposals => setProposal(proposals.flat().sort(
            (a, b) => {
                return b.account.getStateTimestamp() - a.account.getStateTimestamp()
            }))
        )
    }, [connection, data.addresses.owner, data.addresses.pubkey])

    return (
        <Table shadow={false} sticked headerLined style={{paddingTop: 0, maxWidth: "1000px"}}>

            <Table.Header>
                <Table.Column>Date</Table.Column>
                <Table.Column>Proposal</Table.Column>
                <Table.Column>Outcome</Table.Column>
                <Table.Column>Details</Table.Column>
            </Table.Header>

            <Table.Body>

                {/*@ts-ignore*/}
                {proposals?.map(proposal => {

                    const date = new Date(proposal.account.getStateTimestamp() * 1000)

                    return (
                        <Table.Row>
                            <Table.Cell>
                                {date.toLocaleDateString() + " " + date.toLocaleTimeString()}
                            </Table.Cell>
                            <Table.Cell>{proposal.account.name}</Table.Cell>
                            <Table.Cell>{ProposalState[proposal.account.state]}</Table.Cell>
                            <Table.Cell css={{maxWidth: "250px", textOverflow: "ellipsis"}}>{proposal.account.descriptionLink}</Table.Cell>
                        </Table.Row>
                    )
                })}

            </Table.Body>

        </Table>
    )

}