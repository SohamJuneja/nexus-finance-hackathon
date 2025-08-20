// src/services/riskEngine.js
// Combines prices + positions to compute a mock Health Factor and predictive warning.

export function computeHealthFactor({ collateral, debt, prices }) {
  // collateral/debt arrays: [{ symbol, amount, collateralFactor (0-1) }]
  const collateralValue = collateral.reduce((sum, c) => {
    const price = prices[c.symbol] || 0;
    return sum + c.amount * price * (c.collateralFactor ?? 0.7);
  }, 0);
  const debtValue = debt.reduce((sum, d) => {
    const price = prices[d.symbol] || 0;
    return sum + d.amount * price;
  }, 0);
  if (debtValue === 0) return { hf: Infinity, projected: Infinity };
  const hf = collateralValue / debtValue;
  // super naive projection: subtract a small volatility stress factor
  const projected = hf * 0.97; // assume 3% adverse move
  return { hf: +hf.toFixed(3), projected: +projected.toFixed(3) };
}

export function deriveAlerts({ hf, projected }) {
  const alerts = [];
  if (hf < 1.2) alerts.push({ level: 'critical', msg: `Health Factor low (${hf}). Immediate action advised.` });
  else if (projected < 1.2) alerts.push({ level: 'warning', msg: `Projected HF ${projected} could breach safety soon.` });
  return alerts;
}
