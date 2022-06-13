import { Grid, Input, Spacer, Textarea, Text } from '@nextui-org/react';
import React from 'react'

const FundName = (props) => {
    return (
        <>
        <Text b style={{width: '70%'}}>Initial information about the fund</Text>
        <Spacer y={1}/>
        <Grid.Container gap={2}>
            <Grid.Container xs={4}>
            <Grid xs={12} justify='center'>
                <Input label="Fund Name" value={props.fundName} onChange={event => props.setFundName(event.target.value)}/>
            </Grid>
            <Grid xs={12} justify='center'>
                <Input label="Token Symbol" value={props.tokenSymbol} onChange={event => props.setTokenSymbol(event.target.value)}/>
            </Grid>
            </Grid.Container>
            <Grid.Container xs={8}>
                <Grid xs={12} justify='center'>
                    <Textarea label="Description" fullWidth rows={5} value={props.fundDescription} onChange={event => props.setFundDescription(event.target.value)}/>
                </Grid>
            </Grid.Container>
        </Grid.Container>
        </>
    )
};

export default FundName;