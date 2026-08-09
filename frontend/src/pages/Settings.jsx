import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { Settings as SettingsIcon, Key, Server, Cpu, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function Settings() {
  const { project, showNotification } = useProject();

  const [zeropsToken, setZeropsToken] = useState('ztoken_live_hackathon_demo_98243');
  const [zeropsEndpoint, setZeropsEndpoint] = useState('https://api.zerops.io/v1');
  const [groqKey, setGroqKey] = useState('gsk_groq_live_llama33_hackathon_2026');
  const [groqModel, setGroqModel] = useState('llama-3.3-70b-versatile');

  const handleSave = (e) => {
    e.preventDefault();
    showNotification('Zerops API Token & Groq AI settings saved successfully!', 'success');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="pb-6 border-b border-neutral-900">
        <div className="flex items-center gap-2 mb-1">
          <SettingsIcon className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">CONFIGURATION</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight m-0">
          Settings & API Credentials
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Manage Zerops platform integration and Groq AI Analyst model parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Zerops Integration Card */}
        <div className="glass-panel rounded-2xl p-6 border-neutral-900 bg-neutral-950 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Zerops Platform API</h3>
              <p className="text-xs text-neutral-400">Authentication token for managing Zerops services & cloning projects</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Zerops Access Token
            </label>
            <div className="relative">
              <input
                type="password"
                value={zeropsToken}
                onChange={(e) => setZeropsToken(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black border border-neutral-900 text-slate-100 text-sm font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Zerops API Endpoint
            </label>
            <input
              type="text"
              value={zeropsEndpoint}
              onChange={(e) => setZeropsEndpoint(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black border border-neutral-900 text-slate-100 text-sm font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Groq AI Analyst Credentials Card */}
        <div className="glass-panel rounded-2xl p-6 border-emerald-500/20 bg-neutral-950 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-900">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span>Groq AI Analyst Engine</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    Active LLM
                  </span>
                </h3>
                <p className="text-xs text-neutral-400">Groq High-Speed Llama-3.3 inference engine for telemetry analysis</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Groq API Key (GROQ_API_KEY)
            </label>
            <input
              type="password"
              value={groqKey}
              onChange={(e) => setGroqKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black border border-neutral-900 text-slate-100 text-sm font-mono focus:outline-none focus:border-emerald-500"
              placeholder="gsk_..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Target Groq LLM Model
            </label>
            <select
              value={groqModel}
              onChange={(e) => setGroqModel(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black border border-neutral-900 text-slate-100 text-sm font-mono focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile (Recommended)</option>
              <option value="llama-3.1-8b-instant">llama-3.1-8b-instant (Fast)</option>
              <option value="mixtral-8x7b-32768">mixtral-8x7b-32768</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold tracking-wider uppercase transition-all cursor-pointer shadow-md shadow-emerald-500/20 flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
