import React, {useMemo, useState} from "react";
import {Button, Grid, theme, Tooltip} from "@nextui-org/react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {CreateDaoAction} from "../services/actions/create-dao-action";
import {IoIosArrowBack} from "react-icons/io";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";

export const SubNavbar = () => {

    const markets = ["EQUITY MARKET", "DEBT MARKET"]

    const [selected, setSelected] = useState<string>(markets[0]);
    const connection = useConnection().connection;
    const wallet = useWallet();
    const location = useLocation();

    const navigate = useNavigate();

    const handleClick = (market) => {
        setSelected(market)
        navigate(market.split(" ")[0].toLowerCase())
    }

    const createDaoAction = useMemo<CreateDaoAction>(() => {
        return new CreateDaoAction(connection, wallet);
    }, [connection, wallet])

    const createDao = () => {

        const info = require("../assets/create-dao-config.localnet.json")
        createDaoAction.execute(info)
            .then(() => console.log("dao created"))
            .catch(err => console.error(err.message));

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
                            <IoIosArrowBack style={{marginRight: 10}}/> BACK TO MARKET
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

                    <Button size={"sm"}
                            color={"secondary"}
                            onClick={() => createDao()}>
                        Create DAO
                    </Button>
                </Grid.Container>
            </>
        )
    }

}
