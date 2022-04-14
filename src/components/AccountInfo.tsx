import React, {useEffect, useState} from "react";
import {Card, Collapse, Text} from "@nextui-org/react";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";

export const AccountInfo = () => {

    const {publicKey} = useWallet();
    const {connection} = useConnection();

    const [balance, setBalance] = useState<Number>(0);

    useEffect(() => {
        if (publicKey) {
            connection.getBalance(publicKey as PublicKey)
                .then(res => setBalance(res/LAMPORTS_PER_SOL))
        }
    }, [connection, publicKey])


    return (
        <Card>
            <Card.Body>
                <Collapse.Group accordion={false}>
                    <Collapse title={"Wallet"}>
                        <Text>Balance: {balance} SOL</Text>
                    </Collapse>
                    <Collapse title={"Supplied"}>
                        <Text>Placeholder -- $0.00</Text>
                    </Collapse>
                    <Collapse title={"Borrowed"}>
                        <Text>Placeholder -- $0.00</Text>
                    </Collapse>
                </Collapse.Group>
            </Card.Body>
        </Card>
    )

}