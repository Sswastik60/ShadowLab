import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, GitBranch, ExternalLink, Heart, Zap } from 'lucide-react';
import appLogo from '../../assets/app logo.png';

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-900 bg-black/90 text-neutral-400 text-xs py-10 px-6 backdrop-blur-md">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand Col */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-950 border border-neutral-800 p-1">
              <img src={appLogo} alt="ShadowLab Logo" className="h-full w-full object-contain" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Shadow<span className="text-emerald-400">Labs</span>
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 leading-relaxed">
            Zero-risk production benchmarking, chaos fault injection & AI-driven SRE infrastructure audits for Zerops.
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="space-y-2">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Platform</h4>
          <ul className="space-y-1.5 text-neutral-400 text-xs font-medium">
            <li><Link to="/dashboard" className="hover:text-emerald-400 transition-colors">Dashboard</Link></li>
            <li><Link to="/experiments" className="hover:text-emerald-400 transition-colors">Shadow Experiments</Link></li>
            <li><Link to="/chaos" className="hover:text-emerald-400 transition-colors">Chaos Lab</Link></li>
            <li><Link to="/settings" className="hover:text-emerald-400 transition-colors">Settings & API Keys</Link></li>
          </ul>
        </div>

        {/* Technical Ecosystem */}
        <div className="space-y-2">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Ecosystem</h4>
          <ul className="space-y-1.5 text-neutral-400 text-xs font-medium">
            <li>
              <a href="https://zerops.io" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                <span>Zerops Platform</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </li>
            <li>
              <a href="https://groq.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                <span>Groq Llama-3.3 AI</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </li>
            <li>
              <a href="https://github.com/Sswastik60/ShadowLab" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                <span>GitHub Source</span>
                <GitBranch className="h-3 w-3" />
              </a>
            </li>
          </ul>
        </div>

        {/* Legal & Compliance */}
        <div className="space-y-2">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Legal & Compliance</h4>
          <ul className="space-y-1.5 text-neutral-400 text-xs font-medium">
            <li><Link to="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
            <li className="text-[11px] text-neutral-500 pt-1">MIT Open Source License</li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500">
        <p>© 2026 ShadowLabs. Built for the ZeroOps Hackathon.</p>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Encrypted & Privacy Verified</span>
        </div>
      </div>
    </footer>
  );
}
