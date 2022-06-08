import { Grid, Input } from '@nextui-org/react';
import React from 'react'

const Stakeholders = (props) => {
    return (
        <div>
        <Grid.Container gap={2}>
            <Grid.Container xs={6}>
            <Grid xs={12} justify='center'>
                <Input labelPlaceholder="Sponsor Name" value={props.sponsorName} onChange={event => props.setSponsorName(event.target.value)}/>
            </Grid>
            <Grid xs={12} justify='center'>
                <Input labelPlaceholder="Company" value={props.sponsorCompany} onChange={event => props.setSponsorCompany(event.target.value)}/>
            </Grid>
            </Grid.Container>
            <Grid.Container xs={6}>
                <Grid xs={12} justify='center'>
                    <Input labelPlaceholder="Delegate Name" value={props.delegateName} onChange={event => props.setDelegateName(event.target.value)}/>
                </Grid>
                <Grid xs={12} justify='center'>
                    <Input labelPlaceholder="Company" value={props.delegateCompany} onChange={event => props.setDelegateCompany(event.target.value)}/>
                </Grid>
            </Grid.Container>
        </Grid.Container>
        </div>
    )
};

export default Stakeholders;