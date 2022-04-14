import React, {useState} from "react";
import {Button, Grid} from "@nextui-org/react";

export const Pools = () => {

    const pools = ["Pool 1", "Pool 2", "Pool 3", "Pool 4", "Pool 5"]

    const [selected, setSelected] = useState<String>(pools[0]);

    return (
        <>
            <Grid.Container gap={2}>
                {pools.map((pool) => {
                    return (
                        <Grid key={pool}>
                            <Button size={"sm"}
                                    color={"gradient"}
                                    ghost={pool !== selected}
                                    shadow={pool === selected}
                                    onClick={() => setSelected(pool)}
                            >
                                {pool}
                            </Button>
                        </Grid>
                    )
                })}
            </Grid.Container>
        </>
    )

}