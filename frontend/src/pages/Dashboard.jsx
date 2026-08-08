import React from 'react';
import { useProject } from '../context/ProjectContext';
import MetricCard from '../components/ui/MetricCard';
import ServiceCard from '../components/ui/ServiceCard';
import Architecture from '../components/ui/Architecture';
import { Server, Database, Zap, Activity, ArrowRight, ShieldCheck, Beaker } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ onOpenCreateModal }) {
  const { project, activeExperiment } = useProject();
  const navigate = useNavigate();

  const apiService = project.services.find((s) => s.type === 'app');
  const dbService = project.services.find((s) => s.type === 'db');
  const cacheService = project.services.find((s) => s.type === 'cache');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">🟢 PRODUCTION ENVIRONMENT</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight m-0">
            {project.name}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Live telemetry & service topology on Zerops ({project.region})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/experiments')}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all"
          >
            <Beaker className="h-4 w-4 text-emerald-400" />
            <span>Active Lab Experiments</span>
          </button>

          <button
            onClick={onOpenCreateModal}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 text-xs font-extrabold flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
          >
            <span>Create Experiment</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Production Health Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="API SERVICE"
          value={apiService ? `${apiService.latency}ms` : '184ms'}
          subtitle="🟢 Healthy • 42% CPU"
          icon={Server}
          status="healthy"
        />

        <MetricCard
          title="DATABASE (PostgreSQL)"
          value={dbService ? `${dbService.load}%` : '61%'}
          subtitle="🟢 Healthy • 420 connections"
          icon={Database}
          status="healthy"
        />

        <MetricCard
          title="CACHE TIER (Valkey)"
          value={cacheService && cacheService.status === 'healthy' ? cacheService.hitRate : '0%'}
          subtitle={cacheService && cacheService.status === 'healthy' ? '🟢 Active Cache Tier' : '⚪ Inactive in Production'}
          icon={Zap}
          status={cacheService && cacheService.status === 'healthy' ? 'healthy' : 'neutral'}
        />
      </div>

      {/* Services Grid & Architecture Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Connected Services</h3>
          {project.services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="lg:col-span-2">
          <Architecture topology={project.topology} />
        </div>
      </div>

      {/* Hero Banner Prompting Experiment Creation */}
      <div className="glass-panel rounded-2xl p-6 border-emerald-500/20 bg-gradient-to-r from-slate-900 via-emerald-950/20 to-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Beaker className="h-5 w-5 text-emerald-400" />
            <span>Ready to test production performance changes?</span>
          </h4>
          <p className="text-xs text-slate-400 max-w-xl">
            Clone your active production project into a isolated **Shadow Lab** environment. Test adding Valkey, auto-scaling API workers, or injecting chaos faults with zero risk to production users.
          </p>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="shrink-0 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black tracking-wider uppercase shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
        >
          Launch Shadow Lab
        </button>
      </div>
    </div>
  );
}
