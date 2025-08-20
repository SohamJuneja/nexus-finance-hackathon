// src/components/Wallet/WalletConnect.jsx

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

function WalletConnect() {
  // wagmi hook to get account information
  const { address, isConnected } = useAccount();

  // wagmi hook for connecting
  const { connect } = useConnect();

  // wagmi hook for disconnecting
  const { disconnect } = useDisconnect();

  // Function to format the address for display
  const formatAddress = (addr) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  if (isConnected) {
    return (
      <div>
        <span>Connected: {formatAddress(address)}</span>
        <button onClick={() => disconnect()} style={{ marginLeft: '10px' }}>
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => connect({ connector: injected() })}>
      Connect Wallet
    </button>
  );
}

export default WalletConnect;