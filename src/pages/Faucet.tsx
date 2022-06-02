import "../index.css"
import {Button, Card, Container, Input, Link, Loading, Row, Spacer, Text} from "@nextui-org/react";
import React, {useMemo, useState} from "react";
import {FaucetService} from "../services/faucet-service";
import {FAUCET_SERVICE_ENDPOINT_DEVNET} from "../models/constants";
import {useWallet} from "@solana/wallet-adapter-react";
import {Navbar} from "../components/Navbar";
import {PublicKey} from "@solana/web3.js";

const Faucet = () => {

    const [publicKey, setPublicKey] = useState<string>("");
    const [amount, setAmount] = useState<number>(10000);
    const [pkValid, setPkValid] = useState<boolean>(true);
    const [amountValid, setAmountValid] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>()
    const [transactionSignature, setTransactionSignature] = useState<string>();

    const faucetService = useMemo(() => {

        // @TODO: update for different environments
        return new FaucetService(FAUCET_SERVICE_ENDPOINT_DEVNET)

    }, []);

    const requestAirdrop = () => {

        validateForm()

        if (!pkValid || !amountValid) {
            return
        }

        setTransactionSignature(undefined)
        setIsSubmitting(true)

        faucetService.request(new PublicKey(publicKey), amount)
            .then(result => {
                setErrorMessage(undefined)
                setTransactionSignature(result)
            })
            .catch(error => {
                setErrorMessage(error.message)
            })
            .finally(() => {
                setIsSubmitting(false)
            })

    }

    const validateForm = () => {

        try {
            new PublicKey(publicKey);
            setPkValid(true)
        } catch (e) {
            setPkValid(false)
        }

        if (amount > 0 && amount <= 1000000) {
            setAmountValid(true)
        } else {
            setAmountValid(false)
        }

    }

    return (

        <Container style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column"
        }}>

            <div style={{
                background: "linear-gradient(180deg, rgba(12,2,35,1) 0%, rgba(28,5,73,1) 100%)",
                height: "100%",
                zIndex: -1,
                width: "100%",
                top: 0,
                left: 0,
                position: "absolute"
            }}/>

            <Spacer y={4}/>

            <Row justify="center" align="center">
                <Text h1 color="white">USDC <sup style={{fontSize: "0.5em"}}>1</sup> Devnet Faucet</Text>
            </Row>

            <Spacer y={2}/>

            <Row justify="center" align="center">
                <Card css={{mw: "600px"}}>

                    <div style={{fontFamily: "Montserrat, sans-serif", color: "white"}}>

                        <Spacer y={1}/>

                        <Input css={{w: "100%"}}
                               animated={false}
                               clearable
                               bordered
                               label="Solana Address"
                               status={pkValid ? "default" : "error"}
                               onChange={event => setPublicKey(event.target.value)}/>

                        <Spacer y={1}/>


                        <Input css={{w: "100%"}}
                               animated={false}
                               bordered
                               label="Amount"
                               type="number"
                               initialValue="10000"
                               status={amountValid ? "default" : "error"}
                               onChange={event => setAmount(parseInt(event.target.value))}/>

                        <Spacer y={2}/>

                        <Row justify="center" align="center">

                            <Button color="primary"
                                    style={{
                                        width: "200px",
                                        borderRadius: 19,
                                        color: "white",
                                        fontWeight: "bold"
                                    }}
                                    disabled={isSubmitting}
                                    onClick={requestAirdrop}>

                                {
                                    isSubmitting ?
                                        <Loading type="default" color="primary" size="sm"/> :
                                        "REQUEST AIRDROP"
                                }

                            </Button>

                        </Row>

                        <Spacer y={1}/>

                        <Row justify="center" align="center">

                            {
                                errorMessage &&
                                <Text small color="error">
                                    errorMessage
                                </Text>
                            }

                            {
                                transactionSignature &&

                                <>

                                    <Text small color="black">
                                        Success!
                                    </Text>
                                    <Spacer x={0.25}/>
                                    <Text small>
                                        <Link color="primary"
                                              href={`https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`}
                                              target="_blank"
                                              icon>

                                            Your USDC* will arrive shortly.

                                        </Link>
                                    </Text>

                                </>
                            }

                        </Row>

                        <Spacer y={3}/>

                    </div>


                </Card>
            </Row>

            <Spacer y={2}/>

            <Row justify="center" align="center">

                <Text small
                      css={{mw: "600px"}}
                      color="white">

                    <sup>1</sup> This faucet airdrops Tokr's devnet version of USDC to the account specified. This
                    shouldn't be
                    confused with Circle's official devnet version of USDC.

                </Text>

            </Row>

        </Container>

    )
};

export default Faucet;