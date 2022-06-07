import React, { useEffect, useMemo, useState } from "react";
import { Modal, Button, Text, Input, Row, Checkbox, Dropdown, Grid, Spacer } from "@nextui-org/react";
import _ from "underscore";
import DropdownItem from "@nextui-org/react/types/dropdown/dropdown-item";

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
    const [assetClass, setAssetClass] = useState<any>(new Set([]));
    const formattedAssetClass = useMemo(
        () => {
            console.log(assetClass);
            return Array.from(assetClass).sort().join(", ").replaceAll("_", " ")
        },
        [assetClass]
    );

    const validAssetClasses = ["A", "B", "C", "D"];

    // styling objects
    const dropDownButtonStyle: any = {borderRadius: 19, textTransform: "capitalize"};

    const closeHandler = () => {
        setVisible(false);
    }

    // handle when the next button is clicked
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

    // handle when the Back button is clicked
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
                blur
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
                                <Grid xs={6} justify='center'>
                                    <Input labelPlaceholder="Min Raise"/>
                                </Grid>
                                <Grid xs={6} justify='center'>
                                    <Input labelPlaceholder="Max Raise"/>
                                </Grid>
                                <Grid xs={6} justify='center'>
                                    <Input labelPlaceholder="Minimum Investment"/>
                                </Grid>
                                <Grid xs={6} justify='center'>
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
                                        <Dropdown.Button flat color='secondary' style={dropDownButtonStyle}>{assetType}</Dropdown.Button>
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
                                        <Dropdown.Button flat color='secondary' style={dropDownButtonStyle} >{assetClass.size === 0 ? "Asset Class" : `Class ${formattedAssetClass}`}</Dropdown.Button>
                                        <Dropdown.Menu
                                            aria-label="asset class selection"
                                            disallowEmptySelection
                                            selectionMode="multiple"
                                            selectedKeys={assetClass}
                                            onSelectionChange={setAssetClass}
                                        >
                                            {validAssetClasses.map((classLetter) => {
                                                return (
                                                    <Dropdown.Item key={classLetter}>{`Class ${classLetter}`}</Dropdown.Item>
                                                )
                                                })
                                            }   
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
                        <div>
                            {/* @TODO: input validation -- limit to 2 decimals and must be in the range of [0, 100] */}
                            <Grid.Container gap={2}>
                                <Grid xs={6} justify='center'>
                                    <Input labelPlaceholder="Internal Rate of Return" type="number"/>
                                </Grid>
                                <Grid xs={6} justify='center'>
                                    <Input labelPlaceholder="COC" type="number"/>
                                </Grid>
                                <Grid xs={6} justify='center'>
                                    <Input labelPlaceholder="Total Value to Paid-in" type="number"/>
                                </Grid>
                                
                                <Grid xs={6} justify='center'>
                                    <Input labelPlaceholder="Distributions to Paid-in" type="number"/>
                                </Grid>
                            </Grid.Container>
                        </div>
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


