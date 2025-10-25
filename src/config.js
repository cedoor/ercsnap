import dotenv from "dotenv";

dotenv.config();

export const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
export const ETHERSCAN_API_URL = "https://api.etherscan.io/v2/api";
export const DEFAULT_CHAIN_ID = 1; // Mainnet
