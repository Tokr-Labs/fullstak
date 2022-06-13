import { Grid, Input, Spacer, Text } from '@nextui-org/react';
import React from 'react'

const FundInvestment = (props) => {
    return (
        <>
        <Text h4 style={{width: '100%'}}>{props.fundName}</Text>
        <Text b style={{width: '70%'}}>Details regarding the terms of investment such as limits and fees</Text>
        <Spacer y={1}/>
        <Grid.Container gap={2}>
            <Grid xs={4} justify='center'>
                <Input label="Min Raise" type="number" value={props.minRaise} onChange={event => props.setMinRaise(event.target.value)}/>
            </Grid>
            <Grid xs={4} justify='center'>
                <Input label="Max Raise" type="number" value={props.maxRaise} onChange={event => props.setMaxRaise(event.target.value)}/>
            </Grid>
            <Grid xs={4} justify='center'>
                <Input label="Minimum Investment" type="number" value={props.minInvestment} onChange={event => props.setMinInvestment(event.target.value)}/>
            </Grid>
            <Grid xs={6} justify='center'>
                <Input label="Closing Fee" type="number" value={props.closingFee} onChange={event => props.setClosingFee(event.target.value)}/>
            </Grid>
            <Grid xs={6} justify='center'>
                <Input label="Annual Fee" type="number" value={props.annualFee} onChange={event => props.setAnnualFee(event.target.value)}/>
            </Grid>
        </Grid.Container>
        </>
    )
};

export default FundInvestment;