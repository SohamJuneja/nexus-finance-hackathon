# Nexus Finance – Cross-Chain Yield Maximizer

Unified collateral + AI risk engine on top of ZetaChain. Hold assets on multiple chains, borrow anywhere, managed as a single portfolio with a global Health Factor (HF).

## Core Pillars
1. Universal Contract (ZetaChain) – canonical source of truth for user Cross‑Chain Health Factor & liquidation eligibility.
2. Unified Collateral Layer – abstracts per‑chain wallet balances into one borrowing power number.
3. AI Predictive Risk & Alerts – anticipates liquidation risk using price velocity, gas congestion, sentiment signals.
4. One‑Click Cross‑Chain Actions – borrow / repay / top‑up from any supported chain without manual bridging UX.

## High‑Level Architecture (MVP Scope)
Frontend (React + wagmi)
- Wallet aggregation (initial: EVM chains; stretch: Solana wrapper)
- Portfolio dashboard: balances, borrowing power, HF, active loans, alerts
- Action modals: borrow, repay, supply top‑up

Services (browser or lightweight backend proxy later)
- PriceFeeds: pull multi‑chain prices (Coingecko / Chainlink / test mocks)
- GasOracle: fetch gas + congestion metrics
- RiskEngine: compute predicted HF trajectory (short look‑ahead)
- AlertsEngine: threshold + predictive triggers

On-Chain (not yet implemented)
- Zeta Universal Position Contract:
	- store per user: collateral summary (by chain + asset), debt summary, last HF
	- function: updateState(messagePayload) from per‑chain executors / oracles
	- view: getGlobalHealthFactor(address)
	- liquidation check & event emission

## Roadmap (Hackathon Phases)
Phase 0 (Today)
- [x] React scaffold & wallet connect (EVM testnets, Zeta testnet)
- [ ] Basic UI components placeholders (portfolio, lending, alerts)
- [ ] Documentation & architecture stubs

Phase 1 – Data & Mock Engine
- [ ] Mock price + gas feeds
- [ ] RiskEngine: HF formula v0 (weighted collateral * LTV - debt)
- [ ] Alerts panel consuming mock predictions

Phase 2 – Universal Contract Draft
- [ ] Solidity contract skeleton on Zeta testnet
- [ ] writeGlobalState + getGlobalHealthFactor
- [ ] Simple liquidation condition + event

Phase 3 – Cross‑Chain Messaging (MVP)
- [ ] Simulated updates (manual) -> contract
- [ ] Display on dashboard

Phase 4 – AI Layer (Prototype)
- [ ] Collect feature vectors: price %, gas percentile, volatility
- [ ] Simple regression / heuristic risk score
- [ ] Integrate Gemini API (serverless function) for natural language alert suggestions

Phase 5 – Polish & Demo
- [ ] One‑click top‑up/repay flow (mock execution aggregator)
- [ ] Final UI styling & charts
- [ ] Demo script & pitch deck

## Health Factor (Proposed v0)
HF = ( Σ_i ( collateral_i * price_i * collateralFactor_i ) - buffer ) / ( Σ_j ( debt_j * price_j ) )

Liquidation threshold when HF < 1.1 (example). Predictive engine flags when projected HF (t + Δ) < 1.15.

## Local Dev
Install deps: `npm install`
Run dev server: `npm run dev`

## Environment Variables (planned)
Create `.env` (values optional for now):
```
VITE_ZETA_RPC_URL=
VITE_SEPOLIA_RPC_URL=
VITE_GEMINI_API_KEY= (for AI alert generation – do NOT commit)
```

## Pending Tasks in Codebase
- Add services under `src/services/` (priceFeeds, riskEngine, alerts)
- Implement `useUnifiedPortfolio` hook aggregating balances
- Add `<AlertsPanel />` component
- Contract repo / directory structure & ABI wiring

## Security / Disclaimer
Prototype only. No real funds. Risk calculations & AI suggestions are non‑binding.

## License
TBD (add MIT or GPL per preference) before submission.

---
Hackathon Early Commit – README will evolve as components land.
