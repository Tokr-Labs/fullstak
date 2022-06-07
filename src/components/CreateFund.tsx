import React, { useEffect, useMemo, useState } from "react";
import { Modal, Button, Text, Input, Row, Checkbox, Dropdown, Grid, Spacer, Textarea, Table } from "@nextui-org/react";
import TargetReturns from "./create-fund-views/TargetReturns";
import KeyValueTable from "./create-fund-views/KeyValueTable";
import Stakeholders from "./create-fund-views/Stakeholders";

// enu for organizing the different "stages" of fund-creation
export const FundCreationStep = {
    // fund creator sets the high-level information about the fund
    NAME: "name",

    STAKEHOLDERS: "stakeholders",

    // fund creator specifies property data (i.e. asset type / class)
    FUND_CONFIG: "fund-configuration",

    // fund creator sets the expected/target capital returns of the fund
    TARGET_RETURNS: "target-returns",

    // final review before solana transaction submission
    SUBMIT: "submit"
}

// Determines the ordering of fund creation stages
export const FundCreationOrder = [
    FundCreationStep.NAME,
    FundCreationStep.STAKEHOLDERS,
    FundCreationStep.FUND_CONFIG,
    FundCreationStep.TARGET_RETURNS,
    FundCreationStep.SUBMIT
]

export const CreateFund = () => {
    const [visible, setVisible] = useState<boolean>(true);
    const [step, setStep] = useState<string>(FundCreationStep.NAME);

    // Form state -- Name Step
    const [fundName, setFundName] = useState<string>();
    const [fundDescription, setFundDescription] = useState<string>();
    const [delegate, setDelegate] = useState<string>();

    // Form state -- Fund Configuration
    const [assetType, setAssetType] = useState<any>(new Set(["Asset Type"]));
    const [assetClass, setAssetClass] = useState<any>(new Set([]));
    const formattedAssetClass = useMemo(
        () => {
            return Array.from(assetClass).sort().join(", ").replaceAll("_", " ")
        },
        [assetClass]
    );
    const validAssetClasses = ["A", "B", "C", "D"];

    // Form state -- Target Returns
    const [irr, setIRR] = useState<number>();
    const [coc, setCOC] = useState<number>();
    const [tvpi, setTVPI] = useState<number>();
    const [dpi, setDPI] = useState<number>();


    // capture and structure all user input, which will be 
    // presented as a final confirmation before
    // solana transaction is broadcasted
    const infoData = [
        {name: 'Fund Name', value: fundName},
        {name: 'Description', value: fundDescription},
        {name: 'Delegate', value: delegate},
    ]
    const returnData = [
        {name: 'Internal Rate of Return', value: irr},
        {name: 'Cash on Cash', value: coc},
        {name: 'Total Value to Paid-in', value: tvpi},
        {name: 'Distributions to Paid-in', value: dpi},
    ]

    // styling objects
    const dropDownButtonStyle: any = {borderRadius: 19, textTransform: "capitalize"};
    const navigationStyle: any = {borderRadius: 30}

    const closeHandler = () => {
        setVisible(false);
    }

    // handle when the next button is clicked
    const handleNext = () => {
        const currentStepIndex = FundCreationOrder.indexOf(step);        
        // newStepIndex should not index outside of FundCreationOrder (array)
        const newStepIndex = currentStepIndex + 1;
        if (newStepIndex === FundCreationOrder.length) {
            // @TODO: Construct & broadcast solana transaction here
            setVisible(false);
            setStep(FundCreationStep.NAME);
        } else {
            // advance to the next stage of fund creation
            setStep(FundCreationOrder[newStepIndex]);
        }
    }

    // handle when the Back button is clicked
    const handleBack = () => {
        const currentStepIndex = FundCreationOrder.indexOf(step);
        // cannot go back past index 0 (FundCreationStep.NAME)
        const newStepIndex = 0 <= currentStepIndex - 1 ? currentStepIndex - 1 : 0;
        setStep(FundCreationOrder[newStepIndex]);
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
                                <Grid.Container xs={6}>
                                <Grid xs={12} justify='center'>
                                    <Input labelPlaceholder="Fund Name" value={fundName} onChange={event => setFundName(event.target.value)}/>
                                </Grid>
                                <Grid xs={12} justify='center'>
                                    <Input labelPlaceholder="Delegate (Public Key)" value={delegate} onChange={event => setDelegate(event.target.value)}/>
                                </Grid>
                                </Grid.Container>
                                <Grid.Container xs={6}>
                                    <Grid xs={12} justify='center'>
                                        <Textarea labelPlaceholder="Description" fullWidth rows={5} value={fundDescription} onChange={event => setFundDescription(event.target.value)}/>
                                    </Grid>
                                </Grid.Container>
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
                        step === FundCreationStep.STAKEHOLDERS &&
                        <div>
                            <Stakeholders/>
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
                        <TargetReturns
                            irr={irr} setIRR={setIRR}
                            coc={coc} setCOC={setCOC}
                            tvpi={tvpi} setTVPI={setTVPI}
                            dpi={dpi} setDPI={setDPI}
                        />
                    }
                    {
                        step === FundCreationStep.SUBMIT &&
                        <div>
                            <KeyValueTable arialabel="fund summary" keyString="NAME" valueString="VALUE" data={infoData}/>
                            <KeyValueTable arialabel="returns summary" keyString="RETURNS" valueString="VALUE" data={returnData}/>
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {
                        step !== FundCreationStep.NAME &&
                        <Button onClick={handleBack} style={navigationStyle}>Back</Button>
                    }
                    <Button onClick={handleNext} style={navigationStyle}>{step === FundCreationStep.SUBMIT ? "Create" : "Next"}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}


