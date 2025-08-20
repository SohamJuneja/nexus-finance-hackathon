// src/components/Alerts/AlertsPanel.jsx
import { useEffect, useState } from 'react';
import { fetchPrices } from '../../services/priceFeeds';
import { fetchGasMetrics } from '../../services/gasOracle';
import { computeHealthFactor, deriveAlerts } from '../../services/riskEngine';

// Mock portfolio state (later replaced by unified portfolio hook)
const mockCollateral = [
  { chain: 'zeta', symbol: 'ETH', amount: 0.5, collateralFactor: 0.75 },
  { chain: 'sepolia', symbol: 'SOL', amount: 12, collateralFactor: 0.6 },
];
const mockDebt = [
  { chain: 'zeta', symbol: 'USDC', amount: 300 },
];

export default function AlertsPanel() {
  const [prices, setPrices] = useState({});
  const [gas, setGas] = useState({});
  const [risk, setRisk] = useState({ hf: '-', projected: '-' });
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    let active = true;
    async function loop() {
      const p = await fetchPrices(['ETH', 'SOL', 'USDC']);
      const g = await fetchGasMetrics(['zeta', 'sepolia']);
      const { hf, projected } = computeHealthFactor({ collateral: mockCollateral, debt: mockDebt, prices: p });
      const a = deriveAlerts({ hf, projected });
      if (!active) return;
      setPrices(p);
      setGas(g);
      setRisk({ hf, projected });
      setAlerts(a);
      setTimeout(loop, 5000);
    }
    loop();
    return () => { active = false; };
  }, []);

  return (
    <section style={{ border: '1px solid #444', padding: '1rem', marginTop: '1rem' }}>
      <h3>Risk & Alerts</h3>
      <div>Health Factor: {risk.hf} (proj: {risk.projected})</div>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
        <div>
          <strong>Prices</strong>
          {Object.entries(prices).map(([s, v]) => <div key={s}>{s}: ${v}</div>)}
        </div>
        <div>
          <strong>Gas</strong>
          {Object.entries(gas).map(([c, v]) => <div key={c}>{c}: {v.gasPriceGwei} gwei (cong {v.congestion})</div>)}
        </div>
        <div>
          <strong>Alerts</strong>
          {alerts.length === 0 && <div>None</div>}
          {alerts.map((al, i) => <div key={i} style={{ color: al.level === 'critical' ? 'red' : 'orange' }}>{al.msg}</div>)}
        </div>
      </div>
    </section>
  );
}
