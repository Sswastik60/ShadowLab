import React from 'react';
import { Sparkles, AlertTriangle, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export default function AIAnalysisCard({ analysis, experimentId }) {
  const { promoteExperimentToProduction } = useProject();

  if (!analysis) return null;

  const isSuccess = analysis.resultType === 'success' || analysis.canPromote;

  return (
    <div className="glass-panel rounded-2xl p-6 border-emerald-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950/90 relative overflow-hidden shadow-2xl">
      {/* Decorative ambient glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Card Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm tracking-wide flex items-center gap-2">
              <span>AI EXPERIMENT ANALYST</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Gemini Engine
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">Automated performance & risk assessment</p>
          </div>
        </div>

        <div className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
          isSuccess 
            ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400 glow-emerald' 
            : 'bg-amber-950/80 border-amber-500/50 text-amber-400'
        }`}>
          RESULT: {analysis.result}
        </div>
      </div>

      {/* Main Headline */}
      <div className="mb-5">
        <h4 className="text-lg font-extrabold text-white tracking-tight leading-snug">
          {analysis.headline}
        </h4>
      </div>

      {/* Main Reasons Bullet List */}
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-emerald-400" />
          Main Reasons
        </p>
        <ul className="space-y-2">
          {analysis.reasons?.map((reason, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-200 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <span className="text-emerald-400 font-bold">•</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Risk Warning Section */}
      {analysis.risks && analysis.risks.length > 0 && (
        <div className="mb-6 rounded-xl bg-amber-950/30 border border-amber-500/30 p-3.5 text-xs text-amber-200">
          <div className="flex items-center gap-2 font-bold mb-1 text-amber-400">
            <AlertTriangle className="h-4 w-4" />
            <span>Potential Risk Identified</span>
          </div>
          {analysis.risks.map((risk, idx) => (
            <p key={idx} className="text-slate-300 text-[11px] leading-relaxed">
              {risk}
            </p>
          ))}
        </div>
      )}

      {/* Recommendation & Hero Promote Button */}
      <div className="pt-4 border-t border-slate-800">
        <p className="text-xs font-semibold text-slate-400 mb-3">Recommendation</p>

        {analysis.canPromote ? (
          <button
            onClick={() => promoteExperimentToProduction(experimentId)}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-extrabold text-sm tracking-wide shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
          >
            <ShieldCheck className="h-5 w-5 text-slate-950" />
            <span>PROMOTE TO PRODUCTION</span>
            <ArrowRight className="h-4 w-4 text-slate-950" />
          </button>
        ) : (
          <div className="w-full py-3 px-4 rounded-xl bg-slate-800 text-slate-400 font-bold text-xs text-center border border-slate-700 flex items-center justify-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>ALREADY PROMOTED TO PRODUCTION</span>
          </div>
        )}
      </div>
    </div>
  );
}
