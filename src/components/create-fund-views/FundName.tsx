import { Grid, Input, Spacer, Textarea } from '@nextui-org/react';
import React from 'react'

const FundName = (props) => {
    return (
        <div>
        <Grid.Container gap={2}>
            <Grid.Container xs={6}>
            <Grid xs={12} justify='center'>
                <Input label="Fund Name" value={props.fundName} onChange={event => props.setFundName(event.target.value)}/>
            </Grid>
            <Grid xs={12} justify='center'>
                <Input label="Token Symbol" value={props.tokenSymbol} onChange={event => props.setTokenSymbol(event.target.value)}/>
            </Grid>
            </Grid.Container>
            <Grid.Container xs={6}>
                <Grid xs={12} justify='center'>
                    <Textarea label="Description" fullWidth rows={5} value={props.fundDescription} onChange={event => props.setFundDescription(event.target.value)}/>
                </Grid>
            </Grid.Container>
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
        </div>
    )
};

export default FundName;