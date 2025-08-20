// src/App.jsx
import WalletConnect from './components/Wallet/WalletConnect';
import PortfolioView from './components/Dashboard/PortfolioView';
import LendingModal from './components/Lending/LendingModal';

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
      </main>
    </div>
  );
}

export default App;