import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { Settings as SettingsIcon, Key, Server, Cpu, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Settings() {
  const { project, showNotification } = useProject();

  const [zeropsToken, setZeropsToken] = useState('ztoken_live_hackathon_demo_98243');
  const [zeropsEndpoint, setZeropsEndpoint] = useState('https://api.zerops.io/v1');
  const [geminiKey, setGeminiKey] = useState('AIzaSy_DemoGeminiKey_Hackathon2026');

  const handleSave = (e) => {
    e.preventDefault();
    showNotification('Settings updated successfully!', 'success');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <SettingsIcon className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">CONFIGURATION</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight m-0">
          Settings & API Credentials
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage Zerops platform integration and AI Analyst model parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Zerops Integration Card */}
        <div className="glass-panel rounded-2xl p-6 border-slate-800 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Zerops Platform API</h3>
              <p className="text-xs text-slate-400">Authentication token for managing Zerops services & cloning projects</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Zerops Access Token
            </label>
            <div className="relative">
              <input
                type="password"
                value={zeropsToken}
                onChange={(e) => setZeropsToken(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Zerops API Endpoint
            </label>
            <input
              type="text"
              value={zeropsEndpoint}
              onChange={(e) => setZeropsEndpoint(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* AI Analyst Credentials Card */}
        <div className="glass-panel rounded-2xl p-6 border-slate-800 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">AI Analyst Engine</h3>
              <p className="text-xs text-slate-400">Gemini LLM API key for evaluating experiment telemetries</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Gemini API Key
            </label>
            <input
              type="password"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold tracking-wider uppercase transition-all cursor-pointer shadow-md shadow-emerald-500/20"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
