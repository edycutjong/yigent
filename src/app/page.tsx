"use client";

import { StatusBar } from "@/components/StatusBar";
import { Footer } from "@/components/Footer";

import React, { useState, useEffect } from 'react';
import { eitherwayService } from '@/lib/eitherway';

const PARTNERS = [
  { id: 'quicknode', name: 'Quicknode', status: 'connected' },
  { id: 'birdeye', name: 'Birdeye', status: 'connected' },
  { id: 'dflow', name: 'DFlow', status: 'connected' },
  { id: 'kamino', name: 'Kamino', status: 'connected' },
  { id: 'solflare', name: 'Solflare', status: 'connected' }
];

export default function Home() {
  const [intent, setIntent] = useState('');
  const [stage, setStage] = useState<'idle' | 'parsing' | 'fetching' | 'routing' | 'yielding' | 'ready'>('idle');
  const [planText, setPlanText] = useState('');

  const sampleIntent = "Put 50 USDC into the safest SOL yield";

  const executeIntent = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!intent) return;

    setStage('parsing');
    setPlanText('');
    
    let currentText = '';
    const parsed = await eitherwayService.parseIntent(intent);
    const fullText = parsed.plan;
    
    let i = 0;
    const typingInterval = setInterval(() => {
      currentText += fullText.charAt(i);
      setPlanText(currentText);
      i++;
      if (i >= fullText.length) {
        clearInterval(typingInterval);
        setTimeout(() => setStage('fetching'), 500);
        setTimeout(() => setStage('routing'), 1500);
        setTimeout(() => setStage('yielding'), 2500);
        setTimeout(() => setStage('ready'), 3500);
      }
    }, 20);
  };

  return (
    <>
      <StatusBar />
    <main className="min-h-screen flex flex-col bg-slate-950">
      {/* Top Status Bar */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm p-3 flex justify-between items-center px-6">
        <div className="font-mono text-cyan-400 font-bold tracking-widest text-sm">
          YIGENT_TERMINAL_V1
        </div>
        <div className="flex gap-4">
          {PARTNERS.map(p => (
            <div key={p.id} className="flex items-center gap-2 text-xs font-mono">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-slate-400">{p.name}</span>
            </div>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Action Cards (Center) */}
        <div className="flex-1 p-8 overflow-y-auto">
          {stage !== 'idle' && (
            <div className="max-w-3xl mx-auto space-y-6">
              
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl font-mono text-sm text-purple-400 whitespace-pre-line">
                {planText}
                <span className="animate-pulse">_</span>
              </div>

              {(stage === 'fetching' || stage === 'routing' || stage === 'yielding' || stage === 'ready') && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500 bg-slate-900/80 backdrop-blur border border-cyan-500/30 p-6 rounded-xl flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50 flex-shrink-0">
                    B
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-cyan-400 font-mono mb-1">Birdeye Price Feed</div>
                    <div className="text-white font-mono text-lg">1 SOL = 184.22 USDC</div>
                    <div className="text-xs text-slate-500 mt-2">Fetched in 142ms via QuickNode RPC</div>
                  </div>
                </div>
              )}

              {(stage === 'routing' || stage === 'yielding' || stage === 'ready') && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500 bg-slate-900/80 backdrop-blur border border-purple-500/30 p-6 rounded-xl flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center border border-purple-500/50 flex-shrink-0">
                    D
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-purple-400 font-mono mb-1">DFlow Optimal Route</div>
                    <div className="text-white font-mono text-lg">50 USDC → 0.2714 SOL</div>
                    <div className="text-xs text-amber-500 mt-2">Slippage: 0.1%</div>
                  </div>
                </div>
              )}

              {(stage === 'yielding' || stage === 'ready') && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500 bg-slate-900/80 backdrop-blur border border-green-500/30 p-6 rounded-xl flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center border border-green-500/50 flex-shrink-0">
                    K
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-green-400 font-mono mb-1">Kamino Strategy Selected</div>
                    <div className="text-white font-mono text-lg">JitoSOL-SOL Liquidity Vault (12.4% APY)</div>
                    <div className="text-xs text-slate-500 mt-2">Risk profile: Lowest available</div>
                  </div>
                </div>
              )}

              {stage === 'ready' && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-cyan-500 p-8 rounded-xl flex flex-col items-center justify-center mt-12 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                  <div className="text-white font-bold text-xl mb-2">Ready to Execute via Solflare</div>
                  <div className="text-slate-400 font-mono text-sm mb-6 text-center">
                    Swap 50 USDC for ~0.2714 SOL and deposit into Kamino JitoSOL-SOL Vault.
                  </div>
                  <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 px-8 rounded-lg transition-colors shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    Approve & Sign Transaction
                  </button>
                </div>
              )}

            </div>
          )}
          {stage === 'idle' && (
             <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 mb-6 flex items-center justify-center opacity-80">
                  <span className="text-4xl">🤖</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">Command DeFi with English.</h1>
                <p className="text-slate-400 mb-8">
                  Yigent maps your intent, finds the best prices, routes the swap, and allocates yield across 5 protocols automatically.
                </p>
                <button 
                  onClick={() => setIntent(sampleIntent)}
                  className="text-xs font-mono bg-slate-900 border border-slate-800 text-cyan-400 px-4 py-2 rounded hover:bg-slate-800 transition-colors"
                >
                  Try: "{sampleIntent}"
                </button>
             </div>
          )}
        </div>

        {/* Execution Timeline (Right) */}
        <div className="w-80 border-l border-slate-800 bg-slate-900/30 p-6 font-mono text-xs hidden lg:block">
          <div className="text-slate-500 mb-6">EXECUTION_TIMELINE</div>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
            {['Parsing Intent', 'QuickNode RPC', 'Birdeye Price', 'DFlow Route', 'Kamino Vault', 'Solflare Sign'].map((step, idx) => {
               let stepStatus = 'pending';
               if (stage === 'ready') stepStatus = 'done';
               else if (stage === 'parsing' && idx === 0) stepStatus = 'active';
               else if (stage === 'fetching' && (idx <= 2)) stepStatus = idx === 2 ? 'active' : 'done';
               else if (stage === 'routing' && (idx <= 3)) stepStatus = idx === 3 ? 'active' : 'done';
               else if (stage === 'yielding' && (idx <= 4)) stepStatus = idx === 4 ? 'active' : 'done';

               return (
                <div key={step} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                    stepStatus === 'done' ? 'bg-green-500 border-green-500' :
                    stepStatus === 'active' ? 'bg-slate-900 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' :
                    'bg-slate-900 border-slate-700'
                  } shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2`}>
                    {stepStatus === 'done' && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
                  </div>
                  <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded border ${
                    stepStatus === 'active' ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400' :
                    stepStatus === 'done' ? 'border-slate-700 bg-slate-800 text-slate-300' :
                    'border-slate-800 text-slate-600'
                  }`}>
                    {step}
                  </div>
                </div>
               )
            })}
          </div>
        </div>
      </div>

      {/* Input Bar (Bottom) */}
      <div className="p-6 bg-slate-900/80 backdrop-blur border-t border-slate-800">
        <form onSubmit={executeIntent} className="max-w-4xl mx-auto relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 font-mono text-lg">{'>'}</span>
          <input 
            type="text" 
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            placeholder="Type your intent... (e.g. Put 50 USDC into safest SOL yield)"
            className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500 rounded-xl py-4 pl-12 pr-32 text-white outline-none transition-colors font-mono text-sm placeholder:text-slate-600"
          />
          <button 
            type="submit"
            disabled={!intent || stage !== 'idle'}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold py-2 px-6 rounded-lg text-sm transition-colors"
          >
            EXECUTE
          </button>
        </form>
      </div>
    </main>
      <Footer />
    </>
  );
}
