# Reading the Activity Feed

The **Activity** page in FundKeep shows a chronological log of every action taken across your goals: creates, deposits, unlocks, and withdrawals.

## Activity Entry Types

| Type | Description |
|---|---|
| `create` | A new goal was created |
| `deposit` | USDC was deposited to a goal |
| `unlock` | A goal reached its target and was unlocked (recorded at deposit time) |
| `withdraw` | Funds were withdrawn from a goal |

Each entry records:
- The goal name it relates to
- The amount involved (where applicable)
- A timestamp

## Storage

Activity entries are stored in **browser local storage** under the key `fk_activity`. They are not stored on-chain. If you clear your browser storage or use a different browser, the activity history will not be present. On-chain transaction history is always recoverable via a Stellar blockchain explorer using your wallet address.

## Interpreting the Feed

The feed is sorted newest-first. A deposit entry and an unlock entry appearing in close sequence on the same goal means that deposit crossed the target threshold and the unlock was triggered in the same transaction.
