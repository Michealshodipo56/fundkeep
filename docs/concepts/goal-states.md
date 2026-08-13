# Goal States

Every savings goal is in one of three states at any moment. The dashboard reflects these states, and the contract enforces which operations are permitted in each.

## LOCKED

The starting state for every newly created goal. The contract holds deposited funds and blocks withdrawal. Deposits are accepted. The goal transitions out of LOCKED either when:

- A deposit causes `current_amount` to reach `target_amount` (transition to UNLOCKED happens within the same `deposit` transaction), or
- The deadline timestamp has passed and `check_deadline` is called (also transitions to UNLOCKED).

## UNLOCKED

The goal's target has been reached or its deadline has passed. Withdrawal is now permitted. Deposits are still technically accepted by the contract in this state, though the UI discourages it since there's no reason to add funds to an already-unlocked goal. The `unlocked` flag is `true` and `withdrawn` is `false`.

## WITHDRAWN

The owner has successfully called `withdraw`. Funds have been transferred back to the owner's wallet. No further deposits or withdrawals are accepted. The goal remains readable on-chain for historical reference but is otherwise inert.

## State Transition Diagram

```
          create_goal
               |
               v
           [LOCKED]
          /         \
 target reached    deadline passed
 (via deposit)     (via check_deadline)
          \         /
               v
          [UNLOCKED]
               |
          withdraw()
               |
               v
          [WITHDRAWN]
```

A goal cannot go backward. WITHDRAWN and UNLOCKED are one-way transitions.
