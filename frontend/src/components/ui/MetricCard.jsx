import React from 'react';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

export default function MetricCard({ title, value, unit = '', subtitle, icon: Icon, status = 'neutral', trend, shadowValue, shadowUnit }) {
  const getStatusStyle = () => {
    switch (status) {
      case 'healthy':
      case 'success':
        return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10';
      case 'warning':
        return 'text-amber-400 border-amber-500/20 bg-amber-500/10';
      case 'danger':
        return 'text-rose-400 border-rose-500/20 bg-rose-500/10';
      default:
        return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10';
    }
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-slate-400">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-xl border ${getStatusStyle()}`}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-extrabold tracking-tight text-white">{value}</span>
        {unit && <span className="text-xs font-semibold text-slate-400">{unit}</span>}
      </div>

      {shadowValue !== undefined && (
        <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400">Shadow Lab:</span>
          <span className="font-bold text-emerald-400">{shadowValue} {shadowUnit || unit}</span>
        </div>
      )}

      {subtitle && (
        <p className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
          {trend === 'down' && <ArrowDownRight className="h-3.5 w-3.5 text-emerald-400" />}
          {trend === 'up' && <ArrowUpRight className="h-3.5 w-3.5 text-rose-400" />}
          {subtitle}
        </p>
      )}
    </div>
  );
}
