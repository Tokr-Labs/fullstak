import "../index.css"
import tokrLogo from "src/assets/tokr_dark_crop.svg"
import tokrIcon from "src/assets/tokr_icon_dark_crop.svg"
import gitbookIcon from "src/assets/icons/icons-gitbook_export.svg"
import githubIcon from "src/assets/icons/icons-github_export.svg"
import twitterIcon from "src/assets/icons/icons-twitter_export.svg"
import {Button, Container, Grid, Spacer, theme} from "@nextui-org/react";
import { Link } from "react-router-dom"

const Landing = () => {

    return (
        <div style={{fontFamily: "Montserrat, serif", color: "white"}}>

            <section style={{height: "max(100vh, 850px)", background: "#170037"}}>
                <Container style={{height: "100%"}}>
                    <Grid.Container style={{padding: "20px 0"}}>
                        <Grid xs={6}>
                            <img src={tokrIcon} height="35px" width="auto" alt="Tokr icon"/>
                        </Grid>
                        <Grid xs={6} justify={"flex-end"}>
                            <Link to={"/markets"}>
                                <Button color="gradient">Launch App</Button>
                            </Link>
                        </Grid>
                    </Grid.Container>
                    <Spacer y={5}/>
                    <Grid.Container justify={"center"} gap={1}>
                        <Grid xs={12} justify={"center"}>
                            <img src={tokrLogo}
                                 alt="Tokr logo"
                                 style={{maxWidth: "500px", height: "auto", padding: "0 20px"}}
                            />
                        </Grid>
                        <Spacer y={2}/>
                        <Grid xs={12} justify={"center"}>
                            <div style={{padding: "20px 30px", background: "#0C0223"}}>
                                <h2 style={{
                                    margin: "0",
                                    letterSpacing: "5px"
                                }}>
                                    DEFI FOR REAL ESTATE
                                </h2>
                            </div>
                        </Grid>
                        <Grid xs={12} justify={"center"}>
                            <p style={{
                                padding: "30px 10px",
                                background: "#0C0223",
                                textAlign: "center",
                                maxWidth: "700px",
                                fontFamily: theme.fonts.mono.computedValue
                            }}>
                                Invest with crypto and earn yield from stable, uncorrelated real estate
                                assets while providing property owners with capital and liquidity.
                            </p>
                        </Grid>
                        <Grid xs={12} justify={"center"}>
                            <div className={"logos"}>
                                <a href="https://tokr.gitbook.io/tokr-main-docs/" target="_blank" rel="noreferrer">
                                    <img src={gitbookIcon} alt="Tokr Gitbook"/>
                                </a>

                                <a href="https://github.com/TOKR-labs" target="_blank" rel="noreferrer">
                                    <img src={githubIcon} alt="Tokr Gitbook"/>
                                </a>

                                <a href="https://twitter.com/tokrfi" target="_blank" rel="noreferrer">
                                    <img src={twitterIcon} alt="Tokr Gitbook"/>
                                </a>
                            </div>
                        </Grid>
                    </Grid.Container>
                </Container>
            </section>

            <section style={{
                height: "600px",
                backgroundImage: "url(" + require("src/assets/friends@2x.png") + ")",
                backgroundPosition: "center",
                backgroundSize: "cover"
            }}>
                <div style={{
                    height: "100%",
                    maxWidth: "600px",
                    background: "rgba(190,0,255,0.8)",
                    position: "relative"
                }}/>
                {/* TODO - bad practice, fix this*/}
                <Container style={{marginTop: "-419px", position: "relative"}}>
                    <div style={{maxWidth: "350px"}}>
                        <h3 style={{letterSpacing: "3.75px"}}>DEFI YOU CAN FEEL.</h3>
                        <p style={{fontFamily: theme.fonts.mono.computedValue}}>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                            quae ab illo inventore veritatis et quasi architecto.
                        </p>
                        <Button style={{
                            borderRadius: "0",
                            background: "#170037",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            fontSize: "13px",
                            fontWeight: "bold"
                        }}>
                            White paper
                        </Button>
                    </div>
                </Container>
                {/*<div style={{marginTop: "-600px", zIndex: "3"}}>*/}
                {/*</div>*/}
            </section>

            <section style={{height: "600px", background: "#170037"}}>
                <Container display={"flex"}
                           justify={"center"}
                           alignContent={"center"}
                           style={{height: "100%"}}
                >
                    <h2 style={{
                        background: "#0C0223",
                        padding: "10px 20px",
                        letterSpacing: "5px",
                        textAlign: "center"
                    }}>
                        DEVELOPER RESOURCES
                    </h2>
                    <Grid.Container justify={"center"} gap={2}>
                        <Grid>
                            <a href="https://tokr.gitbook.io/tokr-main-docs/" target="_blank" rel="noreferrer">
                                <Button style={{
                                    width: "300px",
                                    height: "100px",
                                    borderRadius: "0px",
                                    border: "1px solid #BE00FF",
                                    background: "none",
                                    fontWeight: "bold",
                                    fontSize: "13px",
                                    textTransform: "uppercase",
                                    letterSpacing: "2px"
                                }}>
                                    Documentation
                                </Button>
                            </a>
                        </Grid>
                        <Grid>
                            <Button style={{
                                width: "300px",
                                height: "100px",
                                borderRadius: "0px",
                                border: "1px solid #BE00FF",
                                background: "none",
                                fontWeight: "bold",
                                fontSize: "13px",
                                textTransform: "uppercase",
                                letterSpacing: "2px"
                            }}>
                                Discord
                            </Button>
                        </Grid>
                    </Grid.Container>
                </Container>
            </section>

            <section style={{background: "#0C0223", padding: "20px 0"}}>
                <Container>
                    <Grid.Container>
                        <Grid xs={6} sm={3} alignItems={"center"}>
                            <img src={tokrLogo} height="30px" width="auto" alt="Tokr logo"/>
                        </Grid>
                        <Grid xs={0} sm={6} justify={"center"} alignItems={"center"}>
                            <p style={{
                                fontSize: "12px",
                                fontFamily: theme.fonts.mono.computedValue,
                                textAlign: "center"
                            }}>
                                Tokr is an open-source protocol for financing real world assets.
                            </p>
                        </Grid>
                        <Grid xs={6} sm={3} justify={"flex-end"} alignItems={"center"}>
                            <div className={"logos"}>
                                <a href="https://tokr.gitbook.io/tokr-main-docs/" target="_blank" rel="noreferrer">
                                    <img src={gitbookIcon} alt="Tokr Gitbook"/>
                                </a>

                                <a href="https://github.com/TOKR-labs" target="_blank" rel="noreferrer">
                                    <img src={githubIcon} alt="Tokr Gitbook"/>
                                </a>

                                <a href="https://twitter.com/tokrfi" target="_blank" rel="noreferrer">
                                    <img src={twitterIcon} alt="Tokr Gitbook"/>
                                </a>
                            </div>
                        </Grid>
                    </Grid.Container>
                    <p style={{
                        fontSize: "10px",
                        lineHeight: "1.9",
                        opacity: "50%",
                        fontFamily: theme.fonts.mono.computedValue
                    }}>
                        Tokr Labs, Roost Enterprises Inc., Rhove and affiliates are considering an offering
                        of securities exempt from registration under the Securities Act of 1933 but has not
                        determined a specific exemption from registration the issuer intends to rely on for
                        the subsequent offer and sale of the securities. No money or other consideration is
                        being solicited at this time and any information contained herein is subject to
                        modification. Further, if any investment is sent in response to this information,
                        such investments will not be accepted and shall be returned to the funding party. No
                        offer to buy the securities shall be accepted and no funds can be received until the
                        Company determines the exemption under which the offering is intended to be conducted
                        and, where applicable, the filing, disclosure, or qualification requirements of such
                        exemption are met. Please do not reach out to us seeking to invest. We do not have an
                        offering for you to invest in at this time. Any person's indication of interest to
                        invest shall impose no obligation or commitment of any kind.
                    </p>
                </Container>
            </section>

        </div>
    )
};

export default Landing;