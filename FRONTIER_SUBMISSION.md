# Frontier Hackathon Submission: Yigent

## Project Metadata
- **Project Name**: Yigent
- **Track**: Eitherway (AI Intent-to-DeFi Terminal)
- **GitHub Repository**: [https://github.com/edycutjong/frontier-eitherway](https://github.com/edycutjong/frontier-eitherway)
- **Live Website**: [https://eitherway.vercel.app](https://eitherway.vercel.app)
- **Pitch Video**: [https://youtube.com/your-video](https://youtube.com/your-video)

## Project Pitch
Yigent is a unified, AI-powered Natural Language Terminal for DeFi. Users type simple intents (e.g., "Find the highest APY for my SOL" or "Swap 100 USDC to SOL") and Yigent handles the rest by parsing the command, fetching market context, routing the optimal path, and executing the transaction in a single click using the Eitherway partner ecosystem.

## Track Compliance & Sponsor Integrations
This project deeply integrates all 5 targeted sponsors for the **Eitherway Track**:
1. **Birdeye**: Live token prices and market data for context before intent execution.
2. **DFlow**: Optimal swap routing for trade execution.
3. **Kamino**: Vault discovery and highest APY data for yield intents.
4. **Solflare**: Secure wallet connections and transaction signing.
5. **QuickNode**: High-performance RPC endpoint for broadcasting intent transactions.

Detailed defense of our integration depth is available in `docs/SPONSOR_DEFENSE.md`.

## Test Coverage
The project achieves **100% Test Coverage** across all branches, functions, and lines. The CI pipeline ensures code quality via ESLint and strict TypeScript type checking.

## Demo Script
1. Connect Solflare wallet.
2. Type "What is the price of SOL?" into the terminal (Birdeye integration).
3. Type "Swap 100 USDC to SOL using the best route" (DFlow routing action card).
4. Type "Find the highest APY for my SOL" (Kamino vault action card).
5. Click "Execute" on any action card to sign (Solflare) and broadcast (QuickNode).

## Documentation
- [Architecture & Design](docs/ARCHITECTURE.md)
- [Product Requirements (PRD)](docs/PRD.md)
- [Full Pitch Submission](docs/SUBMISSION.md)
- [Sponsor Defense](docs/SPONSOR_DEFENSE.md)
