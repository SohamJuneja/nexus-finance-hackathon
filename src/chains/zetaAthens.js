// src/chains/zetaAthens.js
const zetaAthensTestnet = {
  id: 7001,
  name: 'ZetaChain Athens Testnet',
  network: 'zeta-athens',
  nativeCurrency: { name: 'Zeta', symbol: 'ZETA', decimals: 18 },
  rpcUrls: {
    // Replace the old URL with the new one here
    default: { http: ['https://zetachain-athens-evm.blockpi.network/v1/rpc/public'] },
    public: { http: ['https://zetachain-athens-evm.blockpi.network/v1/rpc/public'] },
  },
  blockExplorers: {
    default: { name: 'Athens Explorer', url: 'https://explorer.athens2.zetachain.com' },
  },
  testnet: true,
};

export default zetaAthensTestnet;