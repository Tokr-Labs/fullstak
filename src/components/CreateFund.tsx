import React, { useEffect, useMemo, useState } from "react";
import { Modal, Button, Text, Input, Row, Checkbox, Dropdown, Grid, Spacer, Textarea, Table, Container, Progress, StyledContainer, Collapse, Col, theme } from "@nextui-org/react";
import TargetReturns from "./create-fund-views/TargetReturns";
import KeyValueTable from "./create-fund-views/KeyValueTable";
import Stakeholders from "./create-fund-views/Stakeholders";
import FundName from "./create-fund-views/FundName";
import FundConfig from "./create-fund-views/FundConfig";
import FundInvestment from "./create-fund-views/FundInvestment";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { CreateDaoAction } from "src/services/actions/create-dao-action";
import { IoIosArrowBack } from "react-icons/io";


enum FundCreationStep {
    // fund creator sets the high-level information about the fund
    NAME,

    // fund creator sets the various stakeholders for the fund
    STAKEHOLDERS,

    // fund creator sets property data (i.e. asset type / class)
    FUND_CONFIG,

    // fund creator sets the investment terms of the fund
    FUND_INVESTMENT,

    // fund creator sets the expected/target capital returns of the fund
    TARGET_RETURNS,

    // final review before solana transaction submission
    SUBMIT
}

// Determines the ordering of fund creation stages
export const FundCreationOrder = [
    FundCreationStep.NAME,
    FundCreationStep.STAKEHOLDERS,
    FundCreationStep.FUND_CONFIG,
    FundCreationStep.FUND_INVESTMENT,
    FundCreationStep.TARGET_RETURNS,
    FundCreationStep.SUBMIT
]

export const CreateFund = (props) => {
    // determines if the modal is open or not
    const [visible, setVisible] = useState<boolean>(false);

    // determines which "page" of the modal should be conditionally rendered
    // i.e. depending on the step, different inputs are rendered for the user
    const [step, setStep] = useState<FundCreationStep>(FundCreationStep.NAME);

    // indicate if the user has scrolled to the bottom
    // will be used for enabling the `Create` button
    const [scrolledToBottom, setScrolledToBottom] = useState<boolean>(false);

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
    const [assetType, setAssetType] = useState<any>(new Set([]));
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
    const investmentData = [
        {name: 'Minimum Raise', value: minRaise},
        {name: 'Maximum Raise', value: maxRaise},
        {name: 'Minimum Investment', value: minInvestment},
        {name: 'Closing Fee', value: closingFee},
        {name: 'Annual Fee', value: annualFee}
    ]
    const returnData = [
        {name: 'Internal Rate of Return', value: irr},
        {name: 'Cash on Cash', value: coc},
        {name: 'Total Value to Paid-in', value: tvpi},
        {name: 'Distributions to Paid-in', value: dpi},
    ]

    // styling objects
    const navigationStyle: object = {marginLeft: 'auto', marginRight: 'auto', borderRadius: theme.radii.pill.computedValue}

    const closeHandler = () => {
        setVisible(false);
    }

    // handle the user's scroll event, setting to `true` when scrolled to the bottom
    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        setScrolledToBottom(bottom);
    }

    // wallet & web3 vars
    const {connection} = useConnection();
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
        <>
            <Button
                size={"sm"}
                color={'secondary'}
                onClick={() => setVisible(true)}
                style={props.buttonStyle}
            >
                Create Fund
            </Button>
            <Modal
                closeButton
                aria-label="create fund"
                open={visible}
                onClose={closeHandler}
                width="40%"
                blur
            >
                <Modal.Header>

                    {
                            step !== FundCreationOrder[0] &&
                            <div>
                                <Button
                                    flat
                                    auto
                                    onClick={handleBack}
                                    style={{
                                        ...navigationStyle,
                                        position: 'absolute',
                                        background: 'transparent',
                                        color: theme.colors.black.computedValue,
                                    }}
                                    size="md"
                                >
                                    <IoIosArrowBack/>
                                </Button>
                            </div>    
                    }                    
                    <Grid.Container justify="center">

                        <Grid xs={12} justify='center' alignItems="center">
                            <Text h4>Create Fund</Text>
                        </Grid>
                        <Grid xs={12} justify='center' alignItems="center">
                            {/* Conditionally render the subheader based on the current step */}
                            <Text h3>
                                {
                                    step === FundCreationStep.NAME ?
                                        "Fund Name & Info" :
                                    step === FundCreationStep.STAKEHOLDERS ?
                                        "Stakeholder Information" :
                                    step === FundCreationStep.FUND_CONFIG ?
                                        "Fund Configuration" :
                                    step === FundCreationStep.FUND_INVESTMENT ?
                                        "Fund Investment" :
                                    step === FundCreationStep.TARGET_RETURNS ?
                                        "Target Returns" :
                                    step === FundCreationStep.SUBMIT ?
                                        "Review" : ""
                                }
                            </Text>
                        </Grid>
                        <Grid xs={12} justify='center' alignItems="center">
                            <StyledContainer style={{width: "20%"}}>
                            <Progress
                                color="primary"
                                size="sm"
                                value={FundCreationOrder.indexOf(step)} max={FundCreationOrder.length - 1}
                            />
                            </StyledContainer>
                        </Grid>
                    </Grid.Container>
                </Modal.Header>
                <Modal.Body onScroll={handleScroll} style={{height: '50vh', overflowY: 'auto'}}>
                    {/* Body of the modal if conditionally rendered dependent on `FundCreateStep` */}
                    {
                        step === FundCreationStep.NAME &&
                        <>
                            <FundName
                              fundName={fundName} setFundName={setFundName}
                              tokenSymbol={tokenSymbol} setTokenSymbol={setTokenSymbol}
                              fundDescription={fundDescription} setFundDescription={setFundDescription}
                            />
                        </>
                    }
                    {
                        step === FundCreationStep.STAKEHOLDERS &&
                        <>
                            <Stakeholders
                                fundName={fundName}
                                sponsorName={sponsorName} setSponsorName={setSponsorName}
                                sponsorCompany={sponsorCompany} setSponsorCompany={setSponsorCompany}
                                delegateAccount={delegateAccount} setDelegateAccount={setDelegateAccount}
                                delegateName={delegateName} setDelegateName={setDelegateName}
                                delegateCompany={delegateCompany} setDelegateCompany={setDelegateCompany}
                            />
                        </>
                    }
                    {
                        step === FundCreationStep.FUND_CONFIG &&
                        <>
                            <FundConfig
                                fundName={fundName}
                                assetType={assetType} setAssetType={setAssetType}
                                formattedAssetClass={formattedAssetClass}
                                assetClass={assetClass} setAssetClass={setAssetClass}
                                assetVintage={assetVintage} setAssetVintage={setAssetVintage}
                                assetSize={assetSize} setAssetSize={setAssetSize}
                                targetMarket={targetMarket} setTargetMarket={setTargetMarket}
                                strategy={strategy} setStrategy={setStrategy}
                                fundTerm={fundTerm} setFundTerm={setFundTerm}
                            />
                        </>
                    }
                    {
                        step === FundCreationStep.FUND_INVESTMENT &&
                        <>
                            <FundInvestment
                                fundName={fundName}
                                minRaise={minRaise} setMinRaise={setMinRaise}
                                maxRaise={maxRaise} setMaxRaise={setMaxRaise}
                                minInvestment={minInvestment} setMinInvestment={setMinInvestment}
                                closingFee={closingFee} setClosingFee={setClosingFee}
                                annualFee={annualFee} setAnnualFee={setAnnualFee}
                            />
                        </>
                    }
                    {
                        step === FundCreationStep.TARGET_RETURNS &&
                        <TargetReturns
                            fundName={fundName}
                            irr={irr} setIRR={setIRR}
                            coc={coc} setCOC={setCOC}
                            tvpi={tvpi} setTVPI={setTVPI}
                            dpi={dpi} setDPI={setDPI}
                        />
                    }
                    {
                        step === FundCreationStep.SUBMIT &&
                            <Collapse.Group splitted>
                                <Collapse title={<Text h4>Fund Name & Info</Text>} expanded>
                                    <KeyValueTable arialabel="fund summary" keyString="NAME" valueString="VALUE" data={infoData}/>
                                </Collapse>
                                <Collapse title={<Text h4>Stakeholders</Text>} expanded>
                                    <KeyValueTable arialabel="stakeholders" keyString="STAKEHOLDERS" valueString="VALUE" data={stakeholderData}/>
                                </Collapse>    
                                <Collapse title={<Text h4>Configuration</Text>} expanded>
                                    <KeyValueTable arialabel="config" keyString="CONFIG" valueString="VALUE" data={fundConfigData}/>
                                </Collapse>
                                <Collapse title={<Text h4>Investment</Text>} expanded>
                                    <KeyValueTable arialabel="investment summary" keyString="INVESTMENT" valueString="VALUE" data={investmentData}/>
                                </Collapse>
                                <Collapse title={<Text h4>Returns</Text>} expanded>
                                    <KeyValueTable arialabel="returns summary" keyString="RETURNS" valueString="VALUE" data={returnData}/>
                                </Collapse>
                            </Collapse.Group>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Container style={{width: "100%"}}>
                    <Button onClick={handleNext}
                        style={{
                            ...navigationStyle,
                            width: step === FundCreationStep.SUBMIT ? "100%" : "33%",
                            backgroundColor: step !== FundCreationStep.SUBMIT ? theme.colors.primary.computedValue :
                                (step === FundCreationStep.SUBMIT && scrolledToBottom) ? theme.colors.green100.computedValue : theme.colors.gray100.computedValue,
                        }}
                        // disable the Create button if the user is on the last step and has not scrolled to the bottom
                        disabled={(step === FundCreationStep.SUBMIT && !scrolledToBottom)}
                    >
                        {step === FundCreationStep.SUBMIT ? "Create" : "Next"}
                    </Button>
                    </Container>
                </Modal.Footer>
            </Modal>
        </>
    )

}


