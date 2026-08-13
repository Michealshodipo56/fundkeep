# Security Considerations

## Auth Model

Every function that moves funds or modifies goal state requires `owner.require_auth()`. This is not the same as EVM's `msg.sender` pattern — Soroban auth is explicit and verified by the network. Do not assume the transaction submitter is the authorized address without calling `require_auth()`.

## No Early Withdrawal in v1

There is no penalty-based early exit, partial withdrawal, or override mechanism. If the goal is LOCKED, `withdraw` panics. This simplicity is intentional — it keeps the guarantee airtight and leaves no edge case where a determined user could work around the lock through the contract interface.

An early-withdrawal-with-penalty feature is a reasonable v2 addition and is listed as a GitHub issue.

## Double Withdrawal Prevention

The `withdrawn` flag is checked at the start of `withdraw` and set before the token transfer completes. Because Soroban transactions are atomic, there is no window where a second withdrawal could slip through between the check and the flag being set. Still, the flag is persisted explicitly rather than relying on `current_amount == 0` as a guard, which is the more explicit and auditable approach.

## Integer Overflow

`current_amount` is incremented using checked arithmetic (`checked_add`) to avoid overflow when very large amounts are deposited. Token amounts in Soroban are `i128`, which is large enough for any realistic USDC balance, but the checked arithmetic is present as a contract correctness guarantee.

## Token Transfer Failures

Errors returned by the USDC token contract's `transfer` call are propagated and cause the entire transaction to fail. The contract does not swallow token errors or assume success.
