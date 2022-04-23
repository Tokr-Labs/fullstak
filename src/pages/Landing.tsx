import "../index.css"
import {sendAmplitudeData} from "../utils/amplitude";
import tokrLogo from "src/assets/tokr_dark-cropped.svg"
import gitbookIcon from "src/assets/icons/icons-gitbook_export.svg"
import githubIcon from "src/assets/icons/icons-github_export.svg"
import twitterIcon from "src/assets/icons/icons-twitter_export.svg"

const Landing = () => {
    return (
        <div className={"landing_container"}>
            <div className={"landing_content"}>
                <img id={"tokr_logo"} src={tokrLogo} alt={"Tokr Logo"}/>
                <div>
                    <h2>DeFi for Real Estate</h2>
                    <p>
                        Invest with crypto and earn yield from stable, uncorrelated real estate
                        assets while providing property owners with capital and liquidity.
                    </p>
                </div>
                <div className={"logos"}>

                        <a href="https://tokr.gitbook.io/tokr-main-docs/"
                           target="_blank"
                           rel="noreferrer"
                           onClick={() => sendAmplitudeData("click_gitbook", {page_name: "Landing"})}
                        >
                            <img src={gitbookIcon} alt="Tokr Gitbook"/>
                        </a>

                        <a href="https://github.com/TOKR-labs"
                           target="_blank"
                           rel="noreferrer"
                           onClick={() => sendAmplitudeData("click_github", {page_name: "Landing"})}
                        >
                            <img src={githubIcon} alt="Tokr Gitbook"/>
                        </a>

                        <a href="https://twitter.com/tokrfi"
                           target="_blank"
                           rel="noreferrer"
                           onClick={() => sendAmplitudeData("click_twitter", {page_name: "Landing"})}
                        >
                            <img src={twitterIcon} alt="Tokr Gitbook"/>
                        </a>

                </div>
            </div>
            <div className={"disclaimers"}>
                Tokr Labs, Roost Enterprises Inc., Rhove and affiliates are considering
                an offering of securities exempt from registration under the Securities
                Act of 1933 but has not determined a specific exemption from registration
                the issuer intends to rely on for the subsequent offer and sale of the
                securities. No money or other consideration is being solicited at this
                time and any information contained herein is subject to modification.
                Further, if any investment is sent in response to this information, such
                investments will not be accepted and shall be returned to the funding
                party. No offer to buy the securities shall be accepted and no funds can
                be received until the Company determines the exemption under which the
                offering is intended to be conducted and, where applicable, the filing,
                disclosure, or qualification requirements of such exemption are met.
                Please do not reach out to us seeking to invest. We do not have an
                offering for you to invest in at this time. Any person's indication of
                interest to invest shall impose no obligation or commitment of any kind.
            </div>
        </div>
    );
};

export default Landing;