<div align="center">
  <h1>Yigent 🚀</h1>
  <p><em>AI Intent-to-DeFi Terminal. Natural language DeFi terminal using ALL 5 Eitherway partners.</em></p>

  <img src="docs/readme-hero.png" alt="Yigent Hero" width="100%">
  
  <br/>
  
  [![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg?style=for-the-badge)](https://yigent.edycu.dev)
  [![Pitch Deck](https://img.shields.io/badge/Pitch-Deck-f59e0b.svg?style=for-the-badge)](https://yigent.edycu.dev/pitch)
  [![Pitch Video](https://img.shields.io/badge/Pitch-Video-red.svg?style=for-the-badge)](https://youtube.com/your-video)
  [![Superteam Frontier](https://img.shields.io/badge/Superteam-Frontier_Hackathon-1E40AF?style=for-the-badge&logo=solana&logoColor=white)](https://superteam.fun/earn/listing/build-a-live-dapp-with-solflare-kamino-dflow-or-quicknode-with-eitherway-app)

  <br/>

  ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
  ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
  ![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat&logo=openai&logoColor=white)
  [![Yigent CI](https://github.com/edycutjong/yigent/actions/workflows/ci.yml/badge.svg)](https://github.com/edycutjong/yigent/actions/workflows/ci.yml)
</div>

---

## 📸 See it in Action
*(Demo GIF and UI screenshots can be found in the `public` directory)*

<div align="center">
  <img src="public/og-image.png" alt="App Demo" width="100%">
</div>

## 💡 The Problem & Solution
Natural language DeFi terminal using ALL 5 Eitherway partners. Type intent → get optimal action → 1-click execute.

**Yigent** solves this by providing: 
A unified intent-to-DeFi terminal. Users type what they want to do in natural language (e.g., "swap 50 USDC to SOL using the best route" or "find the highest APY for my SOL"), and the Yigent engine parses this intent, fetches the necessary data from 5 integrated partners (Birdeye, DFlow, Kamino, Solflare, QuickNode), and executes the transaction in a single click.

**Key Features:**
- ⚡ **High Performance:** Seamless integration and optimized workflows.
- 🔒 **Secure by Design:** Verifiable on-chain actions and robust data protection.
- 🎨 **Intuitive UX:** Beautiful, user-centric interface built for scale.

## 🏗️ Architecture & Tech Stack

### Tech Stack
| Component | Technology | Description |
|-----------|------------|-------------|
| **Frontend** | Next.js 16, React 19 | App Router, SSR, Server Components |
| **Styling** | Tailwind CSS v4 | High-performance responsive UI |
| **Language** | TypeScript | Strict type safety across the stack |
| **AI Engine** | OpenAI API (gpt-4o-mini) | Intent parsing, action planning |
| **Integrations** | Birdeye, DFlow, Kamino, Solflare, QuickNode | Prices, Routing, Yields, Wallet, RPC |
| **Testing** | Vitest | Comprehensive unit and component testing |

For a detailed breakdown of our system architecture and data flow, please refer to the [Architecture Document](docs/ARCHITECTURE.md).

## 🏆 Sponsor Tracks Targeted
* **Eitherway Track**: We integrated all 5 targeted sponsors deeply into the core AI execution loop. 
  - **Birdeye**: Live token prices and market data.
  - **DFlow**: Optimal swap routing for trade execution.
  - **Kamino**: Vault discovery and highest APY data.
  - **Solflare**: Secure wallet connections and transaction signing.
  - **QuickNode**: High-performance RPC endpoint for broadcasting.

## 🚀 Run it Locally (For Judges)

1. **Clone the repo:** `git clone https://github.com/edycutjong/yigent.git`
2. **Install dependencies:** `npm install`
3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Then add your API keys.
4. **Run the app:** `npm run dev`

> **Note for Judges:**
> You can test the app locally using your Solflare wallet on Devnet.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
