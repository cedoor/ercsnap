# Balances at Block N

Fast ERC-20 token balance snapshot tool using Transfer logs from Etherscan API.

## Quick Start

```bash
# Install and run with npx
npx ercsnap --token 0xTokenAddress --api-key YOUR_ETHERSCAN_API_KEY

# Or set environment variable
ETHERSCAN_API_KEY=your_api_key_here npx ercsnap --token 0xTokenAddress
```

## Usage

```bash
# Basic usage
npx ercsnap --token 0xTokenAddress [--api-key YOUR_KEY] [--out snapshot.json] [--chain-id 1]

# Example
npx ercsnap --token 0x0c93b616933b0cd03b201b29cd8a22681dd9e0d9 --api-key YOUR_KEY
```

## Parameters

| Parameter    | Type   | Default         | Description                                          |
| ------------ | ------ | --------------- | ---------------------------------------------------- |
| `--token`    | string | -               | ERC-20 token address (required)                      |
| `--api-key`  | string | -               | Etherscan API key (or set ETHERSCAN_API_KEY env var) |
| `--out`      | string | `snapshot.json` | Output JSON filename                                 |
| `--chain-id` | number | `1`             | Chain ID (1=Ethereum, 137=Polygon)                   |

## Output

```json
{
  "totalHolders": 2001,
  "holders": [
    {
      "address": "0x1234...5678",
      "balance": "1000000000000000000"
    }
  ]
}
```

## Features

- **Fast**: <10s for thousands of holders
- **Multi-chain**: Ethereum, Polygon, BSC, Optimism, Arbitrum etc
- **Logs-only**: No RPC calls needed for balance computation
- **Automatic**: Finds deployment block and retrieves all Transfer logs
- **JSON output**: Easy to parse and process

## Limitations

> [!WARNING]
> This script may not work with tokens that have too many holders due to Etherscan API rate limits and pagination constraints. For tokens with hundreds of thousands or millions of holders, consider using alternative methods or breaking the snapshot into smaller chunks.

## Development

```bash
npm run format  # Format code
npm install     # Install dependencies
```
