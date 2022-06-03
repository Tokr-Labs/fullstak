import {Button, Input, Modal, Spacer, Text, Tooltip} from "@nextui-org/react";
import React, {useCallback, useContext, useMemo, useState} from "react";
import {DaoInfoContext} from "../models/contexts/dao-context";
import {WalletAdapterNetwork, WalletNotConnectedError} from "@solana/wallet-adapter-base";
import {USDC_DEVNET, USDC_MAINNET} from "../models/constants";
import {createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID} from "@solana/spl-token";
import {PublicKey, Transaction} from "@solana/web3.js";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {NetworkContext} from "../App";
import {TokenServices} from "../services/token-services";

export interface InvestModalProps {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    usdcHoldings: number | null
}

export const InvestModal = (props: InvestModalProps) => {

    const dao = useContext(DaoInfoContext)
    const wallet = useWallet();
    const {network} = useContext(NetworkContext)
    const {connection} = useConnection()
    const [tokensToReceive, setTokensToReceive] = useState<number>(0);

    const tokenServices = useMemo(() => new TokenServices(connection), [connection])

    const makeDeposit = useCallback(async () => {

        if (!wallet.publicKey) throw new WalletNotConnectedError()

        const capitalSupply = dao.addresses.treasury.capitalSupply;

        if (!capitalSupply) {
            return
        }

        const usdc = network === WalletAdapterNetwork.Devnet ? USDC_DEVNET : USDC_MAINNET

        const sourceTokenAccount = await getAssociatedTokenAddress(
            usdc,
            wallet.publicKey
        )

        const decimals = await tokenServices.getTokenDecimals(usdc)

        const transaction = new Transaction().add(
            createTransferInstruction(
                sourceTokenAccount,
                new PublicKey(capitalSupply),
                wallet.publicKey,
                tokensToReceive * (10 ** decimals),
                [],
                TOKEN_PROGRAM_ID
            )
        )

        const signature = await wallet.sendTransaction(transaction, connection)

        await connection.confirmTransaction(signature, "processed")

        // TODO - hacky way to get rid of modal and update balances, refactor this
        window.location.reload()

    }, [connection, network, tokenServices, tokensToReceive, wallet, dao])

    return (
        <>

            <Modal closeButton
                   aria-labelledby="modal-title"
                   open={props.isOpen}
                   onClose={() => {
                       setTokensToReceive(0)
                       props.setIsOpen(false)
                   }}>

                <Modal.Header>

                    <Text h3 id={"modal-title"}>
                        Invest in <span>{dao.name}</span>
                    </Text>

                </Modal.Header>

                <Modal.Body>

                    <Input type={"number"}
                           label={"Deposit"}
                           status={tokensToReceive > (props.usdcHoldings ?? 0) ? "error" : "default"}
                           labelRight={"USDC"}
                           style={{textAlign: "right"}}
                           helperText={"You have " + props.usdcHoldings + " USDC available in your wallet"}
                           onChange={(e) => setTokensToReceive(Number(e.target.value))}/>

                    <Spacer y={0.5}/>

                    <Input readOnly
                           value={tokensToReceive}
                           type={"number"}
                           label={"Receive"}
                           labelRight={dao.token.ticker}
                           style={{textAlign: "right"}}
                           helperText={"These tokens represent your stake in the fund"}/>

                    <Spacer y={0.5}/>

                    <p>
                        Clicking the "Invest" button below will launch a transaction
                        preview window from your connected wallet for final approval.
                    </p>

                </Modal.Body>

                <Modal.Footer>

                    <Button color="primary"
                            style={{fontWeight: "bold", borderRadius: 0}}
                            disabled
                            onClick={makeDeposit}>
                        Invest
                    </Button>

                </Modal.Footer>

            </Modal>

        </>
    )

}