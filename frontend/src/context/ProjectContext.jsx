import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PROJECT, INITIAL_EXPERIMENTS, CHAOS_SCENARIOS } from '../services/mockData';
import { api } from '../services/api';

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [project, setProject] = useState(INITIAL_PROJECT);
  const [isConnected, setIsConnected] = useState(true);
  const [experiments, setExperiments] = useState(INITIAL_EXPERIMENTS);
  const [activeExperimentId, setActiveExperimentId] = useState(INITIAL_EXPERIMENTS[0].id);
  const [chaosScenarios, setChaosScenarios] = useState(CHAOS_SCENARIOS);
  const [activeChaosResult, setActiveChaosResult] = useState(null);
  const [isChaosRunning, setIsChaosRunning] = useState(false);
  const [notification, setNotification] = useState(null);

  // Sync state from backend API on initial render
  useEffect(() => {
    async function initData() {
      try {
        const fetchedProject = await api.getProject('my-production-app');
        if (fetchedProject) setProject(fetchedProject);

        const fetchedExperiments = await api.getExperiments();
        if (fetchedExperiments && fetchedExperiments.length > 0) {
          setExperiments(fetchedExperiments);
          setActiveExperimentId(fetchedExperiments[0].id);
        }

        const fetchedScenarios = await api.getChaosScenarios();
        if (fetchedScenarios && fetchedScenarios.length > 0) {
          setChaosScenarios(fetchedScenarios);
        }
      } catch (err) {
        console.warn('Initial API sync notice:', err.message);
      }
    }
    initData();
  }, []);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const connectProject = async (projectId) => {
    const res = await api.connectProject(projectId);
    setProject((prev) => ({
      ...prev,
      id: projectId || 'my-production-app',
      name: projectId || 'my-production-app',
      status: 'healthy',
    }));
    setIsConnected(true);
    showNotification(res.message || `Connected to Zerops project: ${projectId || 'my-production-app'}`, 'success');
  };

  const createExperiment = async (config) => {
    const newExp = await api.createExperiment(config);
    setExperiments((prev) => [newExp, ...prev]);
    setActiveExperimentId(newExp.id);
    showNotification(`Created shadow lab environment for "${newExp.name}"`, 'success');
    return newExp;
  };

  const promoteExperimentToProduction = async (experimentId) => {
    const targetExp = experiments.find((e) => e.id === experimentId);
    if (!targetExp) return;

    // Call backend API promote endpoint
    await api.promoteExperiment(experimentId);

    // Update project state with the promoted shadow infrastructure!
    setProject((prev) => {
      const updatedServices = prev.services.map((service) => {
        if (service.type === 'cache' && targetExp.infraChanges?.addValkey) {
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
            instances: targetExp.infraChanges?.increaseWorkers ? 4 : service.instances,
            latency: targetExp.metrics?.shadow?.latency || service.latency,
            cpuUsage: targetExp.metrics?.shadow?.cpuUsage || service.cpuUsage,
          };
        }
        if (service.type === 'db') {
          return {
            ...service,
            load: targetExp.metrics?.shadow?.dbLoad || service.load,
          };
        }
        return service;
      });

      // Update topology nodes
      const updatedNodes = prev.topology.nodes.map((node) => {
        if (node.type === 'cache' && targetExp.infraChanges?.addValkey) {
          return { ...node, status: 'healthy', label: 'Valkey Cache (Active)' };
        }
        if (node.type === 'app' && targetExp.infraChanges?.increaseWorkers) {
          return { ...node, label: 'API (4 Workers)' };
        }
        return node;
      });

      // Ensure cache edge exists
      let updatedEdges = [...prev.topology.edges];
      if (targetExp.infraChanges?.addValkey && !updatedEdges.some((e) => e.target === 'cache')) {
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

  const runChaosTest = async (scenarioId) => {
    setIsChaosRunning(true);
    setActiveChaosResult(null);

    const scenario = chaosScenarios.find((s) => s.id === scenarioId);
    showNotification(`Injecting chaos scenario: "${scenario?.name || 'Simulation'}" into Shadow Lab...`, 'warning');

    const result = await api.runChaosSimulation(scenarioId);
    setIsChaosRunning(false);
    setActiveChaosResult(result);
    showNotification(`Chaos resilience test complete! Score: ${result.resilienceScore}/100`, 'info');
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

