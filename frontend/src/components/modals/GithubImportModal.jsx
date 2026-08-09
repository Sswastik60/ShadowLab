import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { GitBranch, X, ArrowRight, Loader2, Sparkles, CheckCircle2, ShieldCheck, Code, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GithubImportModal({ isOpen, onClose }) {
  const { importGithubRepo } = useProject();
  const navigate = useNavigate();

  const [repoUrl, setRepoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!repoUrl.trim()) return;

    setIsLoading(true);
    setStep(1); // Fetching repo tree

    try {
      setTimeout(() => setStep(2), 600); // Tech stack detection
      setTimeout(() => setStep(3), 1200); // Spawning Zerops shadow clone

      const result = await importGithubRepo(repoUrl.trim());
      setIsLoading(false);
      setStep(4);

      setTimeout(() => {
        onClose();
        navigate('/experiments');
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      setStep(0);
    }
  };

  const sampleRepos = [
    { label: 'ShadowLab Hackathon', url: 'https://github.com/Sswastik60/ShadowLab' },
    { label: 'Express.js Framework', url: 'https://github.com/expressjs/express' },
    { label: 'React Core', url: 'https://github.com/facebook/react' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 border-emerald-500/40 bg-neutral-950 shadow-2xl overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-900">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-white">
              <GitBranch className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-lg tracking-tight">CLONE & AUDIT GITHUB REPO</h3>
              <p className="text-xs text-neutral-400">Spawn an isolated Shadow Lab clone for any repository</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1.5 rounded-xl hover:bg-neutral-900 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isLoading ? (
          <div className="py-10 text-center space-y-6">
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin"></div>
              <Sparkles className="h-6 w-6 text-emerald-400 absolute inset-0 m-auto animate-pulse" />
            </div>

            <div className="space-y-2">
              <h4 className="font-extrabold text-white text-base">ANALYZING GITHUB REPOSITORY...</h4>
              <div className="space-y-1 text-xs text-neutral-400 font-mono max-w-xs mx-auto text-left">
                <p className={step >= 1 ? 'text-emerald-400 font-bold' : 'opacity-40'}>
                  {step >= 1 ? '✓' : '○'} 1. Cloning source tree & commits
                </p>
                <p className={step >= 2 ? 'text-emerald-400 font-bold' : 'opacity-40'}>
                  {step >= 2 ? '✓' : '○'} 2. Inspecting dependencies & zerops.yaml
                </p>
                <p className={step >= 3 ? 'text-emerald-400 font-bold' : 'opacity-40'}>
                  {step >= 3 ? '✓' : '○'} 3. Groq Llama-3.3 AI Infrastructure Audit
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                GitHub Repository URL
              </label>
              <div className="relative">
                <GitBranch className="h-5 w-5 text-neutral-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/username/repository"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-black border border-neutral-900 text-slate-100 text-sm font-mono focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            {/* Quick Select Preset Repos */}
            <div>
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                Or Try Sample Repositories:
              </p>
              <div className="flex flex-wrap gap-2">
                {sampleRepos.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setRepoUrl(preset.url)}
                    className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-300 font-mono transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Code className="h-3.5 w-3.5 text-emerald-400" />
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-900 flex items-center justify-between">
              <span className="text-[11px] text-neutral-500 font-mono">Powered by Zerops & Groq AI</span>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Clone & Audit</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
