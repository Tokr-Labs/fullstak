import React, {useState} from "react";
import {Button, Grid, Tooltip} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";

export const Pools = () => {

    const markets = ["Equity Market", "Debt Market"]

    const [selected, setSelected] = useState<String>(markets[0]);

    const navigate = useNavigate();

    const handleClick = (market) => {
        setSelected(market)
        navigate(market.split(" ")[0].toLowerCase())
    }

    return (
        <>
            <Grid.Container gap={2}>
                {markets.map((market) => {
                    return (
                        <Grid key={market}>
                            <Tooltip content={market === "Debt Market" ? "Coming soon!" : ""}>
                                <Button size={"sm"}
                                        color={"gradient"}
                                        ghost={market !== selected}
                                        shadow={market === selected}
                                        disabled={market === "Debt Market"}
                                        onClick={() => handleClick(market)}
                                >
                                    {market}
                                </Button>
                            </Tooltip>
                        </Grid>
                    )
                })}
            </Grid.Container>
            <hr/>
        </>
    )

}