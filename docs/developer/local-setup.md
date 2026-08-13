# Local Setup

These instructions cover getting the FundKeep frontend and Soroban contract running locally.

## Prerequisites

- **Node.js** v18 or higher
- **Rust** 1.74.0 or higher
- **Soroban CLI** — install with: `cargo install --locked soroban-cli`
- **Freighter** browser extension (for signing testnet transactions)

## 1. Clone the Repository

```bash
git clone https://github.com/your-org/fundkeep.git
cd fundkeep
```

## 2. Install Frontend Dependencies

```bash
npm install
```

## 3. Set Up Environment Variables

Copy the example env file and fill in values (see [Environment Variables](environment-variables.md)):

```bash
cp .env.example .env.local
```

## 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app will load with seed data so you can explore the UI before connecting a real wallet.

## 5. Build and Deploy the Contract (Optional)

To compile the Soroban contract:

```bash
cargo build --target wasm32-unknown-unknown --release
```

To deploy to testnet using Soroban CLI:

```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/fundkeep.wasm \
  --source <YOUR_SECRET_KEY> \
  --network testnet
```

The returned contract ID should be set as `NEXT_PUBLIC_CONTRACT_ID` in your `.env.local`.
