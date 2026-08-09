# LockSave — Stellar Savings Goal Tracker

A Soroban smart contract + web app for locking USDC toward a savings goal on Stellar. Funds are only withdrawable once the target amount is reached or the deadline passes — enforced on-chain, not by trust.

Built on Stellar's Soroban smart contract platform as a reference example of the locked-funds contract pattern, and as an active open-source project welcoming outside contributors.

## Docs
- [`PRD.md`](./PRD.md) — what this is and why
- [`TECHNICAL_SPEC.md`](./TECHNICAL_SPEC.md) — contract design, architecture, security notes
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — how to set up and contribute
- [`ISSUES.md`](./ISSUES.md) — seed issue list for contributors

## Quickstart
```bash
# contract
cd contract && soroban contract build && cargo test

# frontend
cd frontend && npm install && npm run dev
```

Requires a [Freighter](https://www.freighter.app/) wallet and a testnet account funded via [Friendbot](https://friendbot.stellar.org).

## Status
🚧 Active development — core contract functions in progress. See [Issues](../../issues) for open work, including items suitable for first-time contributors.

## Built with
Soroban SDK (Rust) · stellar-sdk (JS) · Freighter · Tailwind CSS
