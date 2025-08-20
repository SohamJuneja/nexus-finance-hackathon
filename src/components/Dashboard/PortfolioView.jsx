// src/components/Dashboard/PortfolioView.jsx
import { useAccount, useBalance } from 'wagmi';
import zetaAthensTestnet from '../../chains/zetaAthens';
import { sepolia } from 'wagmi/chains';

// Component to display a single asset's balance
function AssetBalance({ chain, symbol, address }) {
  const { data, isLoading } = useBalance({
    address: address,
    chainId: chain.id,
    // For ERC20 balances add `token: <tokenAddress>` when needed
  });

  if (isLoading) return <div>Fetching {symbol} balance...</div>;
  if (!data) return <div>Could not fetch {symbol} balance.</div>;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
      <span>{chain.name}</span>
      <span>{parseFloat(data.formatted).toFixed(4)} {symbol}</span>
    </div>
  );
}

// Main PortfolioView component
export default function PortfolioView() {
  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return (
      <section>
        <h3>Your Portfolio</h3>
        <div>Please connect your wallet to view your assets.</div>
      </section>
    );
  }

  return (
    <section style={{ border: '1px solid #444', padding: '1rem', marginTop: '1rem' }}>
      <h3>Your Unified Portfolio</h3>
  <AssetBalance chain={zetaAthensTestnet} symbol="ZETA" address={address} />
      <AssetBalance chain={sepolia} symbol="ETH" address={address} />
    </section>
  );
}