# PRD: LockSave — Stellar Savings Goal Tracker

## 1. Problem
People struggle to save toward specific goals because funds stay liquid and easy to spend. There's no simple, trustless way to "lock" savings toward a target amount or date on Stellar — you either trust a custodian or trust yourself, and self-trust often fails.

## 2. Goal
Build a Soroban smart contract + web app that lets a user lock stablecoin (USDC) toward a savings goal. Funds are only withdrawable once the target amount is reached or the deadline passes — enforced by the contract, not a promise.

## 3. Target users
- Individuals saving for a specific purchase or expense (laptop, rent, emergency fund)
- Communities running rotating/group savings that want on-chain enforcement instead of trust
- Developers looking for a reference example of a locked-funds Soroban pattern

## 4. Core user stories
1. As a user, I can connect my Freighter wallet and create a savings goal with a target amount and optional deadline.
2. As a user, I can deposit USDC toward my goal at any time.
3. As a user, I can see my progress (current amount vs. target, time remaining) in a simple dashboard.
4. As a user, I cannot withdraw funds until the goal is met or the deadline passes — the contract blocks it, not the UI.
5. As a user, once unlocked, I can withdraw my funds in one transaction.
6. As anyone, I can call a public function to check/flip a goal's unlock status once its deadline has passed (since contracts can't self-trigger on time).

## 5. Out of scope (v1)
- Multi-user / shared goals (group savings) — noted as a v2 idea
- Yield generation on locked funds
- Mobile app (web only for v1)
- Support for tokens other than USDC

## 6. Success metrics
- Contract deployed and functioning on Soroban testnet
- End-to-end flow (create → deposit → lock → unlock → withdraw) working in the UI
- Test coverage on all contract functions, including failure paths (early withdrawal attempt, double withdrawal, unauthorized calls)
- Public repo with clear docs, seeded issues, and external contributor activity

## 7. Stellar resources used
- **Soroban SDK (Rust)** — smart contract logic and state
- **Soroban CLI** — local build, test, and testnet deployment
- **Freighter wallet** — user authentication and transaction signing
- **stellar-sdk (JS)** — frontend contract calls and account queries
- **Soroban Testnet + Friendbot** — funded test accounts for development and demos
- **Stellar Laboratory** — manual testing/debugging of contract calls during development

## 8. Risks
- Deadline logic requires an external trigger call (Soroban contracts can't run on a timer) — needs a documented workaround (see Technical Spec).
- Token authorization (approve/transfer flow) is a common source of bugs — needs explicit test coverage.
- Getting genuine outside contributors on unfamiliar Soroban code may be slow — mitigated by clearly scoped, well-labeled starter issues.

## 9. Deliverables
- Soroban contract (Rust) with unit tests
- Web frontend (JS/Tailwind) with Freighter integration
- README, Technical Spec, Contributing guide
- Seeded GitHub issues (see ISSUES.md) for external contribution
