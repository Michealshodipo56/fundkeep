# The Problem

Saving toward a specific goal is genuinely hard to do without some kind of friction. When your money sits in a regular wallet or account, it's always one impulsive decision away from being redirected to something else. Savings discipline tends to fail not because people lack intention, but because the funds stay immediately available.

Existing solutions involve trusting something: a bank's savings product, a custodial app, or yourself. A bare wallet address solves none of this — there's no mechanism to say "this balance is earmarked and not touchable until X."

On Stellar specifically, there was no simple, non-custodial way to lock a stablecoin toward a personal savings goal with a real on-chain enforcement. You could track it mentally, you could trust a third party to hold the funds, or you could write your own contract. FundKeep makes the last option accessible as a ready-to-use application.

The enforcement is done at the contract level. If the withdrawal condition is not met, `withdraw` panics and the transaction fails. There's no UI workaround because the UI is irrelevant to what the contract permits.
