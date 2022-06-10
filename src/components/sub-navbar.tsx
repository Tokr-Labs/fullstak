import React, {useState} from "react";
import {Button, Grid, theme, Tooltip} from "@nextui-org/react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {BackIcon} from "./icons/back-icon";

export const SubNavbar = () => {

    const markets = ["EQUITY MARKET", "DEBT MARKET"]

    const [selected, setSelected] = useState<string>(markets[0]);

    const location = useLocation();

    const navigate = useNavigate();

    const handleClick = (market) => {
        setSelected(market)
        navigate(market.split(" ")[0].toLowerCase())
    }

    if (location.pathname.split("/").length > 3) {
        return (
            <Grid.Container gap={2}>
                <Grid>
                    <Link to={"/markets/" + location.pathname.split("/")[2]}>
                        <Button
                            size={"sm"}
                            color={"secondary"}
                            ghost
                            borderWeight={"light"}
                            style={{
                                color: "white",
                                fontWeight: theme.fontWeights.bold.computedValue,
                                padding: "0 20px",
                                borderRadius: theme.radii.pill.computedValue
                            }}
                        >
                            <BackIcon/>&nbsp;BACK TO MARKET
                        </Button>
                    </Link>
                </Grid>
            </Grid.Container>
        )
    } else {
        return (
            <>
                <Grid.Container gap={2}>
                    {markets.map((market) => {
                        return (
                            <Grid key={market}>
                                <Tooltip content={market === "DEBT MARKET" ? "Coming soon!" : ""}>
                                    <Button size={"sm"}
                                            color={"secondary"}
                                            style={{
                                                fontWeight: theme.fontWeights.bold.computedValue,
                                                padding: "0 30px",
                                                borderRadius: theme.radii.pill.computedValue
                                            }}
                                            ghost={market !== selected}
                                            disabled={market === "DEBT MARKET"}
                                            borderWeight={"light"}
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

}
