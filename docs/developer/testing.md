# Testing

## Contract Unit Tests

FundKeep's Soroban contract has a unit test suite written in Rust using `soroban-sdk`'s built-in test utilities. All tests run in a local, in-process Soroban environment — no network connection required.

Run the test suite:

```bash
cargo test
```

### What Is Covered

| Test Scenario | Expected Result |
|---|---|
| `create_goal` with valid params | Goal created, returns `goal_id = 0` on first call |
| `create_goal` with `target_amount = 0` | Panics with `InvalidAmount` |
| `create_goal` with past deadline | Panics with `InvalidDeadline` |
| `deposit` under target | `current_amount` increases, `unlocked` remains `false` |
| `deposit` that crosses target | `current_amount` increases, `unlocked` set to `true` in same call |
| `withdraw` while locked | Panics with `NotUnlocked` |
| `withdraw` after unlock by target | Succeeds, transfers full balance, sets `withdrawn = true` |
| Second `withdraw` on same goal | Panics with `AlreadyWithdrawn` |
| `check_deadline` before deadline | No-op, `unlocked` stays `false` |
| `check_deadline` after deadline | `unlocked` set to `true` |
| `withdraw` after deadline unlock | Succeeds |
| `deposit` from non-owner | Panics with `Unauthorized` |
| `withdraw` from non-owner | Panics with `Unauthorized` |

### Test Structure

Tests live in `src/test.rs`. Each test creates a fresh contract environment, registers a mock USDC token contract, and runs through a full or partial goal lifecycle. The mock token contract allows the test to verify token balances without hitting an actual network.

## Frontend Tests

Run frontend tests with:

```bash
npm test
```

The frontend test suite covers:
- `WalletProvider` state transitions (create, deposit, withdraw, checkDeadlines)
- Derived stats calculations (`totalSaved`, `overallPercent`, etc.)
- Local storage persistence and hydration

## Manual End-to-End Testing

For a full integration test against the live Soroban Testnet:

1. Fund a testnet account via [Friendbot](https://friendbot.stellar.org).
2. Obtain testnet USDC by minting from the testnet USDC faucet or using Stellar Laboratory.
3. Deploy your local contract build using `soroban contract deploy` (see [Local Setup](local-setup.md)).
4. Use Stellar Laboratory or the Soroban CLI to call each function in sequence and verify the returned state matches expectations.
