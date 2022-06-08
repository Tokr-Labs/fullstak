import React, { useEffect, useMemo, useState } from "react";
import { Modal, Button, Text, Input, Row, Checkbox, Dropdown, Grid, Spacer, Textarea, Table } from "@nextui-org/react";
import TargetReturns from "./create-fund-views/TargetReturns";
import KeyValueTable from "./create-fund-views/KeyValueTable";
import Stakeholders from "./create-fund-views/Stakeholders";
import FundName from "./create-fund-views/FundName";
import FundConfig from "./create-fund-views/FundConfig";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { CreateDaoAction } from "src/services/actions/create-dao-action";

// enum for organizing the different "stages" of fund-creation
export const FundCreationStep = {
    // fund creator sets the high-level information about the fund
    NAME: "name",

    // fund creator sets the various stakeholders for the fund
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
    // determines if the modal is open or not
    const [visible, setVisible] = useState<boolean>(true);

    // determines which "page" of the modal should be conditionally rendered
    // i.e. depending on the step, different inputs are rendered for the user
    const [step, setStep] = useState<string>(FundCreationStep.NAME);

    // User-input is captured in these state variables below
    // each of the state variables are provided to child views as props

    // Form state -- Name & Info
    const [fundName, setFundName] = useState<string>();
    const [fundDescription, setFundDescription] = useState<string>();
    const [tokenSymbol, setTokenSymbol] = useState<string>();
    const [minRaise, setMinRaise] = useState<number>();
    const [maxRaise, setMaxRaise] = useState<number>();
    const [minInvestment, setMinInvestment] = useState<number>();
    const [closingFee, setClosingFee] = useState<number>();
    const [annualFee, setAnnualFee] = useState<number>();

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
    const [strategy, setStrategy] = useState<string>();
    const [fundTerm, setFundTerm] = useState<number>();

    // Form state -- Target Returns
    const [irr, setIRR] = useState<number>();
    const [coc, setCOC] = useState<number>();
    const [tvpi, setTVPI] = useState<number>();
    const [dpi, setDPI] = useState<number>();

    // capture and structure all user input, which will be 
    // presented as a final review before
    // solana transaction is broadcasted
    const infoData = [
        {name: 'Fund Name', value: fundName},
        {name: 'Token Symbol', value: tokenSymbol},
        {name: 'Description', value: fundDescription},
        {name: 'Minimum Raise', value: minRaise},
        {name: 'Maximum Raise', value: maxRaise},
        {name: 'Minimum Investment', value: minInvestment},
        {name: 'Closing Fee', value: closingFee},
        {name: 'Annual Fee', value: annualFee}
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
        {name: 'Target Market', value: targetMarket},
        {name: 'Investment Strategy', value: strategy},
        {name: 'Fund Term', value: fundTerm}
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

    // wallet & web3 vars
    const connection = useConnection().connection;
    const wallet = useWallet();
    const createDaoAction = useMemo<CreateDaoAction>(() => {
        return new CreateDaoAction(connection, wallet);
    }, [connection, wallet]);

    // handle when the next button is clicked
    const handleNext = () => {
        const currentStepIndex = FundCreationOrder.indexOf(step);        
        // newStepIndex should not index outside of FundCreationOrder (array)
        const newStepIndex = currentStepIndex + 1;
        
        // if the current step is the very last, we're ready to submit the transaction
        // Construct & broadcast solana transaction here
        if (currentStepIndex === FundCreationOrder.length - 1) {
            // consolidate all state vars into an object and provide to CreateDaoAction.execute()
            // @TODO: on board more user-input into the DAO creation transaction
            const params = {
                name: fundName,
                details: {maxRaise},
                governance: {
                    voteThresholdPercentage: 25,
                    minCommunityTokensToCreateProposal: 10000000,
                    minCouncilTokensToCreateProposal: 1,
                    minInstructionHoldUpTime: 0,
                    maxVotingTime: 259250,
                    voteTipping: 0,
                    proposalCoolOffTime: 0,
                }
            }

            // broadcasts multiple transactions for DAO creation
            createDaoAction.execute(params)
                .then(() => console.log("dao created"))
                .catch(err => alert(err.message));
            
            // close the modal & reset the step
            // @TODO: clear out the data in the form
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
            <Button
                size={"sm"}
                color={'secondary'}
                onClick={() => setVisible(true)}
            >
                Create Fund
            </Button>
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
                    {/* Body of the modal if conditionally rendered dependent on `FundCreateStep` */}
                    <Spacer y={1}/>
                    {
                        step === FundCreationStep.NAME &&
                        <div>
                            <FundName
                              fundName={fundName} setFundName={setFundName}
                              tokenSymbol={tokenSymbol} setTokenSymbol={setTokenSymbol}
                              fundDescription={fundDescription} setFundDescription={setFundDescription}
                              minRaise={minRaise} setMinRaise={setMinRaise}
                              maxRaise={maxRaise} setMaxRaise={setMaxRaise}
                              minInvestment={minInvestment} setMinInvestment={setMinInvestment}
                              closingFee={closingFee} setClosingFee={setClosingFee}
                              annualFee={annualFee} setAnnualFee={setAnnualFee}
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
                                strategy={strategy} setStrategy={setStrategy}
                                fundTerm={fundTerm} setFundTerm={setFundTerm}
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
                    {/* Back button should not be rendered on the first page */}
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


