# Seed Issues for GitHub / Drips

Post these individually as GitHub issues once the initial contract skeleton and repo scaffold are pushed. Keep the core `create_goal`/`deposit`/`withdraw` happy path built by you — seed everything below as open issues so external contributors have real, scoped work.

## good first issue
1. **Add `get_goal` read-only view function** — return a `SavingsGoal` struct for a given `goal_id`, no auth required.
2. **Write unit test: double withdraw attempt fails** — confirm `withdraw()` cannot be called twice on the same goal.
3. **Add input validation to `create_goal`** — reject `target_amount <= 0` and `deadline` in the past.
4. **Write README quickstart section** — step-by-step for a new dev to build + test the contract locally.
5. **Add progress bar component to frontend** — visual current/target ratio on the goal dashboard.

## help wanted
6. **Build a `check_deadline` keeper script** — small Node/Go script that periodically calls `check_deadline` for all open goals so users don't have to trigger it manually. Ties directly into the "public trigger" pattern documented in TECHNICAL_SPEC.md.
7. **Add deadline countdown UI** — live countdown on the goal dashboard using the on-chain deadline timestamp.
8. **Implement early-withdrawal-with-penalty option (v2 flag)** — optional path where owner can withdraw early but forfeits a configurable percentage.
9. **Add multi-goal support to frontend** — list view for a wallet with more than one active goal.
10. **Write integration test script** — end-to-end script against testnet: create → deposit → unlock → withdraw.

## docs
11. **Document the token approval flow** — explain the USDC `approve`/`transfer_from` steps a new contributor needs to understand before touching `deposit()`.
12. **Add architecture diagram to README** — visual version of the flow in TECHNICAL_SPEC.md section 1.

## contract (medium/harder)
13. **Add event emission on goal creation, deposit, and unlock** — so the frontend (or external indexers) can react without polling.
14. **Add a `cancel_goal` function for pre-deposit goals** — allow deleting a goal with `current_amount == 0`.

---
**Posting tips:** Title each issue exactly as above, add the relevant label(s), and link to `TECHNICAL_SPEC.md` in the description for context. Issues with a clear "why" (like #6, tying back to the deadline design) tend to attract contributors faster than bare task descriptions.
