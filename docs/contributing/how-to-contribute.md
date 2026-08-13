# How to Contribute

FundKeep is open for contributions on GitHub. The contract, frontend, and documentation are all in the same repository.

## Finding Something to Work On

Check the Issues tab filtered for contributor-friendly work:

- [Good First Issues](https://github.com/your-org/fundkeep/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

A few specific issues worth highlighting for new contributors:

- **Keeper script** — a small script (Node.js or Python) that polls for goals past their deadline and calls `check_deadline` on them automatically. This is the most-requested feature for contributors who want to build something genuinely useful. See [The Deadline Unlock Pattern](../concepts/deadline-unlock.md) for context.
- **Early withdrawal with penalty** — a v2 contract feature that lets an owner exit a LOCKED goal before the deadline at the cost of forfeiting a percentage of saved funds.
- **Multi-user / group goals** — shared goals where multiple wallets can deposit, with ownership split proportionally.

## Branch Naming

Use one of these prefixes:

```
feat/your-feature-name
fix/what-you-are-fixing
docs/page-or-section-name
refactor/scope-of-change
test/what-is-being-tested
```

Examples:
- `feat/keeper-script`
- `fix/double-deposit-edge-case`
- `docs/deadline-unlock-clarification`

## Commit Message Format

Follow the Conventional Commits specification — every commit in this repo uses it:

```
type(scope): short description in lowercase
```

Types: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`

Examples:
```
feat(contract): add early withdrawal with penalty flag
fix(frontend): correct usdc decimal display on goal card
docs(deadline-unlock): clarify keeper script requirement
test(contract): add double withdrawal failure case
```

One logical change per commit. Avoid bundling unrelated fixes or changes into a single commit.

## Pull Request Process

1. Fork the repository and create a branch following the naming rules above.
2. For contract changes: run `cargo test` and confirm all tests pass before opening the PR.
3. For frontend changes: run `npm test` and confirm all tests pass.
4. Open a Pull Request against the `main` branch. Reference the Issue number it addresses in the PR description.
5. A maintainer will review within a few days. If changes are requested, push them to the same branch — do not open a new PR.

## Documentation Changes

If your contribution changes how a contract function works, updates an environment variable, or adds a new user-facing feature, update the relevant docs pages in `gitbook/` as part of the same PR. Docs that drift from the code are harder to fix later than docs updated alongside the change.
