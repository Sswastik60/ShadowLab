import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function ComparisonChart({ history, title = 'Latency Comparison (ms)' }) {
  const data = history || [
    { time: '00:00', prodLatency: 420, shadowLatency: 170 },
    { time: '00:05', prodLatency: 435, shadowLatency: 165 },
    { time: '00:10', prodLatency: 418, shadowLatency: 168 },
    { time: '00:15', prodLatency: 440, shadowLatency: 162 },
    { time: '00:20', prodLatency: 420, shadowLatency: 167 },
  ];

  return (
    <div className="glass-panel rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-slate-100 text-sm">{title}</h4>
          <p className="text-xs text-slate-400">Live telemetry trace over time</p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-rose-500/80"></span>
            <span className="text-slate-300 font-medium">Production</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-emerald-400"></span>
            <span className="text-emerald-400 font-semibold">Shadow Lab</span>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorShadow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#475569" fontSize={11} tickLine={false} />
            <YAxis stroke="#475569" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
              itemStyle={{ color: '#f8fafc' }}
            />
            <Area type="monotone" dataKey="prodLatency" name="Production (ms)" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorProd)" />
            <Area type="monotone" dataKey="shadowLatency" name="Shadow Lab (ms)" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorShadow)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
