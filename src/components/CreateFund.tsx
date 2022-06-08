import React, { useEffect, useMemo, useState } from "react";
import { Modal, Button, Text, Input, Row, Checkbox, Dropdown, Grid, Spacer, Textarea, Table } from "@nextui-org/react";
import TargetReturns from "./create-fund-views/TargetReturns";
import KeyValueTable from "./create-fund-views/KeyValueTable";
import Stakeholders from "./create-fund-views/Stakeholders";
import FundName from "./create-fund-views/FundName";
import FundConfig from "./create-fund-views/FundConfig";

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
    const [minRaise, setMinRaise] = useState<number>();
    const [maxRaise, setMaxRaise] = useState<number>();
    const [minInvestment, setMinInvestment] = useState<number>();

    // Form state -- Stakeholders
    const [sponsorName, setSponsorName] = useState<string>();
    const [sponsorCompany, setSponsorCompany] = useState<string>();
    const [delegateName, setDelegateName] = useState<string>();
    const [delegateCompany, setDelegateCompany] = useState<string>();
    const [delegateAccount, setDelegateAccount] = useState<string>();

    // Form state -- Fund Configuration
    const [assetType, setAssetType] = useState<any>(new Set(["Asset Type"]));
    const [assetClass, setAssetClass] = useState<any>(new Set([]));
    const [assetVintage, setAssetVintage] = useState<any>();
    const [assetSize, setAssetSize] = useState<any>();
    const [targetMarket, setTargetMarket] = useState<any>();
    const formattedAssetClass = useMemo(
        () => {
            return Array.from(assetClass).sort().join(", ").replaceAll("_", " ")
        },
        [assetClass]
    );

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
        {name: 'Minimum Raise', value: minRaise},
        {name: 'Maximum Raise', value: maxRaise},
        {name: 'Minimum Investment', value: minInvestment}
    ]
    const stakeholderData = [
        {name: 'Sponsor', value: sponsorName},
        {name: 'Sponsor Company', value: sponsorCompany},
        {name: 'Delegate', value: delegateName},
        {name: 'Delegate Company', value: delegateCompany},
        {name: 'Delegate Account', value: delegateAccount}
    ]
    const fundConfigData = [
        {name: 'Asset Type', value: assetType},
        {name: 'Asset Class', value: assetClass},
        {name: 'Asset Vintage', value: assetVintage},
        {name: 'Asset Size', value: assetSize},
        {name: 'Target Market', value: targetMarket}
    ]
    const returnData = [
        {name: 'Internal Rate of Return', value: irr},
        {name: 'Cash on Cash', value: coc},
        {name: 'Total Value to Paid-in', value: tvpi},
        {name: 'Distributions to Paid-in', value: dpi},
    ]

    // styling objects
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
                            <FundName
                              fundName={fundName} setFundName={setFundName}
                              fundDescription={fundDescription} setFundDescription={setFundDescription}
                              minRaise={minRaise} setMinRaise={setMinRaise}
                              maxRaise={maxRaise} setMaxRaise={setMaxRaise}
                              minInvestment={minInvestment} setMinInvestment={setMinInvestment}
                            />
                        </div>
                    }
                    {
                        step === FundCreationStep.STAKEHOLDERS &&
                        <div>
                            <Stakeholders
                                sponsorName={sponsorName} setSponsorName={setSponsorName}
                                sponsorCompany={sponsorCompany} setSponsorCompany={setSponsorCompany}
                                delegateAccount={delegateAccount} setDelegateAccount={setDelegateAccount}
                                delegateName={delegateName} setDelegateName={setDelegateName}
                                delegateCompany={delegateCompany} setDelegateCompany={setDelegateCompany}
                            />
                        </div>
                    }
                    {
                        step === FundCreationStep.FUND_CONFIG &&
                        <div>
                            <FundConfig
                                assetType={assetType} setAssetType={setAssetType}
                                formattedAssetClass={formattedAssetClass}
                                assetClass={assetClass} setAssetClass={setAssetClass}
                                assetVintage={assetVintage} setAssetVintage={setAssetVintage}
                                assetSize={assetSize} setAssetSize={setAssetSize}
                                targetMarket={targetMarket} setTargetMarket={setTargetMarket}
                            />
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
                            <KeyValueTable arialabel="stakeholders" keyString="STAKEHOLDERS" valueString="VALUE" data={stakeholderData}/>
                            <KeyValueTable arialabel="stakeholders" keyString="CONFIG" valueString="VALUE" data={fundConfigData}/>
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


