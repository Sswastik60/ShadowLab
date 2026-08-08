import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import ChaosCard, { ChaosResultCard } from '../components/ui/ChaosCard';
import { Flame, Play, ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ChaosLab() {
  const { chaosScenarios, activeChaosResult, isChaosRunning, runChaosTest } = useProject();
  const [selectedScenarioId, setSelectedScenarioId] = useState(chaosScenarios[0].id);

  const selectedScenario = chaosScenarios.find((s) => s.id === selectedScenarioId) || chaosScenarios[0];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Flame className="h-4 w-4 text-rose-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">FAUL INJECTION ENGINE</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight m-0">
            Chaos Lab
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulate destructive production failures inside the isolated Shadow Lab clone environment.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
          <ShieldAlert className="h-4 w-4" />
          <span>Production Safety Lock Active</span>
        </div>
      </div>

      {/* Main Grid: Selector on left, Run trigger & Scorecard on right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Scenarios grid */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="font-extrabold text-slate-100 text-sm tracking-wider uppercase mb-3">
              CHAOS EXPERIMENT SCENARIOS
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Select a fault scenario to inject into your active Shadow Lab environment:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chaosScenarios.map((scenario) => (
                <ChaosCard
                  key={scenario.id}
                  scenario={scenario}
                  isSelected={scenario.id === selectedScenarioId}
                  onSelect={setSelectedScenarioId}
                />
              ))}
            </div>
          </div>

          {/* Trigger Action Panel */}
          <div className="glass-panel rounded-2xl p-6 border-rose-500/30 bg-gradient-to-r from-slate-950 via-rose-950/20 to-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Flame className="h-4 w-4 text-rose-400" />
                <span>Selected Scenario: {selectedScenario.name}</span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">{selectedScenario.description}</p>
            </div>

            <button
              onClick={() => runChaosTest(selectedScenarioId)}
              disabled={isChaosRunning}
              className="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-rose-500/20 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>{isChaosRunning ? 'Executing Chaos...' : 'Run Chaos'}</span>
            </button>
          </div>
        </div>

        {/* Right column: Resilience Scorecard */}
        <div>
          <h3 className="font-extrabold text-slate-100 text-sm tracking-wider uppercase mb-3">
            RESILIENCE TEST REPORT
          </h3>
          <ChaosResultCard result={activeChaosResult} isRunning={isChaosRunning} />
        </div>
      </div>
    </div>
  );
}
