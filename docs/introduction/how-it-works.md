# How It Works

1. **Connect your Freighter wallet** to the FundKeep web app — testnet or mainnet, your choice. The wallet is used to sign all transactions; FundKeep never holds private keys.

2. **Create a savings goal.** Give it a title, pick a category (laptop, camera, travel, or other), set a target USDC amount, and pick a deadline date. Calling `create_goal` on the Soroban contract stores the goal on-chain, keyed by an auto-incrementing `goal_id`.

3. **Deposit USDC toward the goal.** Each deposit calls `deposit(goal_id, amount)` which transfers USDC from your wallet to the contract. The contract adds the amount to `current_amount` and immediately checks whether you've hit the target. If `current_amount >= target_amount`, the goal's `unlocked` flag is set to `true` in the same transaction — no separate unlock step needed.

4. **Track progress on the dashboard.** The dashboard shows each goal's progress bar, time remaining to the deadline, and current saved vs. target amounts.

5. **Unlock via deadline if the target isn't reached.** Soroban contracts have no internal timer — they only run when a transaction calls them. So unlocking by deadline requires someone to call `check_deadline(goal_id)` after the deadline has passed. The FundKeep frontend attempts this automatically when you load a goal past its deadline. The function is public, so anyone — a friend, a keeper script, the frontend — can trigger it on your behalf.

6. **Withdraw.** Once the goal is `UNLOCKED` (by either condition above), you call `withdraw(goal_id)`. The contract transfers the full `current_amount` back to your wallet and marks the goal as `withdrawn`. Withdrawal can only happen once.

```
create_goal
     |
     v
deposit (repeat)
     |
     +---> current_amount >= target? → unlocked = true
     |
deadline passes → check_deadline() → unlocked = true
     |
     v
withdraw (once, owner only)
```
