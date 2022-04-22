import React, {useState} from "react";
import {Button, Grid, Tooltip} from "@nextui-org/react";

export const Pools = () => {

    const pools = ["Equity Market", "Debt Market"]

    const [selected, setSelected] = useState<String>(pools[0]);

    return (
        <>
            <Grid.Container gap={2}>
                {pools.map((pool) => {
                    return (
                        <Grid key={pool}>
                            <Tooltip content={pool === "Debt Market" ? "Coming soon!" : ""}>
                                <Button size={"sm"}
                                        color={"gradient"}
                                        ghost={pool !== selected}
                                        shadow={pool === selected}
                                        disabled={pool === "Debt Market"}
                                        onClick={() => setSelected(pool)}
                                >
                                    {pool}
                                </Button>
                            </Tooltip>
                        </Grid>
                    )
                })}
            </Grid.Container>
        </>
    )

}