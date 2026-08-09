import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { Beaker, Activity, CheckCircle2, RefreshCw, AlertTriangle, ArrowRight } from 'lucide-react';
import appLogo from '../../assets/app logo.png';

export default function Navbar({ onOpenConnectModal, onOpenCreateModal }) {
  const { project, isConnected, notification } = useProject();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 p-1 shadow-lg shadow-emerald-500/10">
            <img src={appLogo} alt="ShadowLab Logo" className="h-full w-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">Shadow<span className="text-emerald-400">Labs</span></span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                v1.0 MVP
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Experiment on production without touching production.</p>
          </div>
        </div>

        {/* Center Banner / Notification */}
        {notification ? (
          <div className={`hidden md:flex items-center gap-2 px-4 py-1.5 rounded-lg border text-xs font-medium ${
            notification.type === 'success' ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300' :
            notification.type === 'warning' ? 'bg-amber-950/60 border-amber-500/30 text-amber-300' :
            'bg-cyan-950/60 border-cyan-500/30 text-cyan-300'
          }`}>
            {notification.type === 'warning' ? <AlertTriangle className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
            {notification.message}
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Zerops Environment Synced
          </div>
        )}

        {/* Action controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenConnectModal}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-all cursor-pointer"
          >
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            <span>{isConnected ? project.name : 'Connect Zerops'}</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          </button>

          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-slate-950 shadow-md shadow-emerald-500/20 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Beaker className="h-4 w-4" />
            <span>New Experiment</span>
          </button>
        </div>
      </div>
    </header>
  );
}
