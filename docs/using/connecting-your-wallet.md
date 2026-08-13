# Connecting Your Wallet

FundKeep uses the Freighter browser extension for transaction signing. Freighter is the standard Stellar wallet for web applications.

## Install Freighter

Download Freighter from [freighter.app](https://freighter.app) and add it as a browser extension. After installing, create or import a Stellar keypair.

## Switch to Testnet

FundKeep v1 runs on Soroban Testnet. In Freighter, go to **Settings → Network** and select **Testnet**. Transactions signed while on Mainnet will fail against the testnet contract.

Fund your testnet account using [Stellar Friendbot](https://friendbot.stellar.org/?addr=YOUR_ADDRESS) if you need XLM for transaction fees.

## Connect in the App

1. Open the FundKeep web app.
2. Click **Connect Wallet** in the top navigation.
3. Freighter will prompt you to approve the connection. Approve it.
4. Your abbreviated wallet address will appear in the nav once connected.

## Demo Mode

If Freighter is not installed, the app falls back to a read-only demo mode using a placeholder address (`GAK3X57J29PQR8LMVW7890STUVWXNEON789`). You can browse the interface and see seed data, but no real transactions will be signed. Install Freighter to use the full application.

## Disconnect

Click your wallet address in the nav and select **Disconnect**. Your goal data persists in local browser storage — it will re-appear when you reconnect with the same address.
