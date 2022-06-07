import React, { useEffect, useState } from "react";
import { Modal, Button, Text, Input, Row, Checkbox, DropDown } from "@nextui-org/react";


export const CreateFund = () => {
    const [visible, setVisible] = useState<boolean>(true);

    const closeHandler = () => {
        setVisible(false);
    }

    return (
        <div>
            <Button onClick={() => setVisible(true)}>Create Fund</Button>
            <Modal
                closeButton
                aria-label="create fund"
                open={visible}
                onClose={closeHandler}
                width="66%"
            >
                <Modal.Header>
                    <Text>Create Fund</Text>
                </Modal.Header>
                <Modal.Body>
                    <Input placeholder="Fund Name"/>
                    <Input placeholder="Target Market"/>
                    <Input placeholder="Fees (per annum)"/>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button>Next</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}


