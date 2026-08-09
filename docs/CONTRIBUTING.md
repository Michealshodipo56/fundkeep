# Contributing to LockSave

Thanks for considering contributing — this project is a Soroban savings-lock dApp on Stellar, and it's actively looking for outside contributors. See `PRD.md` and `TECHNICAL_SPEC.md` for the full context before diving in.

## Setup
1. Install the [Soroban CLI](https://developers.stellar.org/docs/tools/developer-tools) and Rust toolchain.
2. Clone the repo and run `soroban contract build` in `/contract`.
3. Run tests with `cargo test`.
4. For frontend work, `cd frontend && npm install && npm run dev`.
5. Fund a testnet account via [Friendbot](https://friendbot.stellar.org) and connect it with Freighter to test the full flow.

## Finding something to work on
Check the [Issues](../../issues) tab — issues are labeled:
- `good first issue` — small, well-scoped, no deep Soroban knowledge required
- `help wanted` — open and unassigned, medium scope
- `contract` — Rust/Soroban contract work
- `frontend` — JS/Tailwind work
- `docs` — documentation improvements

This project is also listed on [Drips](https://www.drips.network) — funded contributions are marked accordingly in the issue description.

## Making a change
1. Fork the repo, branch off `main`.
2. Keep PRs scoped to one issue/feature.
3. Contract changes must include or update unit tests.
4. Run `cargo test` and `cargo fmt` before opening a PR.
5. Reference the issue number in your PR description.

## Code style
- Rust: standard `cargo fmt` / `clippy` clean.
- JS: keep components small; Tailwind utility classes over custom CSS where possible.
- Commit messages: short imperative summary (`Add deadline check to withdraw flow`).

## Questions
Open a discussion or comment directly on the relevant issue — no formal process, just keep it scoped and specific.
