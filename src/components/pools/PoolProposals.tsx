import React, {useEffect, useState} from "react";
import {Table} from "@nextui-org/react";
import {getAllProposals, ProgramAccount, Proposal, ProposalState} from "@solana/spl-governance";
import {PublicKey} from "@solana/web3.js";
import {useConnection} from "@solana/wallet-adapter-react";

export const PoolProposals = () => {

    const connection = useConnection().connection;

    const [proposals, setProposal] = useState<ProgramAccount<Proposal>[]>();

    useEffect(() => {
        // UNQ Universe on devnet
        getAllProposals(
            connection,
            new PublicKey("GTesTBiEWE32WHXXE2S4XbZvA5CrEc4xs6ZgRe895dP"),
            new PublicKey("HVywtno57PwcgWQzRaf3Pv8RKWWrF1zoqLZGULNC2jGm"),
        ).then(proposals => setProposal(proposals.flat().sort(
            (a, b) => {
                return b.account.getStateTimestamp() - a.account.getStateTimestamp()
            }))
        )
    }, [connection])

    return (
        <Table shadow={false} sticked headerLined style={{paddingTop: 0}}>

            <Table.Header>
                <Table.Column>Date</Table.Column>
                <Table.Column>Proposal</Table.Column>
                <Table.Column>Outcome</Table.Column>
                <Table.Column>Details</Table.Column>
            </Table.Header>

            <Table.Body>

                {proposals?.map(proposal => {
                    return (
                        <Table.Row>
                            <Table.Cell>{new Date(proposal.account.getStateTimestamp() * 1000).toLocaleDateString()}</Table.Cell>
                            <Table.Cell>{proposal.account.name}</Table.Cell>
                            <Table.Cell>{ProposalState[proposal.account.state]}</Table.Cell>
                            <Table.Cell>{proposal.account.descriptionLink}</Table.Cell>
                        </Table.Row>
                    )
                })}

            </Table.Body>

        </Table>
    )

}