import React, { useState } from 'react';
import { X, Beaker, Check, Plus, Server, Zap, Cpu, Database } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export default function CreateExperimentModal({ isOpen, onClose }) {
  const { createExperiment } = useProject();

  const [name, setName] = useState('Redis / Valkey Cache Optimization');
  const [basedOn, setBasedOn] = useState('Production');
  const [trafficRate, setTrafficRate] = useState(1000);
  const [infraChanges, setInfraChanges] = useState({
    addValkey: true,
    increaseWorkers: false,
    changeNodeVersion: false,
    changeDatabase: false,
    increaseMemory: true,
  });

  if (!isOpen) return null;

  const toggleInfraChange = (key) => {
    setInfraChanges((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createExperiment({
      name: name.trim() || 'New Shadow Experiment',
      basedOn,
      trafficRate,
      infraChanges,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="glass-panel w-full max-w-xl rounded-2xl p-6 border-slate-700 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Beaker className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-100 text-xl tracking-tight">CREATE SHADOW EXPERIMENT</h3>
            <p className="text-xs text-slate-400">Configure clone environment & stress parameters</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Experiment Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Experiment Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Redis optimization"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-all"
              required
            />
          </div>

          {/* Based On Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Based On
            </label>
            <div className="flex items-center gap-6 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                <input
                  type="radio"
                  name="basedOn"
                  checked={basedOn === 'Production'}
                  onChange={() => setBasedOn('Production')}
                  className="accent-emerald-500"
                />
                <span className="font-semibold">● Production Baseline</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200">
                <input
                  type="radio"
                  name="basedOn"
                  checked={basedOn === 'Previous experiment'}
                  onChange={() => setBasedOn('Previous experiment')}
                  className="accent-emerald-500"
                />
                <span>○ Previous Experiment</span>
              </label>
            </div>
          </div>

          {/* Infrastructure Changes Checkboxes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Infrastructure Changes
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div
                onClick={() => toggleInfraChange('addValkey')}
                className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  infraChanges.addValkey
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className={`h-4 w-4 rounded border flex items-center justify-center ${
                  infraChanges.addValkey ? 'border-emerald-400 bg-emerald-500 text-slate-950' : 'border-slate-700'
                }`}>
                  {infraChanges.addValkey && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
                <Zap className="h-4 w-4 text-emerald-400" />
                <span className="font-semibold">Add Valkey Cache</span>
              </div>

              <div
                onClick={() => toggleInfraChange('increaseWorkers')}
                className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  infraChanges.increaseWorkers
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className={`h-4 w-4 rounded border flex items-center justify-center ${
                  infraChanges.increaseWorkers ? 'border-emerald-400 bg-emerald-500 text-slate-950' : 'border-slate-700'
                }`}>
                  {infraChanges.increaseWorkers && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
                <Server className="h-4 w-4 text-emerald-400" />
                <span className="font-semibold">Increase API Workers (2 -&gt; 4)</span>
              </div>

              <div
                onClick={() => toggleInfraChange('increaseMemory')}
                className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  infraChanges.increaseMemory
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className={`h-4 w-4 rounded border flex items-center justify-center ${
                  infraChanges.increaseMemory ? 'border-emerald-400 bg-emerald-500 text-slate-950' : 'border-slate-700'
                }`}>
                  {infraChanges.increaseMemory && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
                <Cpu className="h-4 w-4 text-emerald-400" />
                <span className="font-semibold">Increase Memory (1GB -&gt; 2GB)</span>
              </div>

              <div
                onClick={() => toggleInfraChange('changeDatabase')}
                className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  infraChanges.changeDatabase
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className={`h-4 w-4 rounded border flex items-center justify-center ${
                  infraChanges.changeDatabase ? 'border-emerald-400 bg-emerald-500 text-slate-950' : 'border-slate-700'
                }`}>
                  {infraChanges.changeDatabase && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
                <Database className="h-4 w-4 text-amber-400" />
                <span className="font-semibold">Scale DB Connection Limits</span>
              </div>
            </div>
          </div>

          {/* Traffic Simulation Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Traffic Simulation (req/sec)
            </label>
            <div className="grid grid-cols-4 gap-3 text-xs">
              {[
                { label: '100', value: 100 },
                { label: '500', value: 500 },
                { label: '1K', value: 1000 },
                { label: '5K', value: 5000 },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setTrafficRate(item.value)}
                  className={`py-2.5 rounded-xl border font-bold text-center transition-all cursor-pointer ${
                    trafficRate === item.value
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-black border-emerald-400 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  [ {item.label} ]
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold rounded-xl text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 text-xs font-extrabold rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 tracking-wider flex items-center gap-2"
            >
              <Beaker className="h-4 w-4" />
              <span>Create Lab</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
