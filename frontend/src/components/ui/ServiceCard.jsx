import React from 'react';
import { Server, Database, Zap, Cpu, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ServiceCard({ service }) {
  const getIcon = () => {
    switch (service.type) {
      case 'app':
        return Server;
      case 'db':
        return Database;
      case 'cache':
        return Zap;
      default:
        return Cpu;
    }
  };

  const Icon = getIcon();
  const isHealthy = service.status === 'healthy';

  return (
    <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl border ${
            isHealthy 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-slate-800/80 border-slate-700 text-slate-400'
          }`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-100 text-sm">{service.name}</h4>
            <span className="text-[11px] text-slate-400 font-mono">{service.runtime || service.version}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-slate-900">
          {isHealthy ? (
            <>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-emerald-400">Healthy</span>
            </>
          ) : (
            <>
              <span className="h-2 w-2 rounded-full bg-slate-500"></span>
              <span className="text-slate-400">Inactive</span>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        {service.instances && (
          <div className="rounded-xl bg-slate-900/60 p-2.5 border border-slate-800">
            <span className="text-slate-400 text-[10px]">Workers / Containers</span>
            <p className="font-bold text-slate-200 text-sm mt-0.5">{service.instances} Workers</p>
          </div>
        )}

        {service.cpuUsage !== undefined && (
          <div className="rounded-xl bg-slate-900/60 p-2.5 border border-slate-800">
            <span className="text-slate-400 text-[10px]">CPU Utilization</span>
            <p className="font-bold text-slate-200 text-sm mt-0.5">{service.cpuUsage}% CPU</p>
          </div>
        )}

        {service.load !== undefined && (
          <div className="rounded-xl bg-slate-900/60 p-2.5 border border-slate-800">
            <span className="text-slate-400 text-[10px]">Database Load</span>
            <p className="font-bold text-slate-200 text-sm mt-0.5">{service.load}% Load</p>
          </div>
        )}

        {service.connections !== undefined && (
          <div className="rounded-xl bg-slate-900/60 p-2.5 border border-slate-800">
            <span className="text-slate-400 text-[10px]">Connections</span>
            <p className="font-bold text-slate-200 text-sm mt-0.5">{service.connections} conn</p>
          </div>
        )}

        {service.latency !== undefined && (
          <div className="rounded-xl bg-slate-900/60 p-2.5 border border-slate-800">
            <span className="text-slate-400 text-[10px]">Avg Latency</span>
            <p className="font-bold text-emerald-400 text-sm mt-0.5">{service.latency}ms</p>
          </div>
        )}

        {service.hitRate !== undefined && (
          <div className="rounded-xl bg-neutral-950 p-2.5 border border-neutral-900">
            <span className="text-neutral-400 text-[10px]">Cache Hit Rate</span>
            <p className="font-bold text-emerald-400 text-sm mt-0.5">{service.hitRate}</p>
          </div>
        )}
      </div>
    </div>
  );
}
