// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Import wagmi and viem modules
import { WagmiProvider, createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injected } from 'wagmi/connectors'

// Custom ZetaChain Athens testnet chain definition (not bundled in wagmi by default)
const zetaAthensTestnet = {
  id: 7001,
  name: 'ZetaChain Athens Testnet',
  nativeCurrency: { name: 'Zeta', symbol: 'ZETA', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://api.athens2.zetachain.com/evm'] },
  },
  blockExplorers: {
    default: { name: 'Athens Explorer', url: 'https://explorer.athens2.zetachain.com' },
  },
  testnet: true,
};

// 1. Create a QueryClient for react-query
const queryClient = new QueryClient();

// 2. Create the wagmi config
const config = createConfig({
  // An array of the chains we want to support
  chains: [zetaAthensTestnet, sepolia],
  // An array of connection methods (e.g., MetaMask, Coinbase Wallet)
  // We'll start with 'injected', which is for browser wallets like MetaMask
  connectors: [
    injected(),
  ],
  // The transport layer that tells wagmi how to send requests to the blockchain
  transports: {
    [zetaAthensTestnet.id]: http(), // For ZetaChain, use its default RPC
    [sepolia.id]: http(),          // For Sepolia, use its default RPC
  },
});

// 3. Render the app, wrapping it with the necessary providers
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);