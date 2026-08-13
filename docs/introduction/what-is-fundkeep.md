# What is FundKeep

FundKeep is a savings goal application built on Stellar. You lock USDC toward a specific target — a laptop, a trip, an emergency fund — and the funds stay locked until you either reach the target amount or your deadline passes. The lock is enforced by a Soroban smart contract, not a promise.

There is no custodian holding your funds. There is no UI toggle that lets you "skip" the lock. The contract itself blocks withdrawal until one of two conditions is met: your saved amount hits the target, or the deadline ledger timestamp is reached and confirmed. Only then can you withdraw.

## What FundKeep Is Not

FundKeep is not a yield protocol — locked funds do not generate interest. It is not a group savings or multisig product in v1 — each goal is owned by a single wallet address. It does not support arbitrary tokens in v1; the expected deposit token is USDC on Soroban testnet.
