import React from 'react';
import { Flame, ZapOff, DatabaseZap, Clock, TrendingUp, Cpu, AlertTriangle, Play, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

const ICON_MAP = {
  ZapOff,
  DatabaseZap,
  Clock,
  TrendingUp,
  Cpu,
  AlertTriangle,
};

export default function ChaosCard({ scenario, onSelect, isSelected }) {
  const IconComponent = ICON_MAP[scenario.icon] || Flame;

  return (
    <div
      onClick={() => onSelect(scenario.id)}
      className={`glass-panel rounded-2xl p-5 border transition-all cursor-pointer relative overflow-hidden ${
        isSelected
          ? 'border-rose-500/50 bg-rose-950/20 glow-rose'
          : 'border-slate-800 hover:border-slate-700 bg-slate-900/40'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl border ${
            isSelected ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' : 'bg-slate-800 border-slate-700 text-slate-300'
          }`}>
            <IconComponent className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-sm">{scenario.name}</h4>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${
              scenario.severity === 'Critical' ? 'text-rose-400' :
              scenario.severity === 'High' ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {scenario.severity} Impact
            </span>
          </div>
        </div>

        <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
          isSelected ? 'border-rose-500 bg-rose-500' : 'border-neutral-800'
        }`}>
          {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-black"></span>}
        </div>
      </div>

      <p className="text-xs text-neutral-400 line-clamp-2">{scenario.description}</p>
    </div>
  );
}

export function ChaosResultCard({ result, isRunning }) {
  if (isRunning) {
    return (
      <div className="glass-panel rounded-2xl p-8 border-rose-500/40 bg-rose-950/20 text-center flex flex-col items-center justify-center min-h-[300px]">
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-full border-4 border-rose-500/20 border-t-rose-500 animate-spin"></div>
          <Flame className="h-6 w-6 text-rose-400 absolute inset-0 m-auto animate-pulse" />
        </div>
        <h4 className="text-lg font-bold text-rose-300">INJECTING FAULT INTO SHADOW LAB...</h4>
        <p className="text-xs text-neutral-400 max-w-xs mt-1">
          Observing node dropouts, retry loops, and failover latency...
        </p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="glass-panel rounded-2xl p-8 border-neutral-900 text-center flex flex-col items-center justify-center min-h-[300px]">
        <ShieldAlert className="h-12 w-12 text-neutral-600 mb-3" />
        <h4 className="text-base font-semibold text-neutral-300">No Chaos Test Executed Yet</h4>
        <p className="text-xs text-neutral-500 max-w-sm mt-1">
          Select a fault scenario on the left and click "Run Chaos Experiment" to evaluate resilience.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-6 border-rose-500/30 bg-neutral-950 relative overflow-hidden shadow-xl">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-900">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">RESILIENCE TEST RESULT</span>
          <h3 className="font-extrabold text-white text-base">{result.title}</h3>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-neutral-400 uppercase font-bold block">Resilience Score</span>
          <span className="text-2xl font-black text-emerald-400 font-mono">{result.resilienceScore} <span className="text-xs text-neutral-500 font-normal">/ 100</span></span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="rounded-xl bg-black p-3 border border-neutral-900">
          <span className="text-[10px] text-neutral-400 uppercase font-semibold">Production</span>
          <div className="flex items-center gap-1.5 font-bold text-emerald-400 text-xs mt-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>🟢 {result.prodStatus}</span>
          </div>
        </div>

        <div className="rounded-xl bg-black p-3 border border-neutral-900">
          <span className="text-[10px] text-neutral-400 uppercase font-semibold">Shadow Lab</span>
          <div className="flex items-center gap-1.5 font-bold text-rose-400 text-xs mt-1">
            <span className="h-2 w-2 rounded-full bg-rose-400 animate-ping"></span>
            <span>🔴 {result.shadowStatus}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5 text-xs">
        <div className="rounded-xl bg-neutral-900/60 p-3 border border-neutral-800">
          <span className="text-neutral-400 text-[11px]">Downtime</span>
          <p className="font-bold text-slate-100 mt-0.5">{result.downtime}</p>
        </div>
        <div className="rounded-xl bg-neutral-900/60 p-3 border border-neutral-800">
          <span className="text-neutral-400 text-[11px]">Recovery Time</span>
          <p className="font-bold text-emerald-400 mt-0.5">{result.recoveryTime}</p>
        </div>
      </div>

      <div className="rounded-xl bg-rose-950/30 border border-rose-500/30 p-3.5 text-xs text-rose-200">
        <span className="font-bold text-rose-400 block mb-1">Identified Weakness:</span>
        <p className="text-slate-300 text-[11px] leading-relaxed">{result.weakness}</p>
      </div>
    </div>
  );
}
