export function extractAddresses(logs) {
  const addresses = new Set();

  for (const log of logs) {
    if (log.topics?.length >= 3) {
      const from = "0x" + log.topics[1].slice(26);
      const to = "0x" + log.topics[2].slice(26);

      if (from !== "0x0000000000000000000000000000000000000000")
        addresses.add(from);
      if (to !== "0x0000000000000000000000000000000000000000")
        addresses.add(to);
    }
  }

  return Array.from(addresses);
}

export function computeBalancesFromLogs(logs) {
  const balances = new Map();

  // Sort logs by block number to ensure chronological order.
  const sortedLogs = logs.sort(
    (a, b) => parseInt(a.blockNumber, 16) - parseInt(b.blockNumber, 16)
  );

  for (const log of sortedLogs) {
    if (!log.topics || log.topics.length < 3) continue;

    // Extract from and to addresses from Transfer event topics.
    const from = "0x" + log.topics[1].slice(26);
    const to = "0x" + log.topics[2].slice(26);

    // ERC-20 Transfer has value as uint256 ABI-encoded (0x + 64 hex).
    const value = BigInt(log.data);

    if (from !== "0x0000000000000000000000000000000000000000") {
      balances.set(from, (balances.get(from) ?? 0n) - value);
    }
    if (to !== "0x0000000000000000000000000000000000000000") {
      balances.set(to, (balances.get(to) ?? 0n) + value);
    }
  }

  // Check if there are negative balances (may be due to incomplete logs or non-standard tokens).
  for (const [addr, bal] of balances) {
    if (bal < 0n) {
      console.warn(`Unexpected negative balance for ${addr}: ${bal}`);
    }
  }

  return balances;
}
