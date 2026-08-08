import React from 'react';
import { Globe, Server, Database, Zap, ArrowDown, ArrowRight } from 'lucide-react';

export default function Architecture({ topology, shadowAdditions }) {
  const nodes = topology?.nodes || [];
  const cacheNode = nodes.find((n) => n.type === 'cache');
  const isCacheActive = cacheNode?.status === 'healthy' || shadowAdditions?.addValkey;

  return (
    <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-slate-100 text-base">Zerops Architecture Map</h3>
          <p className="text-xs text-slate-400">Live service dependency topology & active routing</p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span> Active
          </span>
          {isCacheActive && (
            <span className="flex items-center gap-1 text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-500/30">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse"></span> Valkey Cache Active
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-6 gap-6 min-h-[300px] relative">
        {/* Top Node: User Traffic */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 shadow-md">
            <Globe className="h-4 w-4 text-cyan-400" />
            <span>User Ingress Traffic (1,050 QPS)</span>
          </div>
          <div className="h-8 w-0.5 bg-gradient-to-b from-cyan-500 to-emerald-500 my-1 animate-pulse"></div>
        </div>

        {/* Center Node: API Container Pool */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 shadow-lg shadow-emerald-500/10">
            <Server className="h-6 w-6 text-emerald-400" />
            <div>
              <p className="font-bold text-sm text-white">API Node Cluster</p>
              <p className="text-[11px] text-emerald-400 font-mono">
                {shadowAdditions?.increaseWorkers ? '4 Worker Containers' : '2 Worker Containers'}
              </p>
            </div>
          </div>
        </div>

        {/* Connector Lines */}
        <div className="w-full max-w-md flex justify-around relative my-1">
          <div className="h-10 w-0.5 bg-slate-700"></div>
          {isCacheActive && <div className="h-10 w-0.5 bg-cyan-500 animate-pulse"></div>}
        </div>

        {/* Bottom Nodes: PostgreSQL & Valkey */}
        <div className="w-full max-w-lg grid grid-cols-2 gap-4">
          {/* Database */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-white">PostgreSQL 16</p>
              <p className="text-[10px] text-slate-400">Primary Database Storage</p>
              <span className="inline-block mt-1 text-[10px] font-mono text-emerald-400">🟢 61% Load</span>
            </div>
          </div>

          {/* Valkey Cache */}
          <div className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
            isCacheActive 
              ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200 glow-cyan' 
              : 'bg-slate-950/40 border-slate-800 text-slate-600 opacity-60'
          }`}>
            <div className={`p-2 rounded-lg ${isCacheActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-500'}`}>
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-white">Valkey Cache</p>
              <p className="text-[10px] text-slate-400">In-Memory Cache Tier</p>
              {isCacheActive ? (
                <span className="inline-block mt-1 text-[10px] font-mono text-cyan-400">⚡ 87% Hit Rate</span>
              ) : (
                <span className="inline-block mt-1 text-[10px] font-mono text-slate-500">⚪ Not Added</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
