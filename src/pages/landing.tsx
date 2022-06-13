import "../index.css"
import {Button, Container, Grid, Spacer, theme} from "@nextui-org/react";
import {Link} from "react-router-dom";
import {AttributeGridItem} from "../components/attribute-grid-item";
import {FaDiscord, FaTwitter} from "react-icons/fa";

const Landing = () => {

    return (
        <div style={{color: "white"}}>

            <section style={{
                padding: "40px 0 30px 0",
                opacity: 1,
                background: theme.colors.gradient.computedValue
            }}>
                <Container>
                    <Grid.Container alignItems={"center"}>
                        <Grid xs={6}>
                            <img
                                src={require("src/assets/brand/fullstak_logo_white.png")}
                                height="40x"
                                width="auto"
                                alt="Fullstak logo"
                                style={{maxHeight: "min(40px, 7vw)"}}
                            />
                        </Grid>
                        <Grid xs={6} justify={"flex-end"}>
                            <Link to={"/markets"}>
                                <Button
                                    auto={window.innerWidth < 550}
                                    color="primary"
                                    style={{
                                        maxWidth: "200px",
                                        maxHeight: "min(46px, 10vw)",
                                        borderRadius: 19,
                                        color: "white",
                                        fontWeight: theme.fontWeights.bold.computedValue,
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
                fontSize: "min(13px, 2vw)"
            }}>
                <img
                    src={require("src/assets/solana/riptide_logo.png")}
                    height={"20px"}
                    width={"auto"}
                    alt={"Riptide logo"}
                    style={{margin: "0 20px", maxHeight: "min(20px, 4vw)"}}
                />
                <b>NEWS: 2022 Solana Riptide Winner! {window.innerWidth > 550 ? " " : <br/>}
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
                    src={require("src/assets/solana/riptide_logo.png")}
                    height={"20px"}
                    width={"auto"}
                    alt={"Riptide logo"}
                    style={{margin: "0 20px", maxHeight: "min(20px, 4vw)"}}
                />
            </section>

            <section style={{
                height: "max(calc(100vh - 162px), 600px)",
                opacity: 1,
                background: theme.colors.gradient.computedValue
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
                        background: theme.colors.purple100.computedValue,
                        maxWidth: "1000px",
                        marginTop: "auto"
                    }}>
                        <p style={{
                            margin: "0",
                            fontSize: "min(80px, 7vw)",
                            fontWeight: theme.fontWeights.bold.computedValue,
                            letterSpacing: theme.letterSpacings.normal.computedValue,
                            textAlign: "center",
                            lineHeight: "120%",
                        }}>
                            OPEN FINANCE FOR REAL ESTATE
                        </p>
                    </div>

                    <p style={{
                        padding: "30px 10px",
                        background: theme.colors.purple100.computedValue,
                        textAlign: "center",
                        width: "100%",
                        maxWidth: "580px",
                        fontFamily: theme.fonts.mono.computedValue,
                        fontSize: theme.fontSizes.sm.computedValue
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
                                fontWeight: theme.fontWeights.bold.computedValue,
                            }}
                        >
                            LAUNCH APP
                        </Button>
                    </Link>

                    <Spacer y={1}/>

                    <div style={{display: "flex", justifyContent: "center"}}>
                        <a href="https://discord.gg/nCGXWpFahv" target="_blank" rel="noreferrer">
                            <FaDiscord style={{height: 33, width: 33, color: "white"}}/>
                        </a>
                        <Spacer x={1}/>
                        <a href="https://twitter.com/tokrlabs" target="_blank" rel="noreferrer">
                            <FaTwitter style={{height: 30, width: 30, color: "white"}}/>
                        </a>
                    </div>

                    <div style={{
                        height: "60px",
                        marginTop: "auto",
                        alignSelf: window.innerWidth > 500 ? "flex-end" : "center",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "min(3vw, 1rem)",
                    }}>
                        Powered by
                        <img
                            src={require("src/assets/brand/tokr_dark.png")}
                            height={"20px"}
                            width={"auto"}
                            alt={"Tokr logo"}
                            style={{margin: "0 10px"}}
                        />
                        on
                        <img
                            src={require("src/assets/solana/solana_logo_dark.png")}
                            height={"20px"}
                            width={"auto"}
                            alt={"Solana logo"}
                            style={{margin: "0 10px"}}
                        />
                    </div>

                </Container>
            </section>

            <section style={{
                height: "436px",
                backgroundImage: "url(" + require("src/assets/lego_background.png") + ")",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
                <Container style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <p style={{
                        opacity: 1,
                        color: "white",
                        fontSize: theme.fontSizes.xl4.computedValue,
                        fontWeight: theme.fontWeights.bold.computedValue,
                        letterSpacing: theme.letterSpacings.normal.computedValue,
                        textAlign: "center",
                        textTransform: "uppercase"
                    }}>
                        Rebuilding real estate finance,<br/> one lego at a time.
                    </p>
                </Container>
            </section>

            <section style={{
                height: "100%",
                color: "black",
                padding: "80px 0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Container style={{height: "100%"}}>
                    <Grid.Container gap={2} justify={"center"}>

                        <Grid xs={12} justify={"center"}>
                            <p style={{
                                opacity: 1,
                                fontSize: theme.fontSizes.xl4.computedValue,
                                fontWeight: theme.fontWeights.bold.computedValue,
                                textAlign: "center",
                                textTransform: "uppercase",
                                color: theme.colors.text.computedValue,
                                letterSpacing: theme.letterSpacings.normal.computedValue
                            }}>
                                REAL ESTATE WITHOUT BANKS
                            </p>
                        </Grid>

                        <AttributeGridItem
                            image={"🦾"}
                            title={"Programmable"}
                            description={
                                "Fullstak is a platform composed of trustless programs that " +
                                "enable frictionless capital coordination, 24/7."
                            }
                        />

                        <Grid xs={0} lg={1}/>

                        <AttributeGridItem
                            image={"🙌"}
                            title={"Frictionless"}
                            description={
                                "Finance and invest in real estate on your terms, without " +
                                "traditional institutions and intermediaries."
                            }
                        />

                        <Grid xs={0} lg={1}/>

                        <AttributeGridItem
                            image={"🤝"}
                            title={"Compliant"}
                            description={
                                "Embracing compliance and privacy in web3 to create " +
                                "lasting value and reliable innovation."
                            }
                        />

                    </Grid.Container>
                </Container>
            </section>

            <section style={{
                height: "600px",
                backgroundImage: "url(" + require("src/assets/particles_background.png") + ")",
                backgroundPosition: "left",
                backgroundSize: "cover",
            }}>
                <Container style={{height: "100%"}}>
                    <div style={{
                        height: "100%",
                        maxWidth: "350px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        color: "black"
                    }}>
                        <p style={{
                            opacity: 1,
                            fontSize: theme.fontSizes.xl4.computedValue,
                            fontWeight: theme.fontWeights.bold.computedValue,
                            lineHeight: theme.lineHeights.sm.computedValue,
                            letterSpacing: theme.letterSpacings.normal.computedValue,
                            textTransform: "uppercase"
                        }}>
                            DEFI MEETS<br/>
                            REAL ESTATE
                        </p>
                        <p style={{
                            fontSize: theme.fontSizes.sm.computedValue,
                            fontFamily: theme.fonts.mono.computedValue
                        }}>
                            Fullstak is your opportunity to generate yield on cryptoassets from
                            direct investments in real-world real estate.
                        </p>
                        <p style={{
                            fontSize: theme.fontSizes.xl2.computedValue,
                            fontWeight: theme.fontWeights.bold.computedValue
                        }}>
                            Learn More
                        </p>
                    </div>
                </Container>
            </section>

            <section style={{height: "600px", background: theme.colors.purple200.computedValue}}>
                <Container display={"flex"}
                           justify={"center"}
                           alignContent={"center"}
                           style={{height: "100%"}}
                >
                    <p style={{
                        fontSize: theme.fontSizes.xl4.computedValue,
                        fontWeight: theme.fontWeights.bold.computedValue,
                        background: theme.colors.purple100.computedValue,
                        letterSpacing: theme.letterSpacings.normal.computedValue,
                        padding: "10px 20px",
                        textAlign: "center"
                    }}>
                        DEVELOPER RESOURCES
                    </p>
                    <Grid.Container justify={"center"} gap={2}>
                        <Grid>
                            <Button style={{
                                width: "300px",
                                height: "100px",
                                borderRadius: "0px",
                                border: "1px solid #BE00FF",
                                background: "none",
                                fontWeight: theme.fontWeights.bold.computedValue,
                                fontSize: theme.fontSizes.sm.computedValue,
                            }}>
                                Coming Soon
                            </Button>
                        </Grid>
                    </Grid.Container>
                </Container>
            </section>

            <section style={{background: theme.colors.purple100.computedValue, padding: "20px 0"}}>
                <Container>
                    <Grid.Container>
                        <Grid xs={6} sm={3} alignItems={"center"}>
                            <img
                                src={require("src/assets/brand/fullstak_logo_white.png")}
                                height="40px"
                                width="auto"
                                alt="Tokr logo"
                            />
                        </Grid>
                        <Grid xs={0} sm={6} justify={"center"} alignItems={"center"}>
                            <p style={{
                                fontSize: theme.fontSizes.md.computedValue,
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
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <a href="https://discord.gg/nCGXWpFahv" target="_blank" rel="noreferrer">
                                    <FaDiscord style={{height: 33, width: 33, color: "white"}}/>
                                </a>
                                <Spacer x={1}/>
                                <a href="https://twitter.com/tokrlabs" target="_blank" rel="noreferrer">
                                    <FaTwitter style={{height: 30, width: 30, color: "white"}}/>
                                </a>
                            </div>
                        </Grid>
                    </Grid.Container>

                    <Spacer y={1}/>

                    <p style={{
                        fontSize: theme.fontSizes.xs.computedValue,
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
