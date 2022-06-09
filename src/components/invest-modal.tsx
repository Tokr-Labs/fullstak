import {Button, Input, Modal, Spacer, Text} from "@nextui-org/react";
import React, {useCallback, useContext, useMemo, useState} from "react";
import {DaoInfoContext} from "../models/contexts/dao-context";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {DepositCapitalAction} from "../services/actions/deposit-capital-action";
import {Link} from "react-router-dom";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {NetworkContext} from "../models/contexts/network-context";

export interface InvestModalProps {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    usdcHoldings: number | null
}

export const InvestModal = (props: InvestModalProps) => {

    const {dao} = useContext(DaoInfoContext)
    const wallet = useWallet();
    const {network} = useContext(NetworkContext);
    const {connection} = useConnection()
    const [tokensToReceive, setTokensToReceive] = useState<number>(0);

    const depositCapitalAction = useMemo<DepositCapitalAction>(() => {
        return new DepositCapitalAction(connection, wallet);
    }, [connection, wallet])

    const makeDeposit = useCallback(async () => {

        depositCapitalAction.execute(tokensToReceive, dao)
            .then(() => window.location.reload())
            .catch(error => console.error);

    }, [tokensToReceive, dao, depositCapitalAction])

    return (

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
                       size={"lg"}
                       onChange={(e) => setTokensToReceive(Number(e.target.value))}/>

                <Text size={12} css={{marginTop: -10}}>
                    You have {props.usdcHoldings} USDC available in your wallet.
                    {
                        (props.usdcHoldings === 0 && network === WalletAdapterNetwork.Devnet) &&
                        <Link to={"/faucet"}> Visit the faucet.</Link>
                    }
                </Text>

                <Spacer y={0.5}/>

                <Input readOnly
                       value={tokensToReceive}
                       type={"number"}
                       label={"Receive"}
                       size={"lg"}
                       labelRight={dao.token.ticker}
                       style={{textAlign: "right"}}
                       helperText={""}/>

                <Text size={12} css={{marginTop: -10}}>
                    These tokens represent your stake in the fund
                </Text>

                <Spacer y={0.5}/>

                <p>
                    Clicking the "Invest" button below will launch a transaction
                    preview window from your connected wallet for final approval.
                </p>

            </Modal.Body>

            <Modal.Footer>

                <Button color="primary"
                        style={{fontWeight: "bold", borderRadius: 0}}
                        onClick={makeDeposit}>
                    Invest
                </Button>

            </Modal.Footer>

        </Modal>

    )

}