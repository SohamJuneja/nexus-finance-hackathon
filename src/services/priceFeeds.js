// src/services/priceFeeds.js
// Placeholder price feed service. In production, integrate Chainlink / Uniswap TWAP / Coingecko.
// For now returns mock prices.

export async function fetchPrices(symbols = ["ETH", "SOL", "USDC"]) {
  // TODO: replace with real API calls or on-chain oracles
  const base = {
    ETH: 2400,
    SOL: 85,
    USDC: 1,
    AVAX: 35,
  };
  const now = Date.now();
  return symbols.reduce((acc, s) => {
    const noise = 1 + (Math.sin(now / 30000 + s.length) * 0.01);
    acc[s] = +(base[s] * noise).toFixed(2);
    return acc;
  }, {});
}
