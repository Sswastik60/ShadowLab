import React from 'react';
import { Link } from 'react-router-dom';
import { useProject } from '../../context/ProjectContext';
import { Beaker, Activity, CheckCircle2, RefreshCw, AlertTriangle, ArrowRight, GitBranch } from 'lucide-react';
import appLogo from '../../assets/app logo.png';

export default function Navbar({ onOpenConnectModal, onOpenCreateModal, onOpenGithubModal }) {
  const { project, isConnected, notification } = useProject();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-900 bg-black/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 border border-neutral-800 p-1 shadow-lg shadow-emerald-500/10 group-hover:border-emerald-500/40 transition-all">
            <img src={appLogo} alt="ShadowLab Logo" className="h-full w-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">Shadow<span className="text-emerald-400">Labs</span></span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                v1.0 MVP
              </span>
            </div>
            <p className="text-xs text-neutral-400 hidden sm:block">Experiment on production without touching production.</p>
          </div>
        </Link>

        {/* Center Banner / Notification */}
        {notification ? (
          <div className={`hidden md:flex items-center gap-2 px-4 py-1.5 rounded-lg border text-xs font-medium ${
            notification.type === 'success' ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300' :
            notification.type === 'warning' ? 'bg-amber-950/80 border-amber-500/30 text-amber-300' :
            'bg-emerald-950/80 border-emerald-500/30 text-emerald-300'
          }`}>
            {notification.type === 'warning' ? <AlertTriangle className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
            {notification.message}
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-2 text-xs text-neutral-400 bg-neutral-950/80 px-3 py-1.5 rounded-lg border border-neutral-900">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Zerops Environment Synced
          </div>
        )}

        {/* Action controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenGithubModal}
            className="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-100 border border-neutral-800 transition-all cursor-pointer shadow-sm"
          >
            <GitBranch className="h-4 w-4 text-emerald-400" />
            <span className="hidden sm:inline">Import GitHub Repo</span>
          </button>

          <button
            onClick={onOpenConnectModal}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-neutral-950 hover:bg-neutral-900 text-neutral-200 border border-neutral-800 transition-all cursor-pointer"
          >
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            <span>{isConnected ? project.name : 'Connect Zerops'}</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          </button>

          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black shadow-md shadow-emerald-500/20 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Beaker className="h-4 w-4" />
            <span>New Experiment</span>
          </button>
        </div>
      </div>
    </header>
  );
}
