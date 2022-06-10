import { Grid, Input, Dropdown, Button, Text, theme } from '@nextui-org/react';
import React from 'react'

const FundConfig = (props) => {
    const validAssetClasses = ["A", "B", "C", "D"];
    const [showCustomFundTerm, setShowCustomFundTerm] = React.useState<boolean>(false);

    const onClickFundTerm = (value: number | undefined) => {
        props.setFundTerm(value);
        setShowCustomFundTerm(false);
    }

    // styling for dropdown buttons
    const dropDownButtonStyle: object = {borderRadius: 19, textTransform: "capitalize"};
    return (
        <>
        <Grid.Container gap={2}>                        
            <Grid xs={3} justify='center'>
                <Dropdown>
                    <Dropdown.Button flat color='secondary' style={dropDownButtonStyle}>{props.assetType}</Dropdown.Button>
                    <Dropdown.Menu
                        aria-label="asset type selection"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={props.assetType}
                        onSelectionChange={props.setAssetType}
                    >
                        <Dropdown.Item key="multifamily">Multifamily</Dropdown.Item>
                        <Dropdown.Item key="commercial">Commercial</Dropdown.Item>
                        <Dropdown.Item key="industrial">Industrial</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Grid>

            <Grid xs={3} justify='center'>
                <Dropdown>
                    <Dropdown.Button
                        flat
                        color='secondary'
                        style={dropDownButtonStyle}
                    >
                        {props.assetClass.size === 0 ? "Asset Class" : `Class ${props.formattedAssetClass}`}
                    </Dropdown.Button>
                    <Dropdown.Menu
                        aria-label="asset class selection"
                        disallowEmptySelection
                        selectionMode="multiple"
                        selectedKeys={props.assetClass}
                        onSelectionChange={props.setAssetClass}
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
                <Input label="Asset Vintage" value={props.assetVintage} onChange={event => props.setAssetVintage(event.target.value)}/>
            </Grid>
            <Grid xs={3} justify='center'>
                <Input label="Asset Size" value={props.assetSize} onChange={event => props.setAssetSize(event.target.value)}/>
            </Grid>
            <Grid xs={3} justify='center'>
                <Input label="Target Market" value={props.targetMarket} onChange={event => props.setTargetMarket(event.target.value)}/>
            </Grid>
            <Grid xs={3} justify='center'>
                <Input label="Investment Strategy" value={props.strategy} onChange={event => props.setStrategy(event.target.value)}/>
            </Grid>
            <Grid.Container xs={12} justify='center'>
                <Grid xs={12} justify='center'>
                    <Text>Fund Term (Years):</Text>
                </Grid>
                <Grid xs={12} justify='center'>
                <Button.Group size="sm" color="primary" bordered > 
                {/* style={{backgroundColor: "#F6DCFF"}} */}
                    <Button ghost onClick={() => onClickFundTerm(1)}>One</Button>
                    <Button ghost onClick={() => onClickFundTerm(2)}>Two</Button>
                    <Button ghost onClick={() => onClickFundTerm(3)}>Three</Button>
                    <Button ghost onClick={() => onClickFundTerm(4)}>Four</Button>
                    <Button ghost onClick={() => onClickFundTerm(5)}>Five</Button>
                    {/* Initially show the "Custom" button, but on-click change it to an input */}
                    {!showCustomFundTerm ? (
                        <Button onClick={() => {props.setFundTerm(undefined); setShowCustomFundTerm(true)}}>Custom</Button>
                    ) : (
                        <Input
                            clearable
                            size='sm'
                            width='8ch'
                            type="number"
                            onClearClick={() => {onClickFundTerm(undefined)}}
                            value={props.fundTerm} onChange={event => props.setFundTerm(event.target.value)}
                        />
                    )}
                </Button.Group>
                </Grid>
            </Grid.Container>

            {/* Comically impractical -- wen slider??
            <Dropdown>
                <Dropdown.Button flat color='secondary' style={dropDownButtonStyle}>Fund Term</Dropdown.Button>
                <Dropdown.Menu
                    aria-label="asset type selection"
                    disallowEmptySelection
                    selectionMode="single"
                >
                    {
                        fundTermYears.map((year) => {
                            return (
                                <Dropdown.Item key={year}>{year}</Dropdown.Item>
                            )
                        })
                    }
                </Dropdown.Menu>
            </Dropdown> */}
        </Grid.Container>
        </>
    )
};

export default FundConfig;