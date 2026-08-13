# Withdrawing Funds

Withdrawal is only available when a goal is in the **UNLOCKED** state. The contract enforces this — attempting to withdraw a LOCKED goal will cause the transaction to fail with `NotUnlocked`.

## When You Can Withdraw

A goal reaches UNLOCKED in two ways:
- Your deposited total hit the target amount (unlocked automatically within the deposit transaction).
- The deadline has passed and `check_deadline` was called on the goal.

See [Goal States](../concepts/goal-states.md) and [The Deadline Unlock Pattern](../concepts/deadline-unlock.md) for full detail.

## Steps

1. Open the goal on the dashboard. If it is UNLOCKED, the **Withdraw** button becomes active.
2. Click **Withdraw**. Review the amount — this withdraws the full `current_amount` in a single transaction.
3. Freighter prompts you to sign. The transaction calls `withdraw(goal_id)`.
4. USDC is transferred from the contract back to your wallet. The goal moves to **WITHDRAWN** state.

## One-Time Operation

Withdrawal happens exactly once per goal. After `withdraw` succeeds, the goal's `withdrawn` flag is permanently `true`. Any retry call to `withdraw` on the same goal will panic with `AlreadyWithdrawn`.

## Deadline-Triggered Goals

If your goal's deadline has passed but the target wasn't reached, the FundKeep frontend calls `check_deadline` automatically when you open the goal. Once that transaction confirms and sets `unlocked = true`, the Withdraw button becomes active. You can then withdraw however much you managed to save.
