import { Grid, Input, Dropdown } from '@nextui-org/react';
import React from 'react'

const FundConfig = (props) => {
    const validAssetClasses = ["A", "B", "C", "D"];

    // styling for dropdown buttons
    const dropDownButtonStyle: any = {borderRadius: 19, textTransform: "capitalize"};
    return (
        <>
        <Grid.Container gap={2}>                        
            <Grid xs={3} justify='center'>
                <Dropdown>
                    <Dropdown.Button
                        flat
                        color='secondary'
                        style={dropDownButtonStyle}
                    >
                        {props.assetType.size === 0 ? "Asset Type" : props.assetType}
                    </Dropdown.Button>
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
            <Grid xs={3} justify='center'>
                <Input label="Fund Term" type="number" value={props.fundTerm} onChange={event => props.setFundTerm(event.target.value)}/>
            </Grid>
        </Grid.Container>
        </>
    )
};

export default FundConfig;