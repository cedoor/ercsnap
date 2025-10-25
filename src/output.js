import fs from "fs";
import path from "path";

export function writeJSON(addresses, results, outputPath) {
  const holders = [];
  for (const addr of addresses) {
    const bal = results.get(addr) || 0n;
    if (bal !== 0n) {
      holders.push({
        address: addr,
        balance: bal.toString(), // Convert BigInt to string
      });
    }
  }

  const data = {
    totalHolders: holders.length,
    holders: holders,
  };

  const fullPath = path.resolve(process.cwd(), outputPath);
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
  console.log(`Wrote ${holders.length} holders to ${fullPath}`);
}
