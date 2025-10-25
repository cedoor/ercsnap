import { ETHERSCAN_API_URL } from "./config.js";

export async function getDeploymentBlock(token, chainId, apiKey) {
  const url = `${ETHERSCAN_API_URL}?module=contract&action=getcontractcreation&contractaddresses=${token}&chainid=${chainId}&apikey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.status !== "1" || !data.result?.[0]) {
    throw new Error(`Deployment block not found: ${data.message}`);
  }

  return BigInt(data.result[0].blockNumber);
}

export async function getTransferLogs(token, fromBlock, chainId, apiKey) {
  const allLogs = [];
  let page = 1;

  while (true) {
    const url = `${ETHERSCAN_API_URL}?module=logs&action=getLogs&address=${token}&fromBlock=${fromBlock}&toBlock=latest&topic0=0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef&page=${page}&offset=10000&chainid=${chainId}&apikey=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "1") break;
    if (!data.result?.length) break;

    allLogs.push(...data.result);
    if (data.result.length < 10000) break;

    page++;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return allLogs;
}
