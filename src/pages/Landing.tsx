import "../index.css"
import discordIcon from "src/assets/icons/discord_icon.svg"
import twitterIcon from "src/assets/icons/icons-twitter_export.svg"
import fullstakLogo from "src/assets/brand/fullstak_logo_white.svg"
import {Button, Container, Grid, Spacer, theme} from "@nextui-org/react";
import {Link} from "react-router-dom";

const Landing = () => {

    return (
        <div style={{fontFamily: "Montserrat, serif", color: "white"}}>

            <section style={{
                height: "96px",
                padding: "25px 0",
                opacity: 1,
                background: `linear-gradient(
                    180deg, 
                    rgba(12, 2, 35, 1) 0%, 
                    rgba(12, 2, 35, 1) 0%, 
                    rgba(12, 2, 36, 1) 24%, 
                    rgba(28, 5, 73, 1) 100%
                )`
            }}>
                <Container>
                    <Grid.Container>
                        <Grid xs={6}>
                            <img
                                src={require("src/assets/brand/fullstak_logo_white.png")}
                                height="46px"
                                width="auto"
                                alt="Fullstak logo"
                            />
                        </Grid>
                        <Grid xs={6} justify={"flex-end"} alignItems={"center"}>
                            <Link to={"/markets"}>
                                <Button
                                    color="primary"
                                    style={{
                                        width: "200px",
                                        borderRadius: 19,
                                        color: "white",
                                        fontWeight: "bold",
                                        letterSpacing: 2.46
                                    }}
                                >
                                    LAUNCH APP
                                </Button>
                            </Link>
                        </Grid>
                    </Grid.Container>
                </Container>
            </section>

            <section style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px 0",
                background: "white",
                color: "black",
                height: "46px",
                fontSize: "13px"
            }}>
                <img
                    src={require("src/assets/riptide_logo.png")}
                    height={"20px"}
                    width={"auto"}
                    alt={"Riptide logo"}
                    style={{margin: "0 20px"}}
                />
                <b>NEWS: 2022 Solana Riptide Winner!&nbsp;
                    <a
                        href={"https://solana.com/news/riptide-hackathon-winners-solana#daos-track"}
                        target={"_blank"}
                        rel={"noreferrer"}
                        style={{
                            textDecoration: "underline",
                            color: "black"
                        }}
                    >
                        Learn More
                    </a>
                </b>
                <img
                    src={require("src/assets/riptide_logo.png")}
                    height={"20px"}
                    width={"auto"}
                    alt={"Riptide logo"}
                    style={{margin: "0 20px"}}
                />
            </section>

            <section style={{
                height: "max(calc(100vh - 142px), 600px)",
                opacity: 1,
                background: `linear-gradient(
                    180deg, 
                    rgba(12, 2, 35, 1) 0%, 
                    rgba(12, 2, 35, 1) 0%, 
                    rgba(12, 2, 36, 1) 24%, 
                    rgba(28, 5, 73, 1) 100%
                )`
            }}>
                <Container style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>

                    <div style={{
                        padding: "20px 30px",
                        background: "#0C0223",
                        maxWidth: "1000px",
                        marginTop: "auto"
                    }}>
                        <p style={{
                            margin: "0",
                            fontSize: "80px",
                            fontWeight: "bold",
                            textAlign: "center",
                            lineHeight: "120%",
                            letterSpacing: 1
                        }}>
                            OPEN FINANCE FOR REAL ESTATE
                        </p>
                    </div>

                    <p style={{
                        padding: "30px 10px",
                        background: "#0C0223",
                        textAlign: "center",
                        width: "100%",
                        maxWidth: "580px",
                        fontFamily: theme.fonts.mono.computedValue,
                        fontSize: "14px"
                    }}>
                        Fullstak brings the value of real-world assets on-chain.
                    </p>

                    <Spacer y={1}/>

                    <Link to={"/markets"}>
                        <Button
                            color="primary"
                            style={{
                                width: "200px",
                                borderRadius: 19,
                                color: "white",
                                fontWeight: "bold",
                                letterSpacing: 2.46
                            }}
                        >
                            LAUNCH APP
                        </Button>
                    </Link>

                    <Spacer y={1}/>

                    <div className={"logos"}>
                        <a href="https://discord.gg/nCGXWpFahv" target="_blank" rel="noreferrer">
                            <img src={discordIcon} alt="Discord icon"/>
                        </a>
                        <a href="https://twitter.com/tokrlabs" target="_blank" rel="noreferrer">
                            <img src={twitterIcon} alt="Twitter icon"/>
                        </a>
                    </div>

                    <p style={{
                        marginTop: "auto",
                        alignSelf: "flex-end",
                        paddingBottom: "20px",
                        display: "flex",
                        alignItems: "center"
                    }}>
                        Powered by
                        <img
                            src={require("src/assets/tokr_dark.png")}
                            height={"20px"}
                            width={"auto"}
                            alt={"Tokr logo"}
                            style={{margin: "0 10px"}}
                        />
                        and
                        <img
                            src={require("src/assets/solana_logo_dark.png")}
                            height={"20px"}
                            width={"auto"}
                            alt={"Solana logo"}
                            style={{margin: "0 10px"}}
                        />
                    </p>

                </Container>
            </section>

            <section style={{
                height: "600px",
                backgroundImage: "url(" + require("src/assets/fullstack_BW.png") + ")",
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
                        <h3 style={{letterSpacing: "3.75px"}}>REAL ESTATE MEETS DEFI</h3>
                        <p style={{fontFamily: theme.fonts.mono.computedValue}}>
                            Invest your crypto and earn yield from stable, uncorrelated real
                            estate assets by providing property owners with capital and liquidity.
                        </p>
                    </div>
                </Container>
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
                            <Button style={{
                                width: "300px",
                                height: "100px",
                                borderRadius: "0px",
                                border: "1px solid #BE00FF",
                                background: "none",
                                fontWeight: "bold",
                                fontSize: "13px",
                                letterSpacing: "2px"
                            }}>
                                Coming Soon
                            </Button>
                        </Grid>
                    </Grid.Container>
                </Container>
            </section>

            <section style={{background: "#0C0223", padding: "20px 0"}}>
                <Container>
                    <Grid.Container>
                        <Grid xs={6} sm={3} alignItems={"center"}>
                            <img
                                src={fullstakLogo}
                                height="40px"
                                width="auto"
                                alt="Tokr logo"
                            />
                        </Grid>
                        <Grid xs={0} sm={6} justify={"center"} alignItems={"center"}>
                            <p style={{
                                fontSize: "12px",
                                fontFamily: theme.fonts.mono.computedValue,
                                textAlign: "center"
                            }}>
                                Built with 💜 by&nbsp;
                                <a
                                    href={"https://tokrlabs.xyz"}
                                    target={"_blank"}
                                    rel={"noreferrer"}
                                    style={{color: "white", textDecoration: "underline"}}
                                >
                                    Tokr Labs
                                </a>
                            </p>
                        </Grid>
                        <Grid xs={6} sm={3} justify={"flex-end"} alignItems={"center"}>
                            <div className={"logos"}>
                                <a href="https://discord.gg/nCGXWpFahv" target="_blank" rel="noreferrer">
                                    <img src={discordIcon} alt="Discord icon"/>
                                </a>
                                <a href="https://twitter.com/tokrlabs" target="_blank" rel="noreferrer">
                                    <img src={twitterIcon} alt="Twitter icon"/>
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