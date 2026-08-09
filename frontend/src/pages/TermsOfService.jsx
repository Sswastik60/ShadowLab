import React from 'react';
import { ShieldAlert, Scale, CheckCircle2, Zap, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TermsOfService() {
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
          <Scale className="h-4 w-4" />
          <span>Terms Agreement Active</span>
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">PLATFORM TERMS</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-neutral-400 font-mono">
          Last Updated: August 9, 2026 • ZeroOps Hackathon 2026 License Terms
        </p>
      </div>

      {/* Sections Grid */}
      <div className="space-y-6 text-sm text-neutral-300 leading-relaxed font-sans">
        <div className="glass-panel p-6 rounded-2xl bg-neutral-950 border-neutral-900 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-emerald-400" />
            1. Zero Blast Radius Guarantee & Use of Shadow Labs
          </h2>
          <p>
            ShadowLabs is designed to clone production topologies into isolated benchmarking environments. All synthetic load testing, Valkey cache attachments, and Chaos Lab fault injections must be conducted inside the designated <strong>Shadow Lab</strong> container clones.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl bg-neutral-950 border-neutral-900 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-emerald-400" />
            2. Production Promotion & Confirmation
          </h2>
          <p>
            The <strong>"Promote to Production"</strong> feature executes changes against active Zerops platform services. Users are responsible for reviewing Groq Llama-3.3 AI recommendations and verifying experimental metrics prior to confirming production promotion.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl bg-neutral-950 border-neutral-900 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            3. Limitation of Liability & AI Recommendations
          </h2>
          <p>
            Groq Llama-3.3 AI audit outputs and simulated resilience scores serve as decision-support insights for SREs and developers. ShadowLabs is provided under the MIT License without implied warranty for external production outages caused by misconfigured third-party scripts.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl bg-neutral-950 border-neutral-900 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            4. Acceptable Use & Hackathon Open Source License
          </h2>
          <p>
            This codebase is open-source under the MIT License. Users agree not to utilize synthetic traffic burst tools for malicious distributed denial-of-service (DDoS) attacks against third-party endpoints.
          </p>
        </div>
      </div>
    </div>
  );
}
