import React, {useState} from "react";
import {Button, Grid, Tooltip} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";

export const SubNavbar = () => {

    const markets = ["EQUITY MARKET", "DEBT MARKET"]

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
                            <Tooltip content={market === "DEBT MARKET" ? "Coming soon!" : ""}>
                                <Button size={"sm"}
                                        color={"primary"}
                                        style={{fontWeight: "bold", letterSpacing: "2px"}}
                                        ghost={market !== selected}
                                        disabled={market === "DEBT MARKET"}
                                        onClick={() => handleClick(market)}
                                >
                                    {market}
                                </Button>
                            </Tooltip>
                        </Grid>
                    )
                })}
            </Grid.Container>
        </>
    )

}