import React, { useEffect, useMemo, useState } from "react";
import { Modal, Button, Text, Input, Row, Checkbox, Dropdown, Grid, Spacer } from "@nextui-org/react";
import _ from "underscore";

// @TODO: organize into a different file?
export const FundCreationStep = {
    NAME: "name",
    FUND_CONFIG: "fund-configuration",
    TARGET_RETURNS: "target-returns",
    SUBMIT: "submit"
}

export const CreateFund = () => {
    const [visible, setVisible] = useState<boolean>(true);
    const [step, setStep] = useState<string>(FundCreationStep.NAME);
    const [assetType, setAssetType] = useState<any>(new Set(["Asset Type"]));
    const selectedAssetType = useMemo(
        () => Array.from(assetType).join(", ").replaceAll("_", " "),
        [assetType]
    );

    const closeHandler = () => {
        setVisible(false);
    }

    const handleNext = () => {
        switch(step) {
            case FundCreationStep.NAME:
                setStep(FundCreationStep.FUND_CONFIG);
                break;
            case FundCreationStep.FUND_CONFIG:
                setStep(FundCreationStep.TARGET_RETURNS);
                break;
            case FundCreationStep.TARGET_RETURNS:
                setStep(FundCreationStep.SUBMIT);
                break;
            case FundCreationStep.SUBMIT:
                // Construct & send transaction for Fund (DAO) creation
                break;
        }
    }

    const handleBack = () => {
        switch(step) {
            case FundCreationStep.NAME:
                break;
            case FundCreationStep.FUND_CONFIG:
                setStep(FundCreationStep.NAME);
                break;
            case FundCreationStep.TARGET_RETURNS:
                setStep(FundCreationStep.FUND_CONFIG);
                break;
            case FundCreationStep.SUBMIT:
                setStep(FundCreationStep.TARGET_RETURNS);
                break;
        }
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
                    <Spacer y={1}/>
                    {
                        step === FundCreationStep.NAME &&
                        <div>
                            <Grid.Container gap={2}>
                                <Grid xs={12}>
                                    <Input labelPlaceholder="Fund Name"/>
                                </Grid>
                                <Grid xs={12}>
                                    <Input labelPlaceholder="Delegate (Public Key)"/>
                                </Grid>
                                <Grid xs={4} justify='center'>
                                    <Input labelPlaceholder="Max Raise"/>
                                </Grid>
                                <Grid xs={4} justify='center'>
                                    <Input labelPlaceholder="Minimum Investment"/>
                                </Grid>
                                <Grid xs={4} justify='center'>
                                    <Input labelPlaceholder="Close Date"/>
                                </Grid>
                            </Grid.Container>
                        </div>
                    }
                    {
                        step === FundCreationStep.FUND_CONFIG &&
                        <div>
                            <Grid.Container gap={2}>                        
                                <Grid xs={3} justify='center'>
                                    <Dropdown>
                                        <Dropdown.Button flat color='secondary' style={{borderRadius: 19, textTransform: "capitalize"}}>{assetType}</Dropdown.Button>
                                        <Dropdown.Menu
                                            aria-label="asset type selection"
                                            disallowEmptySelection
                                            selectionMode="single"
                                            selectedKeys={assetType}
                                            onSelectionChange={setAssetType}
                                        >
                                            <Dropdown.Item key="multifamily">Multifamily</Dropdown.Item>
                                            <Dropdown.Item key="commercial">Commercial</Dropdown.Item>
                                            <Dropdown.Item key="industrial">Industrial</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Grid>

                                <Grid xs={3} justify='center'>
                                    <Dropdown>
                                        <Dropdown.Button flat color='secondary' style={{borderRadius: 19}}>Asset Class</Dropdown.Button>
                                        <Dropdown.Menu>

                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Grid>
                                <Grid xs={3} justify='center'>
                                    <Input labelPlaceholder="Asset Vintage"/>
                                </Grid>
                                <Grid xs={3} justify='center'>
                                    <Input labelPlaceholder="Asset Size"/>
                                </Grid>
                                <Grid xs={3} justify='center'>
                                    <Input labelPlaceholder="Target Market"/>
                                </Grid>
                                
                                <Grid xs={3} justify='center'>
                                    <Input labelPlaceholder="Fees (per annum)"/>
                                </Grid>
                            </Grid.Container>
                        </div>
                    }
                    {
                        step === FundCreationStep.TARGET_RETURNS &&
                        <div>RETURNS</div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleBack}>Back</Button>
                    <Button onClick={handleNext}>{step === FundCreationStep.SUBMIT ? "Create" : "Next"}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}


