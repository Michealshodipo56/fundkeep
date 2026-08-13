# Depositing to a Goal

Deposits add USDC to a goal and move the progress bar forward. Every deposit is an on-chain transaction transferring USDC from your wallet to the FundKeep contract.

## Steps

1. Open the goal you want to deposit to from the dashboard.
2. Click **Deposit**.
3. Enter an amount in USDC. The form shows how much is remaining to the target.
4. Click **Confirm Deposit**. Freighter will prompt you to sign the transaction.
5. The transaction calls `deposit(goal_id, amount)` on the contract. Your wallet balance decreases by the deposit amount; the goal's saved total increases.

## Auto-Unlock on Target Reached

If your deposit causes `current_amount` to reach or exceed `target_amount`, the contract sets `unlocked = true` in the same transaction. There is no separate unlock step — the deposit itself is the unlock trigger. The dashboard will immediately reflect the goal as **UNLOCKED** once the transaction confirms.

## Partial Deposits

You can deposit any amount up to the remaining target in a single transaction. You can also deposit multiple times across multiple transactions — each one accumulates toward the total. The contract checks the target condition after each deposit.
