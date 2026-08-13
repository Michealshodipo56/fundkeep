# Savings Goals

A savings goal is the central object in FundKeep. It represents a named savings intention with a defined target, a deadline, and an on-chain balance of deposited USDC.

## Goal Fields

| Field | Type | Description |
|---|---|---|
| `owner` | `Address` | The Stellar address that created the goal and is the only address permitted to deposit and withdraw |
| `token` | `Address` | The SAC (Stellar Asset Contract) address of the token being saved — expected to be USDC |
| `target_amount` | `i128` | The total amount required before withdrawal is permitted via the target condition |
| `current_amount` | `i128` | The amount of token currently held by the contract for this goal |
| `deadline` | `u64` | A ledger timestamp; once the ledger time exceeds this value, `check_deadline` can unlock the goal |
| `unlocked` | `bool` | Whether the goal's funds are withdrawable — set to `true` when the target is reached or deadline passes |
| `withdrawn` | `bool` | Whether `withdraw` has already been called successfully; prevents double withdrawal |

Goals are stored in contract instance storage, keyed by a `u32` goal ID that increments with each new goal created.

## Goal Categories (Frontend)

The FundKeep dashboard organizes goals by category for display purposes. Categories are: `laptop`, `camera`, `travel`, and `other`. These are stored client-side and have no on-chain representation — the contract is not aware of category labels.
