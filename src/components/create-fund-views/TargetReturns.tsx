import {Input, Grid, Text, Spacer} from "@nextui-org/react";
import React, {useMemo, useState} from "react";

const TargetReturns = (props) => {
    return (
        <>
        <Text h4 style={{width: '100%'}}>{props.fundName}</Text>
        <Text b style={{width: '70%'}}>Approximate or expected returns of the property & fund</Text>
        <Spacer y={1}/>
        {/* @TODO: input validation -- limit to 2 decimals and must be in the range of [0, 100] */}
        <Grid.Container gap={2}>
            <Grid xs={6} justify='center'>
                <Input label="Internal Rate of Return" type="number"
                    value={props.irr}
                    onChange={event => props.setIRR(event.target.value)}
                />
            </Grid>
            <Grid xs={6} justify='center'>
                <Input label="Cash on Cash" type="number"
                    value={props.coc}
                    onChange={event => props.setCOC(event.target.value)}
                />
            </Grid>
            <Grid xs={6} justify='center'>
                <Input label="Total Value to Paid-in" type="number"
                    value={props.tvpi}
                    onChange={event => props.setTVPI(event.target.value)}
                />
            </Grid>
            
            <Grid xs={6} justify='center'>
                <Input label="Distributions to Paid-in" type="number"
                    value={props.dpi}
                    onChange={event => props.setDPI(event.target.value)}
                />
            </Grid>
        </Grid.Container>
        </>
    )
};

export default TargetReturns;