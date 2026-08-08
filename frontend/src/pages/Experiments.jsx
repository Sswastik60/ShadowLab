import React from 'react';
import { useProject } from '../context/ProjectContext';
import MetricCard from '../components/ui/MetricCard';
import ComparisonChart from '../components/ui/ComparisonChart';
import AIAnalysisCard from '../components/ui/AIAnalysisCard';
import Architecture from '../components/ui/Architecture';
import { Beaker, Server, Zap, ArrowUpRight, CheckCircle2, Play, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Experiments({ onOpenCreateModal }) {
  const { experiments, activeExperiment, setActiveExperimentId, project } = useProject();
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Beaker className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">ISOLATED EXPERIMENT LABS</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight m-0">
            Shadow Experiments
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Safely benchmark production clones against infrastructure modifications
          </p>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 text-xs font-extrabold flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 transition-all"
        >
          <Beaker className="h-4 w-4" />
          <span>New Experiment</span>
        </button>
      </div>

      {/* Experiment Selector Cards Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {experiments.map((exp) => {
          const isSelected = exp.id === activeExperiment.id;
          return (
            <div
              key={exp.id}
              onClick={() => setActiveExperimentId(exp.id)}
              className={`glass-panel rounded-2xl p-5 border cursor-pointer transition-all ${
                isSelected
                  ? 'border-emerald-500/60 bg-emerald-950/20 glow-emerald'
                  : 'border-slate-800 hover:border-slate-700 bg-slate-900/40'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-slate-400 font-mono">🧪 {exp.id}</span>
                    <span className="text-[10px] text-slate-500">• {exp.createdAt}</span>
                  </div>
                  <h3 className="font-bold text-slate-100 text-base">{exp.name}</h3>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                  exp.status === 'running' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                  exp.status === 'promoted' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' :
                  'bg-slate-800 border-slate-700 text-slate-400'
                }`}>
                  {exp.status === 'running' ? 'RUNNING ●' : exp.status.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800/80">
                <span className="text-slate-400">Traffic: <strong className="text-slate-200">{exp.trafficRate} req/s</strong></span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  View Split Comparison <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section 4 of prompt: Obvious Difference View between PRODUCTION and SHADOW LAB */}
      {activeExperiment && (
        <div className="space-y-6 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-white m-0">🧪 {activeExperiment.name}</h2>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                RUNNING ●
              </span>
            </div>

            <button
              onClick={() => navigate(`/experiments/${activeExperiment.id}`)}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              Full Screen Split View <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Prompt Section 4 Layout: Clear visual distinction between Production & Shadow Lab */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PRODUCTION Card */}
            <div className="glass-panel rounded-2xl p-6 border-slate-800 bg-slate-950/60">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500"></span>
                  PRODUCTION (Baseline)
                </span>
                <span className="text-xs font-mono text-slate-500">my-production-app</span>
              </div>

              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                  <span className="text-slate-400 font-medium">API Container Pool:</span>
                  <p className="font-bold text-slate-200 mt-0.5">2 Workers (Standard Node.js 20)</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                  <span className="text-slate-400 font-medium">Cache Tier:</span>
                  <p className="font-bold text-slate-500 mt-0.5">⚪ No Cache Tier Configured</p>
                </div>
              </div>
            </div>

            {/* SHADOW LAB Card */}
            <div className="glass-panel rounded-2xl p-6 border-emerald-500/40 bg-emerald-950/20 glow-emerald">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-emerald-500/30">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  SHADOW LAB (Clone)
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Isolated Sandbox
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-xs">
                  <span className="text-slate-400 font-medium">API Container Pool:</span>
                  <p className="font-bold text-emerald-300 mt-0.5">
                    {activeExperiment.infraChanges?.increaseWorkers ? '4 Workers' : '2 Workers'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-xs">
                  <span className="text-slate-400 font-medium">Cache Tier:</span>
                  <p className="font-bold text-cyan-400 mt-0.5">
                    {activeExperiment.infraChanges?.addValkey ? '⚡ Valkey Cache Attached (In-Memory)' : '⚪ Standard Direct Database'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Comparison Indicators (As specified in prompt Section 4) */}
          <div className="glass-panel rounded-2xl p-6 space-y-6">
            <h4 className="font-bold text-slate-100 text-sm tracking-wider uppercase">PERFORMANCE METRICS DIFFERENTIAL</h4>

            {/* Latency Bar Comparison */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>Latency</span>
                <span className="text-emerald-400 font-bold">
                  -{Math.round(((activeExperiment.metrics.production.latency - activeExperiment.metrics.shadow.latency) / activeExperiment.metrics.production.latency) * 100)}% Faster
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="w-24 text-slate-400 text-[11px]">Production</span>
                  <div className="flex-1 bg-slate-900 rounded-full h-5 overflow-hidden p-0.5 border border-slate-800">
                    <div className="bg-rose-500/80 h-full rounded-full flex items-center justify-end px-2 text-[10px] text-white font-bold" style={{ width: '85%' }}>
                      {activeExperiment.metrics.production.latency}ms
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-24 text-emerald-400 font-bold text-[11px]">Shadow Lab</span>
                  <div className="flex-1 bg-slate-900 rounded-full h-5 overflow-hidden p-0.5 border border-slate-800">
                    <div className="bg-emerald-500 h-full rounded-full flex items-center justify-end px-2 text-[10px] text-slate-950 font-bold" style={{ width: '38%' }}>
                      {activeExperiment.metrics.shadow.latency}ms
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Database Load Bar Comparison */}
            <div className="space-y-2 pt-4 border-t border-slate-800">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>Database Load</span>
                <span className="text-cyan-400 font-bold">
                  -{activeExperiment.metrics.production.dbLoad - activeExperiment.metrics.shadow.dbLoad}% Load Reduction
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="w-24 text-slate-400 text-[11px]">Production</span>
                  <div className="flex-1 bg-slate-900 rounded-full h-5 overflow-hidden p-0.5 border border-slate-800">
                    <div className="bg-rose-500/80 h-full rounded-full flex items-center justify-end px-2 text-[10px] text-white font-bold" style={{ width: `${activeExperiment.metrics.production.dbLoad}%` }}>
                      {activeExperiment.metrics.production.dbLoad}%
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-24 text-emerald-400 font-bold text-[11px]">Shadow Lab</span>
                  <div className="flex-1 bg-slate-900 rounded-full h-5 overflow-hidden p-0.5 border border-slate-800">
                    <div className="bg-cyan-500 h-full rounded-full flex items-center justify-end px-2 text-[10px] text-slate-950 font-bold" style={{ width: `${activeExperiment.metrics.shadow.dbLoad}%` }}>
                      {activeExperiment.metrics.shadow.dbLoad}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recharts Live Chart & AI Analyst */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ComparisonChart history={activeExperiment.metrics.history} />
            </div>

            <div>
              <AIAnalysisCard
                analysis={activeExperiment.aiAnalysis}
                experimentId={activeExperiment.id}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
