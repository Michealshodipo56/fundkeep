# The Deadline Unlock Pattern

Soroban contracts do not have an internal scheduler. They only execute code in direct response to an incoming transaction. A contract cannot watch a clock and trigger itself — something external has to call it.

This is genuinely a constraint worth understanding before building on Soroban. It means that a goal whose deadline has passed is not automatically unlocked. The `unlocked` flag stays `false` until someone submits a transaction calling `check_deadline(goal_id)`.

## Who Can Call `check_deadline`

Anyone. The function has no auth requirement — it doesn't move funds, it just reads the current ledger timestamp and compares it to `goal.deadline`. If the deadline has passed, it sets `unlocked = true`. If it hasn't, it's a no-op.

Making it public means:

- The FundKeep frontend can call it automatically when a user loads a goal page after the deadline.
- A third party — a friend, a keeper bot — can trigger it without needing access to the owner's wallet.
- There's no permission gate that could accidentally block a legitimate unlock.

## Practical Implication

If you set a deadline of 2026-09-15 and don't open the app for six months, your goal is not auto-unlocked on that date. It will be unlocked the next time someone calls `check_deadline` on it. In practice the FundKeep frontend handles this for you on page load, but it's worth knowing the underlying mechanism, especially for anyone building tooling against the contract directly.

A keeper script is listed in the GitHub issues as a `good first issue` for contributors who want to build an automated unlock trigger.
