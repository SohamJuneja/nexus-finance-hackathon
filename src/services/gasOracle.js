// src/services/gasOracle.js
// Mock gas / congestion metrics per chain.

export async function fetchGasMetrics(chains = ["zeta", "sepolia"]) {
  const now = Date.now();
  return chains.reduce((acc, chain) => {
    const base = chain === "zeta" ? 15 : 35; // gwei
    const congestion = 0.5 + (Math.sin(now / 45000 + chain.length) + 1) / 4; // 0.5 - 1.0
    acc[chain] = {
      gasPriceGwei: +(base * congestion).toFixed(2),
      congestion: +congestion.toFixed(2),
    };
    return acc;
  }, {});
}
