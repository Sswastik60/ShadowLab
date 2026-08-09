import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans p-6 md:p-12 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-neutral-900">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-bold transition-all cursor-pointer border border-neutral-800"
        >
          <ArrowLeft className="h-4 w-4 text-emerald-400" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
          <ShieldCheck className="h-4 w-4" />
          <span>Privacy Verified & Encrypted</span>
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">LEGAL COMPLIANCE</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-neutral-400 font-mono">
          Last Updated: August 9, 2026 • Effective Date: ZeroOps Hackathon 2026 Release
        </p>
      </div>

      {/* Policy Sections Grid */}
      <div className="space-y-6 text-sm text-neutral-300 leading-relaxed font-sans">
        <div className="glass-panel p-6 rounded-2xl bg-neutral-950 border-neutral-900 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock className="h-5 w-5 text-emerald-400" />
            1. Security of API Tokens & Credentials
          </h2>
          <p>
            ShadowLabs prioritizes the security of your cloud credentials. All Zerops platform tokens (<code className="text-emerald-400 bg-neutral-900 px-1.5 py-0.5 rounded font-mono">ZEROPS_TOKEN</code>) and AI model keys (<code className="text-emerald-400 bg-neutral-900 px-1.5 py-0.5 rounded font-mono">GROQ_API_KEY</code>) are processed exclusively in-memory or stored within your environment configuration (<code className="text-neutral-300 bg-neutral-900 px-1.5 py-0.5 rounded font-mono">.env</code>).
          </p>
          <ul className="list-disc list-inside space-y-1 text-neutral-400 text-xs pl-2">
            <li>We do NOT sell, log, or transmit your API keys to unauthorized third parties.</li>
            <li>Groq AI queries process anonymized infrastructure metrics only (latency, QPS, DB load %).</li>
          </ul>
        </div>

        <div className="glass-panel p-6 rounded-2xl bg-neutral-950 border-neutral-900 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Eye className="h-5 w-5 text-emerald-400" />
            2. Data Collection & Telemetry Analytics
          </h2>
          <p>
            When utilizing ShadowLabs for synthetic stress testing or chaos fault simulations, the system collects synthetic telemetry metrics including:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-black border border-neutral-900">
              <span className="text-emerald-400 font-bold block mb-1">⚡ API Latency (ms)</span>
              <span>Response time averages between production and shadow lab clones.</span>
            </div>
            <div className="p-3 rounded-xl bg-black border border-neutral-900">
              <span className="text-amber-400 font-bold block mb-1">🟢 Database Load (%)</span>
              <span>PostgreSQL & Valkey connection utilization percentages.</span>
            </div>
            <div className="p-3 rounded-xl bg-black border border-neutral-900">
              <span className="text-rose-400 font-bold block mb-1">🔥 Resilience Scores</span>
              <span>Fault recovery times during simulated chaos experiments.</span>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl bg-neutral-950 border-neutral-900 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-400" />
            3. GitHub Repository Inspection
          </h2>
          <p>
            When utilizing the <strong>GitHub Repository Cloner & Inspector</strong>, ShadowLabs accesses public repository structure (<code className="text-neutral-300 font-mono">package.json</code>, <code className="text-neutral-300 font-mono">Dockerfile</code>, <code className="text-neutral-300 font-mono">zerops.yaml</code>) via GitHub's public REST API to auto-configure zerops service recipes. Private repository access requires explicit user authentication.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl bg-neutral-950 border-neutral-900 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            4. Your Control & Data Rights
          </h2>
          <p>
            You retain 100% ownership of your infrastructure benchmark reports. You can delete experiments, export SRE audit logs in Markdown format, or reset your persistent PostgreSQL storage at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
