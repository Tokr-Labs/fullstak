import React, {useContext} from "react";
import {Card, Grid, Text, useTheme} from "@nextui-org/react";
import {DaoInfoContext} from "../../models/contexts/dao-context";

export const FundActive = () => {

    const {theme} = useTheme();
    const dao = useContext(DaoInfoContext)

    return (
        <Grid xs={12}>
            <Card className={"dark-card"}>

                <Card.Header>
                    <Grid.Container gap={1} alignItems={"center"}>
                        <Grid style={{paddingLeft: 0}}>
                            <img
                                src={require("src/assets/issuers/miami_fund_1.png")}
                                height={"100px"}
                                width={"100px"}
                                alt={"Miami Fund 1 logo"}
                                style={{
                                    maxHeight: "15vw",
                                    maxWidth: "15vw",
                                    borderRadius: "50%",
                                    boxShadow: "0px 0px 10px 10px rgba(190,0,255, 0.5)",
                                }}
                            />
                        </Grid>
                        <Grid style={{marginLeft: "20px"}}>
                            <Text
                                size={"min(56px, 8vw)"}
                                weight={"bold"}
                                color={"white"}
                                style={{margin: 0}}
                            >
                                {dao.name}
                            </Text>
                            <div style={{
                                display: dao.active ? "none" : "flex",
                                alignItems: "center"
                            }}>
                                        <span style={{
                                            height: "10px",
                                            width: "10px",
                                            background: theme?.colors.primary.value,
                                            borderRadius: "50%",
                                            marginRight: "10px"
                                        }}/>
                                <Text size={15} color={"white"}>Active</Text>
                            </div>
                        </Grid>
                    </Grid.Container>
                </Card.Header>

                <Card.Body style={{padding: "30px 30px"}}>

                </Card.Body>

            </Card>
        </Grid>
    )

}