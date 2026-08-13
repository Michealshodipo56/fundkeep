# Creating a Goal

Goals are the core unit of FundKeep. Each goal is an on-chain savings commitment with a target amount and a deadline.

## Steps

1. Connect your Freighter wallet (see [Connecting Your Wallet](connecting-your-wallet.md)).
2. Click **New Goal** on the dashboard.
3. Fill in the goal form:
   - **Title** — A label for yourself, e.g. "Buy a New Laptop" or "Trip to Japan". Not stored on-chain; stored client-side.
   - **Category** — Choose one of: Laptop, Camera, Travel, Other. Display-only; not stored on-chain.
   - **Target Amount** — The USDC amount that, once reached, auto-unlocks your goal.
   - **Deadline** — A date. After this date passes, your goal can be unlocked via `check_deadline` even if the target wasn't reached.
4. Click **Create Goal**. Freighter will prompt you to sign a transaction invoking `create_goal` on the contract.
5. The transaction submits to Soroban Testnet. Once it lands, the goal appears on your dashboard in **LOCKED** state with 0 USDC deposited.

## Choosing a Deadline

The deadline is a hard floor, not a soft reminder. If you set a date of 2026-09-15, the contract will not unlock your goal before that timestamp even if you change your mind. Setting a very distant deadline when you intend a flexible save is usually not the right choice — in that case, a shorter deadline with manual check is more appropriate.
