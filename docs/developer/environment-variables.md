# Environment Variables

Create a `.env.local` file in the project root. All `NEXT_PUBLIC_` variables are exposed to the browser; do not put secrets in them.

| Variable | Required | Description | Example |
|---|---|---|---|
| `NEXT_PUBLIC_CONTRACT_ID` | Yes | The deployed FundKeep Soroban contract address | `CXXXXX...` |
| `NEXT_PUBLIC_USDC_CONTRACT_ID` | Yes | The USDC SAC (Stellar Asset Contract) address on testnet | `CDLZFC3SYJYDVR72W5SCVNVV45XMCHZDBNDVLYZ2G7SFKNEPFBYSYTRU` |
| `NEXT_PUBLIC_STELLAR_NETWORK` | Yes | `testnet` or `mainnet` — controls which RPC and passphrase the SDK uses | `testnet` |
| `NEXT_PUBLIC_SOROBAN_RPC_URL` | No | Override the default Soroban RPC endpoint | `https://soroban-testnet.stellar.org` |
| `NEXTAUTH_SECRET` | Yes (if auth enabled) | Secret for NextAuth session signing | A random string |
| `NEXTAUTH_URL` | Yes (if auth enabled) | The canonical URL of your deployment | `http://localhost:3000` |

The testnet USDC SAC address for the Stellar testnet is `CDLZFC3SYJYDVR72W5SCVNVV45XMCHZDBNDVLYZ2G7SFKNEPFBYSYTRU`. Do not use the mainnet USDC address on testnet — transactions will fail.
