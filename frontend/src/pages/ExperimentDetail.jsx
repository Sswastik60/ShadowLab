import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import MetricCard from '../components/ui/MetricCard';
import ComparisonChart from '../components/ui/ComparisonChart';
import AIAnalysisCard from '../components/ui/AIAnalysisCard';
import Architecture from '../components/ui/Architecture';
import { ArrowLeft, Beaker, Zap, Server, Database, Activity, ShieldCheck } from 'lucide-react';

export default function ExperimentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { experiments, activeExperiment } = useProject();

  const exp = experiments.find((e) => e.id === id) || activeExperiment;

  if (!exp) return <div className="p-8 text-white">Experiment not found.</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Back button & Title */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/experiments')}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Beaker className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">LAB EXPERIMENT DETAIL</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight m-0">
              {exp.name}
            </h1>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          {exp.status.toUpperCase()} ●
        </span>
      </div>

      {/* Metric differentials */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="PRODUCTION LATENCY"
          value={`${exp.metrics.production.latency}ms`}
          shadowValue={`${exp.metrics.shadow.latency}ms`}
          shadowUnit="ms"
          subtitle="Lab is 60% faster"
          status="danger"
        />

        <MetricCard
          title="DATABASE LOAD"
          value={`${exp.metrics.production.dbLoad}%`}
          shadowValue={`${exp.metrics.shadow.dbLoad}%`}
          shadowUnit="%"
          subtitle="68% fewer DB reads"
          status="warning"
        />

        <MetricCard
          title="CACHE HIT RATE"
          value={`${exp.metrics.production.cacheHitRate}%`}
          shadowValue={`${exp.metrics.shadow.cacheHitRate}%`}
          shadowUnit="%"
          subtitle="Valkey In-Memory Tier"
          status="healthy"
        />

        <MetricCard
          title="THROUGHPUT (QPS)"
          value={`${exp.metrics.production.throughput}`}
          shadowValue={`${exp.metrics.shadow.throughput}`}
          shadowUnit="req/s"
          subtitle="Zero throttling"
          status="healthy"
        />
      </div>

      {/* Main split charts & AI Analyst */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ComparisonChart history={exp.metrics.history} />
          <Architecture shadowAdditions={exp.infraChanges} />
        </div>

        <div>
          <AIAnalysisCard analysis={exp.aiAnalysis} experimentId={exp.id} />
        </div>
      </div>
    </div>
  );
}
