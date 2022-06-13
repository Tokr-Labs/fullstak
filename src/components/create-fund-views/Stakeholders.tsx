import { Grid, Input, Spacer, Text } from '@nextui-org/react';
import React from 'react'

const Stakeholders = (props) => {
    return (
        <>
        <Text h4 style={{width: '100%'}}>{props.fundName}</Text>
        <Text b style={{width: '70%'}}>Details & contact information regarding stakeholders and overseers of the Fund</Text>
        <Spacer y={1}/>
        <Grid.Container gap={2}>
            <Grid.Container xs={6}>
            <Grid xs={12} justify='center'>
                <Input label="Sponsor Name" value={props.sponsorName} onChange={event => props.setSponsorName(event.target.value)}/>
            </Grid>
            <Grid xs={12} justify='center'>
                <Input label="Company" value={props.sponsorCompany} onChange={event => props.setSponsorCompany(event.target.value)}/>
            </Grid>
            </Grid.Container>
            <Grid.Container xs={6}>
                <Grid xs={12} justify='center'>
                    <Input label="Delegate Account" value={props.delegateAccount} onChange={event => props.setDelegateAccount(event.target.value)}/>
                </Grid>
                <Grid xs={12} justify='center'>
                    <Input label="Delegate Name" value={props.delegateName} onChange={event => props.setDelegateName(event.target.value)}/>
                </Grid>
                <Grid xs={12} justify='center'>
                    <Input label="Company" value={props.delegateCompany} onChange={event => props.setDelegateCompany(event.target.value)}/>
                </Grid>
            </Grid.Container>
        </Grid.Container>
        </>
    )
};

export default Stakeholders;