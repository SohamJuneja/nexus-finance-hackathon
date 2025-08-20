// src/App.jsx

import './App.css'; // Add this line
import WalletConnect from './components/Wallet/WalletConnect';
import PortfolioView from './components/Dashboard/PortfolioView';
import LendingModal from './components/Lending/LendingModal';
import AlertsPanel from './components/Alerts/AlertsPanel';

function App() {
  return (
    <div>
      <nav>
        <h1>Nexus Finance</h1>
        <WalletConnect />
      </nav>
      <main>
        <PortfolioView />
        <LendingModal />
        <AlertsPanel />
      </main>
    </div>
  );
}

export default App;