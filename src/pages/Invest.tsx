import React from "react";
import {Navbar} from "../components/Navbar";
import {Pools} from "../components/Pools";
import {Content} from "../components/Content";
import {Footer} from "../components/Footer";

export const Invest = () => {
    return (
        <>
            <Navbar/>
            <hr/>
            <Pools/>
            <hr/>
            <Content/>
            <Footer/>
        </>
    )
}
