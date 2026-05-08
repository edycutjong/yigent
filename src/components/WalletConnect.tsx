"use client";

import React, { useState } from 'react';

export const WalletConnect = () => {
  const [connected, setConnected] = useState(false);

  const connectWallet = () => {
    // Simulate Solflare connection
    setConnected(true);
  };

  return (
    <div className="flex items-center gap-4">
      {connected ? (
        <button className="bg-slate-800 text-cyan-400 border border-slate-700 px-4 py-2 rounded-lg font-mono text-sm">
          Connected (Solflare)
        </button>
      ) : (
        <button 
          onClick={connectWallet}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 px-4 rounded-lg text-sm transition-colors"
        >
          Connect Solflare
        </button>
      )}
    </div>
  );
};
