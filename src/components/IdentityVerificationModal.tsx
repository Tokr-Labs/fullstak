import {Button, Modal, Spacer, Text} from "@nextui-org/react";
import React, {useCallback, useContext, useMemo} from "react";
import {DaoInfoContext} from "../models/contexts/dao-context";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {IdentityRecord} from "@tokr-labs/identity-verification/lib/models/identity-record";
import {CreateIdentityRecordAction} from "../services/actions/create-identity-record-action";
import {ApproveIdentityRecordAction} from "../services/actions/approve-identity-record-action";
import {GetIdentityRecordAction} from "../services/actions/get-identity-record-action";
import {IdentityStatus} from "@tokr-labs/identity-verification/lib/models/identity-status";

export interface IdentityVerificationModalProps {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    idvRecord?: IdentityRecord,
    setIdvRecord: (idvRecord?: IdentityRecord) => void
}

export const IdentityVerificationModal = (props: IdentityVerificationModalProps) => {

    const {dao} = useContext(DaoInfoContext)
    const wallet = useWallet();
    const {connection} = useConnection()

    const createIdentityRecordAction = useMemo<CreateIdentityRecordAction>(() => {
        return new CreateIdentityRecordAction(connection, wallet)
    }, [connection, wallet])

    const approveIdentityRecordAction = useMemo<ApproveIdentityRecordAction>(() => {
        return new ApproveIdentityRecordAction(wallet)
    }, [wallet])

    const getIdentityRecordAction = useMemo<GetIdentityRecordAction>(() => {
        return new GetIdentityRecordAction(connection, wallet)
    }, [connection, wallet])

    const submitIdentity = useCallback(async () => {

        createIdentityRecordAction.execute(dao)
            .then(() => approveIdentityRecordAction.execute(dao))
            .then(() => getIdentityRecordAction.execute(dao))
            .then(record => props.setIdvRecord(record))
            .catch((error) => console.error(error))


        props.setIsOpen(false)

    }, [dao, createIdentityRecordAction, approveIdentityRecordAction, getIdentityRecordAction, props])

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
                        props.idvRecord?.status === IdentityStatus.denied &&
                            "Access Denied"
                    }
                    {
                        props.idvRecord?.status === IdentityStatus.started &&
                        "Identity Verification In Progress"
                    }
                    {
                        props.idvRecord === undefined &&
                        "Verify Your Identity"
                    }
                </Text>

            </Modal.Header>

            <Modal.Body>

                {
                    props.idvRecord?.status === IdentityStatus.denied &&
                    <p>This account has been denied access to invest in the <span>{dao.name}</span>. If you think
                        this is in error, please contact us via email.</p>
                }
                {
                    props.idvRecord?.status === IdentityStatus.started &&
                    <p>Identity verification is an asynchronous process. Please try again later.</p>
                }
                {
                    props.idvRecord === undefined &&
                    <p>Clicking the "Submit" button below will launch a transaction preview window from your
                        connected wallet for final approval.</p>
                }

            </Modal.Body>


            <Modal.Footer>

                {
                    (props.idvRecord?.status === IdentityStatus.denied || props.idvRecord?.status === IdentityStatus.started) &&
                    <Spacer y={2}/>
                }
                {
                    props.idvRecord === undefined &&
                    <Button color="primary"
                            style={{fontWeight: "bold", borderRadius: 0}}
                            onClick={submitIdentity}>
                        Submit
                    </Button>
                }

            </Modal.Footer>


        </Modal>
    )

}