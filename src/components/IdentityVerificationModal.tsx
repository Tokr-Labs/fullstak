import {Button, Modal, Spacer, Text} from "@nextui-org/react";
import React, {useCallback, useContext, useMemo} from "react";
import {DaoInfoContext} from "../models/contexts/dao-context";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {TOKR_SERVICE_ENDPOINT_DEVNET} from "../models/constants";
import {IdvService} from "../services/idv-service";
import {IdentityRecord} from "@tokr-labs/identity-verification/lib/models/identity-record";

export interface IdentityVerificationModalProps {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    idvRecord?: IdentityRecord,
    setIdvRecord: (idvRecord: IdentityRecord) => void
}

export const IdentityVerificationModal = (props: IdentityVerificationModalProps) => {

    const dao = useContext(DaoInfoContext)
    const wallet = useWallet();
    const {connection} = useConnection()

    const idvService = useMemo(() => new IdvService(connection, TOKR_SERVICE_ENDPOINT_DEVNET), [connection])

    const submitIdentity = useCallback(async () => {

        if (!props.idvRecord) {
            idvService.createAndApproveIdentity(wallet, dao.addresses.pubkey)
                .then(record => props.setIdvRecord(record))
                .then(error => console.error(error))
        } else {
            idvService.approveIdentity(wallet.publicKey, dao.addresses.pubkey)
                .then(record => props.setIdvRecord(record))
                .then(error => console.error(error))
        }

        props.setIsOpen(false)

    }, [idvService, wallet, dao, props])

    return (

        <Modal closeButton
               aria-labelledby="modal-title"
               open={props.isOpen}
               onClose={() => {
                   props.setIsOpen(false)
               }}>

            <Modal.Header>

                <Text h3 id={"modal-title"}>
                    {
                        props.idvRecord?.amlStatus === 3 &&
                        props.idvRecord?.kycStatus === 3 &&
                        props.idvRecord?.iaStatus === 3 ?
                            "Access Denied" :
                            "Verify Your Identity"
                    }
                </Text>

            </Modal.Header>

            <Modal.Body>

                {
                    props.idvRecord?.amlStatus === 3 &&
                    props.idvRecord?.kycStatus === 3 &&
                    props.idvRecord?.iaStatus === 3 ?
                        <p>This account has been denied access to invest in the <span>{dao.name}</span>. If you think
                            this is in error, please contact us via email.</p> :
                        <p>Clicking the "Submit" button below will launch a transaction preview window from your
                            connected wallet for final approval.</p>
                }

            </Modal.Body>


            <Modal.Footer>
                {
                    (
                        props.idvRecord?.amlStatus !== 3 &&
                        props.idvRecord?.kycStatus !== 3 &&
                        props.idvRecord?.iaStatus !== 3
                    ) ?
                        <Button color="primary"
                                style={{fontWeight: "bold", borderRadius: 0}}
                                onClick={submitIdentity}>
                            Submit
                        </Button> :
                        <Spacer y={2}/>
                }

            </Modal.Footer>


        </Modal>
    )

}