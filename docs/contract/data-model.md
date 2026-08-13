# Data Model

The contract stores one primary struct per goal:

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

Goals are stored in **contract instance storage** keyed by a `u32` goal ID. The contract maintains a counter that increments by one each time `create_goal` is called, so goal IDs are sequential and never reused.

## Field Notes

- `owner` — The only address that can call `deposit` and `withdraw` on a given goal (in v1). Auth is enforced via `owner.require_auth()`.
- `token` — Set at goal creation time. There is no way to change the token after creation. In practice this is always the USDC SAC address on testnet.
- `target_amount` and `current_amount` — Both `i128`. USDC has 7 decimal places on Stellar, so a value of `10_000_000` represents 1.0 USDC.
- `deadline` — A Unix-style ledger timestamp in seconds. Compared against Stellar's `env.ledger().timestamp()` at runtime.
- `unlocked` — Once set to `true`, it stays `true`. There is no lock-again mechanism.
- `withdrawn` — Once set to `true`, `withdraw` will panic on any subsequent call.
