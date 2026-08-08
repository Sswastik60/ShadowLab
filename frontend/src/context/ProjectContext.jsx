import React, { createContext, useContext, useState } from 'react';
import { INITIAL_PROJECT, INITIAL_EXPERIMENTS, CHAOS_SCENARIOS, calculateCustomExperiment } from '../services/mockData';

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [project, setProject] = useState(INITIAL_PROJECT);
  const [isConnected, setIsConnected] = useState(true); // Connected by default with demo data
  const [experiments, setExperiments] = useState(INITIAL_EXPERIMENTS);
  const [activeExperimentId, setActiveExperimentId] = useState(INITIAL_EXPERIMENTS[0].id);
  const [chaosScenarios, setChaosScenarios] = useState(CHAOS_SCENARIOS);
  const [activeChaosResult, setActiveChaosResult] = useState(null);
  const [isChaosRunning, setIsChaosRunning] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const connectProject = (projectId) => {
    setProject((prev) => ({
      ...prev,
      id: projectId || 'my-production-app',
      name: projectId || 'my-production-app',
      status: 'healthy',
    }));
    setIsConnected(true);
    showNotification(`Connected to Zerops project: ${projectId || 'my-production-app'}`, 'success');
  };

  const createExperiment = (config) => {
    const calculated = calculateCustomExperiment(config);
    const newExp = {
      id: `exp-${Date.now()}`,
      name: config.name || 'New Experiment',
      status: 'running',
      createdAt: 'Just now',
      basedOn: config.basedOn || 'Production',
      trafficRate: config.trafficRate || 1000,
      infraChanges: config.infraChanges,
      metrics: {
        ...calculated.metrics,
        history: [
          { time: '00:00', prodLatency: calculated.metrics.production.latency + 10, shadowLatency: calculated.metrics.shadow.latency + 5, prodDbLoad: calculated.metrics.production.dbLoad, shadowDbLoad: calculated.metrics.shadow.dbLoad },
          { time: '00:05', prodLatency: calculated.metrics.production.latency - 5, shadowLatency: calculated.metrics.shadow.latency - 3, prodDbLoad: calculated.metrics.production.dbLoad + 1, shadowDbLoad: calculated.metrics.shadow.dbLoad },
          { time: '00:10', prodLatency: calculated.metrics.production.latency, shadowLatency: calculated.metrics.shadow.latency, prodDbLoad: calculated.metrics.production.dbLoad, shadowDbLoad: calculated.metrics.shadow.dbLoad },
        ],
      },
      aiAnalysis: calculated.aiAnalysis,
    };

    setExperiments((prev) => [newExp, ...prev]);
    setActiveExperimentId(newExp.id);
    showNotification(`Created shadow lab environment for "${newExp.name}"`, 'success');
    return newExp;
  };

  const promoteExperimentToProduction = (experimentId) => {
    const targetExp = experiments.find((e) => e.id === experimentId);
    if (!targetExp) return;

    // Update project state with the promoted shadow infrastructure!
    setProject((prev) => {
      const updatedServices = prev.services.map((service) => {
        if (service.type === 'cache' && targetExp.infraChanges.addValkey) {
          return {
            ...service,
            status: 'healthy',
            hitRate: '87%',
            memory: '140 MB / 512 MB',
            keys: '142,500',
          };
        }
        if (service.type === 'app') {
          return {
            ...service,
            instances: targetExp.infraChanges.increaseWorkers ? 4 : service.instances,
            latency: targetExp.metrics.shadow.latency,
            cpuUsage: targetExp.metrics.shadow.cpuUsage,
          };
        }
        if (service.type === 'db') {
          return {
            ...service,
            load: targetExp.metrics.shadow.dbLoad,
          };
        }
        return service;
      });

      // Update topology nodes
      const updatedNodes = prev.topology.nodes.map((node) => {
        if (node.type === 'cache' && targetExp.infraChanges.addValkey) {
          return { ...node, status: 'healthy', label: 'Valkey Cache (Active)' };
        }
        if (node.type === 'app' && targetExp.infraChanges.increaseWorkers) {
          return { ...node, label: 'API (4 Workers)' };
        }
        return node;
      });

      // Ensure cache edge exists
      let updatedEdges = [...prev.topology.edges];
      if (targetExp.infraChanges.addValkey && !updatedEdges.some((e) => e.target === 'cache')) {
        updatedEdges.push({ source: 'api', target: 'cache', label: 'Valkey Hit (87%)' });
      }

      return {
        ...prev,
        services: updatedServices,
        topology: {
          nodes: updatedNodes,
          edges: updatedEdges,
        },
      };
    });

    // Mark experiment as promoted
    setExperiments((prev) =>
      prev.map((e) =>
        e.id === experimentId
          ? { ...e, status: 'promoted', aiAnalysis: { ...e.aiAnalysis, result: 'PROMOTED TO PRODUCTION', canPromote: false } }
          : e
      )
    );

    showNotification(`Successfully promoted experiment "${targetExp.name}" to Production!`, 'success');
  };

  const runChaosTest = (scenarioId) => {
    setIsChaosRunning(true);
    setActiveChaosResult(null);

    const scenario = chaosScenarios.find((s) => s.id === scenarioId);
    showNotification(`Injecting chaos scenario: "${scenario.name}" into Shadow Lab...`, 'warning');

    setTimeout(() => {
      setIsChaosRunning(false);
      setActiveChaosResult(scenario.result);
      showNotification(`Chaos resilience test complete! Score: ${scenario.result.resilienceScore}/100`, 'info');
    }, 2500);
  };

  const activeExperiment = experiments.find((e) => e.id === activeExperimentId) || experiments[0];

  return (
    <ProjectContext.Provider
      value={{
        project,
        isConnected,
        connectProject,
        experiments,
        activeExperiment,
        activeExperimentId,
        setActiveExperimentId,
        createExperiment,
        promoteExperimentToProduction,
        chaosScenarios,
        activeChaosResult,
        isChaosRunning,
        runChaosTest,
        notification,
        showNotification,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
