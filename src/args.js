import { DEFAULT_CHAIN_ID, ETHERSCAN_API_KEY } from "./config.js";

export function parseArgs() {
  const args = {};
  for (let i = 2; i < process.argv.length; i += 2) {
    const key = process.argv[i]?.replace(/^--/, "");
    const value = process.argv[i + 1];
    if (key && value) args[key] = value;
  }
  return {
    token: args.token,
    out: args.out || "snapshot.json",
    chainId: Number(args["chain-id"] || args.chainId || DEFAULT_CHAIN_ID),
    apiKey: args["api-key"] || args.apiKey || ETHERSCAN_API_KEY,
  };
}
