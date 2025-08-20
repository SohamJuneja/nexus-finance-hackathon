// src/components/Alerts/AlertsPanel.jsx
import { useEffect, useState } from 'react';
// We no longer need the local service files for mock data
// import { fetchPrices } from '../../services/priceFeeds';
// import { fetchGasMetrics } from '../../services/gasOracle';
// import { computeHealthFactor, deriveAlerts } from '../../services/riskEngine';

// This is the data our frontend will send to the backend for analysis
const userPositionData = {
  collateral: [
    { chain: 'zeta', symbol: 'ZETA', amount: 2.0 },
    { chain: 'sepolia', symbol: 'ETH', amount: 0.05 },
  ],
  debt: [
    { chain: 'zeta', symbol: 'USDC', amount: 150 },
  ],
};

export default function AlertsPanel() {
  const [riskData, setRiskData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRiskAssessment = async () => {
      try {
        // Fetch data from your local backend server
        const response = await fetch('http://127.0.0.1:5000/api/assess-risk', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userPositionData), // Send our mock portfolio
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setRiskData(data); // Set the state with data from the backend
      } catch (error) {
        console.error("Failed to fetch risk assessment:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getRiskAssessment();
  }, []); // The empty array means this runs once when the component mounts

  if (isLoading) {
    return (
      <section style={{ border: '1px solid #444', padding: '1rem', marginTop: '1rem' }}>
        <h3>Risk & Alerts</h3>
        <div>Fetching AI risk assessment from backend...</div>
      </section>
    );
  }

  return (
    <section style={{ border: '1px solid #444', padding: '1rem', marginTop: '1rem' }}>
      <h3>Risk & Alerts (Live from Backend)</h3>
      <div>Health Factor: {riskData.healthFactor} (proj: {riskData.projectedHealthFactor})</div>
      <div style={{ marginTop: '0.5rem' }}>
        <strong>AI Alerts:</strong>
        {riskData.alerts.length === 0 && <div>None</div>}
        {riskData.alerts.map((alert, i) => (
          <div key={i} style={{ color: alert.level === 'critical' ? 'red' : 'orange' }}>
            {alert.msg}
          </div>
        ))}
      </div>
    </section>
  );
}