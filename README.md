# FundKeep

Lock USDC toward a savings goal on Stellar. Funds are only withdrawable when your target is reached or your deadline passes — enforced on-chain by a Soroban smart contract, not a UI promise.

---

## What It Does

You create a savings goal with a target amount and a deadline. You deposit USDC into it. The contract holds the funds and blocks withdrawal until one of two things happens:

- Your cumulative deposits reach the target → goal unlocks automatically in the same transaction
- The deadline passes and `check_deadline` is called → goal unlocks

Once unlocked, you call `withdraw` and receive the full balance back to your wallet in a single transaction.

There is no penalty, no yield, no custodian. The lock is enforced by the contract.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, TypeScript, Tailwind CSS v4 |
| Wallet | Freighter (`@stellar/freighter-api`) |
| Animation | Framer Motion |
| Contract | Soroban (Rust, `soroban-sdk`) |
| Network | Stellar Testnet |

---

## Getting Started

### Prerequisites

- Node.js v18+
- Rust 1.74+ with `wasm32-unknown-unknown` target (for contract development)
- [Freighter](https://freighter.app) browser extension set to **Testnet**

### Install and Run

```bash
git clone https://github.com/your-org/fundkeep.git
cd fundkeep
npm install
cp .env.example .env.local  # fill in contract IDs — see Environment Variables below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app loads with seed data so you can explore the UI without a wallet connection.

---

## Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_CONTRACT_ID=           # deployed FundKeep Soroban contract address
NEXT_PUBLIC_USDC_CONTRACT_ID=      # testnet USDC SAC: CDLZFC3SYJYDVR72W5SCVNVV45XMCHZDBNDVLYZ2G7SFKNEPFBYSYTRU
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
```

---

## Contract

The Soroban contract exposes five functions:

| Function | Auth | Description |
|---|---|---|
| `create_goal(owner, token, target_amount, deadline)` | owner | Creates a new savings goal, returns `goal_id` |
| `deposit(goal_id, amount)` | owner | Deposits USDC; auto-unlocks if target is reached |
| `check_deadline(goal_id)` | none (public) | Unlocks goal if deadline has passed |
| `withdraw(goal_id)` | owner | Transfers full balance back to owner |
| `get_goal(goal_id)` | none (public) | Returns the full goal struct |

Soroban contracts have no internal timer. `check_deadline` must be called by an external transaction after the deadline passes — the FundKeep frontend does this automatically on page load for overdue goals.

---

## Building and Deploying the Contract

```bash
# Build
cargo build --target wasm32-unknown-unknown --release

# Deploy to testnet
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/fundkeep.wasm \
  --source <YOUR_SECRET_KEY> \
  --network testnet
```

Copy the output contract address into `NEXT_PUBLIC_CONTRACT_ID` in `.env.local`.

---

## Testing

**Contract unit tests (Rust):**

```bash
cargo test
```

Covers: goal creation, deposits under/over target, auto-unlock on target, deadline unlock, early withdrawal rejection, double withdrawal rejection, unauthorized access.

**Frontend:**

```bash
npm run lint
```

---

## Project Structure

```
fundkeep/
├── app/                  # Next.js app router pages
│   ├── dashboard/        # Goal dashboard
│   ├── goals/            # Goal detail view
│   ├── deposit/          # Deposit flow
│   ├── activity/         # Activity feed
│   └── settings/         # User settings
├── components/           # Shared UI components
├── lib/
│   ├── wallet-context.tsx # WalletProvider — goal state, deposits, withdrawals
│   └── freighter.ts       # Freighter connection helpers
├── docs/                 # Full GitBook documentation source
└── public/               # Static assets
```

---

## Contributing

Check [open issues](https://github.com/your-org/fundkeep/issues) for work labelled `good first issue`. A keeper script that auto-calls `check_deadline` on overdue goals is the most-wanted first contribution.

Branch naming: `feat/`, `fix/`, `docs/`, `test/`  
Commit format: `type(scope): description` (Conventional Commits)

Full contributing guide: [`docs/contributing/how-to-contribute.md`](docs/contributing/how-to-contribute.md)
