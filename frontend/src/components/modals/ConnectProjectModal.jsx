import React, { useState } from 'react';
import { X, Activity, CheckCircle2 } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export default function ConnectProjectModal({ isOpen, onClose }) {
  const { project, connectProject } = useProject();
  const [projectIdInput, setProjectIdInput] = useState(project.id || 'my-production-app');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    connectProject(projectIdInput.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="glass-panel w-full max-w-md rounded-2xl p-6 border-slate-700 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-lg">Connect Zerops Project</h3>
            <p className="text-xs text-slate-400">Sync production environment & service topology</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Project ID
            </label>
            <input
              type="text"
              value={projectIdInput}
              onChange={(e) => setProjectIdInput(e.target.value)}
              placeholder="e.g. my-production-app"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:border-emerald-500 transition-all"
              required
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Enter your active Zerops project name or environment identifier.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="flex items-center gap-2 font-medium text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Detected Production Services:</span>
            </div>
            <p className="pl-6 font-mono text-[11px] text-slate-400">
              • node-api (2 Workers)
              <br />
              • postgres-db (v16)
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-xl text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all cursor-pointer shadow-md shadow-emerald-500/20"
            >
              Connect Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
