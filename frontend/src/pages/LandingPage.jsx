import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/layout/Footer';
import {
  Beaker,
  Zap,
  ShieldAlert,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Activity,
  Server,
  Database,
  Layers,
  Sparkles,
  Flame,
  Globe,
  TrendingUp,
  RefreshCw,
  Sliders,
  ChevronRight,
} from 'lucide-react';
import appLogo from '../assets/app logo.png';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleLaunchApp = () => {
    navigate('/dashboard');
  };

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans selection:bg-emerald-500 selection:text-black overflow-x-hidden">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP NAVIGATION BAR */}
      {/* ------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-900 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-950 border border-neutral-800 p-1.5 shadow-lg shadow-emerald-500/10">
              <img src={appLogo} alt="ShadowLab Logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white">
                Shadow<span className="text-emerald-400">Labs</span>
              </span>
              <span className="ml-2 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                ZeroOps Hackathon
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-neutral-400">
            <a href="#features" className="hover:text-emerald-400 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">
              How It Works
            </a>
            <button onClick={() => navigate('/chaos')} className="hover:text-emerald-400 transition-colors cursor-pointer">
              Chaos Resilience
            </button>
            <a href="#tech-stack" className="hover:text-emerald-400 transition-colors">
              Zerops + AI Stack
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLaunchApp}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Launch Shadow Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 2. HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative pt-20 pb-32 px-6 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Glowing Background Radial Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full"></div>
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[300px] bg-emerald-600/10 blur-[130px] pointer-events-none rounded-full"></div>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10 max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-950 border border-neutral-800 text-xs font-medium text-emerald-400 shadow-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Next-Gen Infrastructure Experimentation Engine for Zerops</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 variants={fadeInUp} className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.1]">
            Experiment on Production.{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
              Without Touching Production.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={fadeInUp} className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            ShadowLabs instantly clones your Zerops production environment, runs real-time synthetic traffic stress loads, executes chaos fault tests, and auto-promotes winning infra configs with zero downtime.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleLaunchApp}
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-3 cursor-pointer hover:scale-105 active:scale-95"
            >
              <Beaker className="h-5 w-5" />
              <span>Enter Shadow Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => navigate('/chaos')}
              className="w-full sm:w-auto px-8 py-4 text-sm font-semibold rounded-xl bg-neutral-950 hover:bg-neutral-900 text-slate-200 border border-neutral-800 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <Flame className="h-4 w-4 text-rose-500" />
              <span>Try Chaos Fault Simulator</span>
            </button>
          </motion.div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* HERO INTERACTIVE SPLIT VIEW DEMO PREVIEW CARD */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 max-w-5xl mx-auto rounded-3xl border border-neutral-800 bg-neutral-950/90 p-4 sm:p-6 shadow-2xl shadow-emerald-500/10 backdrop-blur-2xl relative"
        >
          <div className="flex items-center justify-between pb-4 border-b border-neutral-900 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2 font-bold text-neutral-300">shadowlab-split-view // live telemetry</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>SYNCHRONIZED WITH ZEROPS</span>
            </div>
          </div>

          {/* Split Screen Cards */}
          <div className="grid md:grid-cols-2 gap-6 pt-6 text-left">
            {/* Production Side */}
            <div className="rounded-2xl bg-neutral-900/60 p-5 border border-neutral-800/80 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-emerald-400" />
                  <span className="font-bold text-sm text-white">PRODUCTION (Baseline)</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  LIVE 100%
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between p-2.5 rounded-lg bg-black border border-neutral-900">
                  <span className="text-neutral-400">Response Latency</span>
                  <span className="font-mono font-bold text-rose-400">184 ms</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-black border border-neutral-900">
                  <span className="text-neutral-400">PostgreSQL DB Load</span>
                  <span className="font-mono font-bold text-amber-400">61 %</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-black border border-neutral-900">
                  <span className="text-neutral-400">Valkey Cache Tier</span>
                  <span className="font-mono text-neutral-500">Disabled (0%)</span>
                </div>
              </div>
            </div>

            {/* Shadow Lab Clone Side */}
            <div className="rounded-2xl bg-gradient-to-b from-neutral-900 to-black p-5 border border-emerald-500/40 relative shadow-lg shadow-emerald-500/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-emerald-400" />
                  <span className="font-bold text-sm text-white">SHADOW LAB (Valkey + 4 Workers)</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  SHADOW CLONE
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
                  <span className="text-neutral-400">Response Latency</span>
                  <span className="font-mono font-bold text-emerald-400">64 ms (-65%)</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
                  <span className="text-neutral-400">PostgreSQL DB Load</span>
                  <span className="font-mono font-bold text-emerald-400">19 % (-68%)</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
                  <span className="text-neutral-400">Valkey Cache Hit Rate</span>
                  <span className="font-mono font-bold text-emerald-400">87 % Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Banner floating in Hero Preview */}
          <div className="mt-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 p-4 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-300">GEMINI AI RECOMMENDATION</p>
                <p className="text-xs text-neutral-300">"API latency reduced by 65%. 87% cache hit rate eliminates database bottle-necks."</p>
              </div>
            </div>
            <button
              onClick={handleLaunchApp}
              className="w-full sm:w-auto px-4 py-2 text-xs font-extrabold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black shadow-md cursor-pointer transition-all shrink-0"
            >
              [ PROMOTE TO PRODUCTION ]
            </button>
          </div>
        </motion.div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. CORE FEATURES SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto border-t border-neutral-900">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">Engine Features</h2>
          <p className="text-3xl sm:text-5xl font-black text-white">Built for Zero-Risk Deployment Engineering</p>
          <p className="text-neutral-400 text-sm sm:text-base">
            Everything you need to benchmark infrastructure changes, simulate extreme traffic, and test service resilience before pushing to production.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-4 text-left">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">1-Click Environment Shadowing</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Instantly clone your full Zerops project topology (Node.js runtime, PostgreSQL DB, Valkey Cache) into a isolated shadow lab.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-4 text-left">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Synthetic Stress Load Tests</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Simulate realistic traffic rates from 100 to 5,000 req/sec to stress test memory, DB query load, and worker scaling limits.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-4 text-left">
            <div className="h-12 w-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Flame className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Chaos Fault Simulator</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Inject intentional faults (`Kill DB`, `Worker Crash`, `500ms Latency`, `Memory Spike`) and generate a live Resilience Scorecard.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-4 text-left">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Gemini AI Infrastructure Analyst</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Leverage Gemini LLM to analyze telemetry deltas, evaluate risk factors, and automatically generate promotion approval scripts.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. HOW IT WORKS (WORKFLOW) SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto border-t border-neutral-900">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">Workflow</h2>
          <p className="text-3xl sm:text-5xl font-black text-white">How ShadowLabs Works in 3 Simple Steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {/* Step 1 */}
          <div className="rounded-2xl bg-neutral-950 p-8 border border-neutral-900 relative">
            <span className="text-5xl font-black text-neutral-800 absolute top-6 right-6">01</span>
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold mb-6">
              <Server className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Connect Zerops Target</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Select your active Zerops project. ShadowLabs automatically pulls the live dependency graph and baseline service health.
            </p>
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl bg-neutral-950 p-8 border border-neutral-900 relative">
            <span className="text-5xl font-black text-neutral-800 absolute top-6 right-6">02</span>
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold mb-6">
              <Sliders className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Configure & Stress Test</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Choose infra changes (e.g. Add Valkey, Increase Workers) and run live side-by-side telemetry comparison graphs.
            </p>
          </div>

          {/* Step 3 */}
          <div className="rounded-2xl bg-neutral-950 p-8 border border-neutral-900 relative">
            <span className="text-5xl font-black text-neutral-800 absolute top-6 right-6">03</span>
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold mb-6">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Promote to Production</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Review AI risk analysis, confirm resilience scorecards, and click `PROMOTE` to sync configuration cleanly into Zerops production.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. TECH STACK & ZEROPS HIGHLIGHT */}
      {/* ------------------------------------------------------------- */}
      <section id="tech-stack" className="py-24 px-6 max-w-7xl mx-auto border-t border-neutral-900">
        <div className="rounded-3xl bg-gradient-to-b from-neutral-950 to-black p-8 sm:p-12 border border-neutral-900 text-left flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-6 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
              <Cpu className="h-3.5 w-3.5" />
              <span>Built for the ZeroOps Hackathon</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Powered by Zerops Platform & Gemini Intelligence</h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              ShadowLabs utilizes Zerops container orchestration (`zerops.yaml`), light-mode container services, and HTTP router compatibility, coupled with Google's Gemini LLM for automated resilience evaluation.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs font-medium text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Node.js 20 API + Vite React SPA</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>PostgreSQL 16 & Valkey 7.2 Cache</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Express REST API Backend</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Zerops CLI (`zcli push`) Integration</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-96 rounded-2xl bg-black p-6 border border-neutral-800 space-y-4 font-mono text-xs text-neutral-300">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-3 text-emerald-400 font-bold">
              <span>zerops.yaml</span>
              <span>setup: app</span>
            </div>
            <p className="text-neutral-500"># Unified Service Definition</p>
            <p><span className="text-emerald-400">setup</span>: app</p>
            <p><span className="text-emerald-400">build</span>:</p>
            <p className="pl-4">base: nodejs@20</p>
            <p className="pl-4">buildCommands: npm run build</p>
            <p><span className="text-emerald-400">run</span>:</p>
            <p className="pl-4">start: node backend/src/server.js</p>
            <p className="pl-4">ports: 3000 (http)</p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. CALL TO ACTION (CTA BANNER) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 px-6 max-w-7xl mx-auto text-center border-t border-neutral-900">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-emerald-950/40 via-neutral-950 to-emerald-950/40 border border-emerald-500/30 p-10 sm:p-16 space-y-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"></div>

          <h2 className="text-3xl sm:text-5xl font-black text-white">Ready to Eliminate Deployment Risk?</h2>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto">
            Test infrastructure changes, inject chaos scenarios, and promote winning configs with complete confidence.
          </p>

          <div className="pt-4 flex justify-center">
            <button
              onClick={handleLaunchApp}
              className="px-8 py-4 text-sm font-extrabold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black shadow-xl shadow-emerald-500/30 transition-all flex items-center gap-3 cursor-pointer hover:scale-105 active:scale-95"
            >
              <Beaker className="h-5 w-5" />
              <span>Launch Shadow Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
