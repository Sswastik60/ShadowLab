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
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black text-xs font-extrabold flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 transition-all"
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
                  : 'border-neutral-900 hover:border-neutral-800 bg-neutral-950'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-neutral-400 font-mono">🧪 {exp.id}</span>
                    <span className="text-[10px] text-neutral-500">• {exp.createdAt}</span>
                  </div>
                  <h3 className="font-bold text-slate-100 text-base">{exp.name}</h3>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                  exp.status === 'running' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                  exp.status === 'promoted' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                  'bg-neutral-900 border-neutral-800 text-neutral-400'
                }`}>
                  {exp.status === 'running' ? 'RUNNING ●' : exp.status.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-neutral-900">
                <span className="text-neutral-400">Baseline: <strong className="text-neutral-200">{exp.basedOn}</strong></span>
                <span className="text-emerald-400 font-bold font-mono">⚡ {exp.trafficRate} req/sec stress</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Split View Experiment Details */}
      {activeExperiment && (
        <div className="space-y-6 pt-4 border-t border-neutral-900">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Production (Left Side) */}
            <div className="glass-panel rounded-2xl p-6 border-neutral-900">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-900">
                <div>
                  <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">PRODUCTION (Baseline)</span>
                  <h3 className="text-lg font-extrabold text-slate-100">Live Traffic Target</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                  ACTIVE 100%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-900 text-xs">
                  <span className="text-neutral-400 font-medium">Avg Latency:</span>
                  <p className="text-lg font-black text-slate-100 font-mono mt-0.5">
                    {activeExperiment.metrics.production.latency} ms
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-900 text-xs">
                  <span className="text-neutral-400 font-medium">DB Connection Load:</span>
                  <p className="text-lg font-black text-amber-400 font-mono mt-0.5">
                    {activeExperiment.metrics.production.dbLoad} %
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-900 space-y-2">
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">ZeroOps Service Topology</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-300">API Container Workers</span>
                  <span className="font-mono font-bold text-emerald-400">2 Instances</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-300">Database Engine</span>
                  <span className="font-mono font-bold text-slate-200">PostgreSQL 16 (Primary)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-300">In-Memory Cache</span>
                  <span className="font-mono text-neutral-500">Not Configured</span>
                </div>
              </div>
            </div>

            {/* Shadow Lab (Right Side) */}
            <div className="glass-panel rounded-2xl p-6 border-emerald-500/40 bg-neutral-950 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-900">
                <div>
                  <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">SHADOW LAB (Experimental Clone)</span>
                  <h3 className="text-lg font-extrabold text-slate-100">{activeExperiment.name}</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                  ISOLATED LAB
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs">
                  <span className="text-neutral-400 font-medium">Shadow Latency:</span>
                  <p className="text-lg font-black text-emerald-400 font-mono mt-0.5">
                    {activeExperiment.metrics.shadow.latency} ms
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs">
                  <span className="text-neutral-400 font-medium">Cache Tier:</span>
                  <p className="font-bold text-emerald-400 mt-0.5">
                    {activeExperiment.infraChanges?.addValkey ? '⚡ Valkey Cache Attached' : '⚪ Direct DB Query'}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-neutral-300">
                  <span>Latency Reduction</span>
                  <span className="text-emerald-400 font-bold">
                    -{Math.round(((activeExperiment.metrics.production.latency - activeExperiment.metrics.shadow.latency) / activeExperiment.metrics.production.latency) * 100)}% Faster
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span className="w-24 text-neutral-400 text-[11px]">Production</span>
                    <div className="flex-1 bg-black rounded-full h-5 overflow-hidden p-0.5 border border-neutral-900">
                      <div className="bg-rose-500/80 h-full rounded-full flex items-center justify-end px-2 text-[10px] text-white font-bold" style={{ width: '85%' }}>
                        {activeExperiment.metrics.production.latency}ms
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-24 text-emerald-400 font-bold text-[11px]">Shadow Lab</span>
                    <div className="flex-1 bg-black rounded-full h-5 overflow-hidden p-0.5 border border-neutral-900">
                      <div className="bg-emerald-500 h-full rounded-full flex items-center justify-end px-2 text-[10px] text-black font-bold" style={{ width: '38%' }}>
                        {activeExperiment.metrics.shadow.latency}ms
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Database Load Bar Comparison */}
              <div className="space-y-2 pt-4 border-t border-neutral-900 mt-4">
                <div className="flex justify-between text-xs font-semibold text-neutral-300">
                  <span>Database Load</span>
                  <span className="text-emerald-400 font-bold">
                    -{activeExperiment.metrics.production.dbLoad - activeExperiment.metrics.shadow.dbLoad}% Load Reduction
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span className="w-24 text-neutral-400 text-[11px]">Production</span>
                    <div className="flex-1 bg-black rounded-full h-5 overflow-hidden p-0.5 border border-neutral-900">
                      <div className="bg-rose-500/80 h-full rounded-full flex items-center justify-end px-2 text-[10px] text-white font-bold" style={{ width: `${activeExperiment.metrics.production.dbLoad}%` }}>
                        {activeExperiment.metrics.production.dbLoad}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-24 text-emerald-400 font-bold text-[11px]">Shadow Lab</span>
                    <div className="flex-1 bg-black rounded-full h-5 overflow-hidden p-0.5 border border-neutral-900">
                      <div className="bg-emerald-400 h-full rounded-full flex items-center justify-end px-2 text-[10px] text-black font-bold" style={{ width: `${activeExperiment.metrics.shadow.dbLoad}%` }}>
                        {activeExperiment.metrics.shadow.dbLoad}%
                      </div>
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
