import { Grid, Input, Textarea } from '@nextui-org/react';
import React from 'react'

const FundName = (props) => {
    return (
        <div>
        <Grid.Container gap={2}>
            <Grid.Container xs={6}>
            <Grid xs={12} justify='center'>
                <Input labelPlaceholder="Fund Name" value={props.fundName} onChange={event => props.setFundName(event.target.value)}/>
            </Grid>
            </Grid.Container>
            <Grid.Container xs={6}>
                <Grid xs={12} justify='center'>
                    <Textarea labelPlaceholder="Description" fullWidth rows={5} value={props.fundDescription} onChange={event => props.setFundDescription(event.target.value)}/>
                </Grid>
            </Grid.Container>
            <Grid xs={4} justify='center'>
                <Input labelPlaceholder="Min Raise" value={props.minRaise} onChange={event => props.setMinRaise(event.target.value)}/>
            </Grid>
            <Grid xs={4} justify='center'>
                <Input labelPlaceholder="Max Raise" value={props.maxRaise} onChange={event => props.setMaxRaise(event.target.value)}/>
            </Grid>
            <Grid xs={4} justify='center'>
                <Input labelPlaceholder="Minimum Investment" value={props.minInvestment} onChange={event => props.setMinInvestment(event.target.value)}/>
            </Grid>
        </Grid.Container>
        </div>
    )
};

export default FundName;