# Technical Spec: LockSave

## 1. Architecture

```
[Freighter Wallet] <--sign--> [Frontend: JS/Tailwind + stellar-sdk]
                                        |
                                        v
                        [Soroban Contract: LockSave (Rust)]
                                        |
                                        v
                          [USDC token contract on Soroban]
```

## 2. Contract data model

```rust
#[contracttype]
pub struct SavingsGoal {
    pub owner: Address,
    pub token: Address,      // USDC contract address
    pub target_amount: i128,
    pub current_amount: i128,
    pub deadline: u64,       // ledger timestamp
    pub unlocked: bool,
    pub withdrawn: bool,
}
```

Goals are stored in contract instance storage keyed by a `u32` goal_id (incrementing counter).

## 3. Contract functions

| Function | Description | Auth required |
|---|---|---|
| `create_goal(owner, token, target_amount, deadline) -> u32` | Creates a new goal, returns goal_id | owner |
| `deposit(goal_id, amount)` | Transfers `amount` of token from caller to contract, adds to `current_amount`. Auto-checks if target reached and sets `unlocked = true` | caller (must be owner in v1) |
| `check_deadline(goal_id)` | Public — anyone can call. If `ledger_timestamp >= deadline`, sets `unlocked = true` | none (public trigger) |
| `withdraw(goal_id)` | Transfers `current_amount` back to owner. Fails if `!unlocked` or already `withdrawn` | owner |
| `get_goal(goal_id) -> SavingsGoal` | Read-only view | none |

## 4. Why `check_deadline` is public
Soroban contracts have no internal clock/cron — they only execute in response to a transaction. To unlock on a deadline, *someone* has to submit a transaction after that time. Making `check_deadline` callable by anyone (not just the owner) means the frontend can auto-trigger it, or any third party (a keeper bot, a friend) can unlock it on the owner's behalf. This is a common Soroban pattern worth documenting clearly in the README — it's also a good "good first issue" to build a small keeper script for.

## 5. Security considerations
- **Reauthorization**: every deposit/withdraw must call `owner.require_auth()` — do not trust `msg.sender`-style patterns from EVM chains.
- **No early withdrawal path in v1**: keeps the contract logic simple and the guarantee airtight. An early-withdrawal-with-penalty feature is a good v2 issue.
- **Double withdrawal**: `withdrawn` flag must be checked and set atomically within `withdraw()`.
- **Integer overflow**: use checked arithmetic (`checked_add`) when incrementing `current_amount`.
- **Token transfer failures**: handle and propagate errors from the token contract's `transfer` call rather than assuming success.

## 6. Testing plan
- Unit tests (Rust, using `soroban-sdk`'s test utilities) for:
  - Goal creation with valid/invalid params
  - Deposit under target (goal stays locked)
  - Deposit that crosses target (goal auto-unlocks)
  - Withdraw attempt while locked (must fail)
  - Withdraw after unlock (must succeed, sets `withdrawn`)
  - Double withdraw attempt (must fail)
  - `check_deadline` before/after deadline
- Manual end-to-end test on testnet using Stellar Laboratory + Friendbot-funded accounts

## 7. Frontend scope (v1)
- Connect Freighter
- Create goal form (target amount, deadline picker)
- Goal dashboard: progress bar, deadline countdown, deposit form
- Withdraw button (disabled/hidden until `unlocked`)

## 8. Stack summary
- **Contract**: Rust + `soroban-sdk`
- **Frontend**: HTML/Tailwind/JS + `@stellar/stellar-sdk` + Freighter API
- **Network**: Soroban Testnet
