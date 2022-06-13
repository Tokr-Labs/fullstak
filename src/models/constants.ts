import {PublicKey} from "@solana/web3.js";

// @TODO: Move this to the client side env
export const LOCALNET = "http://localhost:8899"

export const USDC_LOCALNET = new PublicKey("GS522NVc8Gro9H5Tq6uGZgsJqCb8WCk1A1Y9eyhfwmQ8")
export const USDC_DEVNET = new PublicKey("DjrL2ATiHzTg5Rg2EFD24gbV3vLBkeX9Hw29u1KyF15r")
export const USDC_MAINNET = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")

export const GOVERNANCE_PROGRAM_ID = new PublicKey("CCzEwDHqNqq4KL4srnRKQeQ7P9Aa1uoAQmkz1kWFc2rd");
export const IDENTITY_VERIFICATION_PROGRAM_ID = new PublicKey("5WJNeGKQQJMaTCPgtXhmsiEK4bA6dLT94smLFmTU8Gh9");
export const IDENTITY_VERIFICATION_INITIAL_AUTHORITY = new PublicKey("ANDKyhwCrWMagosngR44NuhGwHEtGD8r2ML3u4VkD14L");
export const TOKR_SERVICE_ENDPOINT_DEVNET = "https://tokr-services.herokuapp.com"

// @TODO: move to a different constants file?
export const ROUTE_MARKETS = "/markets";
export const ROUTE_MARKETS_EQUITY = `${ROUTE_MARKETS}/equity`;
export const ROUTE_MARKETS_DEBT = `${ROUTE_MARKETS}/debt`;