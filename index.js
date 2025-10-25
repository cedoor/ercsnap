#!/usr/bin/env node

import { parseArgs } from "./src/args.js";
import { getDeploymentBlock, getTransferLogs } from "./src/etherscan.js";
import { computeBalancesFromLogs } from "./src/logs.js";
import { writeJSON } from "./src/output.js";

async function main() {
  const args = parseArgs();

  if (!args.token) throw new Error("Missing --token");
  if (!args.apiKey)
    throw new Error(
      "Missing API key. Provide --apiKey or set ETHERSCAN_API_KEY environment variable"
    );

  console.log(`Token: ${args.token}`);
  console.log(`Chain ID: ${args.chainId}`);

  // Get deployment block
  const deploymentBlock = await getDeploymentBlock(
    args.token,
    args.chainId,
    args.apiKey
  );
  console.log(`Deployment block: ${deploymentBlock}`);

  // Get transfer logs (toBlock defaults to "latest")
  console.log("Getting transfer logs...");
  const logs = await getTransferLogs(
    args.token,
    deploymentBlock,
    args.chainId,
    args.apiKey
  );
  console.log(`Found ${logs.length} transfer logs`);

  // Compute balances from logs
  console.log("Computing balances from transfer logs...");
  const balances = computeBalancesFromLogs(logs);
  const addresses = Array.from(balances.keys());
  console.log(`Found ${addresses.length} holders with non-zero balances`);

  if (addresses.length === 0) {
    console.log("No holders found");
    writeJSON([], new Map(), args.out);
    return;
  }

  // Write JSON
  writeJSON(addresses, balances, args.out);
}

main().catch(console.error);
