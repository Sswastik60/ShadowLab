import { INITIAL_PROJECT, INITIAL_EXPERIMENTS, CHAOS_SCENARIOS, calculateCustomExperiment } from './mockData';

const API_BASE = '/api';

/**
 * Helper to fetch JSON with error handling
 */
async function fetchJson(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(errorBody.error || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  /**
   * Fetch Zerops project details & topology
   */
  getProject: async (projectId = 'my-production-app') => {
    try {
      return await fetchJson(`/projects/${projectId}`);
    } catch (err) {
      console.warn('Backend API unavailable, using local mock data for project:', err.message);
      return { ...INITIAL_PROJECT, id: projectId, name: projectId };
    }
  },

  /**
   * Connect to project
   */
  connectProject: async (projectId) => {
    try {
      return await fetchJson('/projects/connect', {
        method: 'POST',
        body: JSON.stringify({ projectId }),
      });
    } catch (err) {
      console.warn('Backend API unavailable, executing local mock connect:', err.message);
      return {
        success: true,
        message: `Connected to Zerops project ${projectId || 'my-production-app'} (offline mode)`,
        project: { ...INITIAL_PROJECT, id: projectId || 'my-production-app' },
      };
    }
  },

  /**
   * Get all active experiments
   */
  getExperiments: async () => {
    try {
      return await fetchJson('/experiments');
    } catch (err) {
      console.warn('Backend API unavailable, returning initial mock experiments:', err.message);
      return INITIAL_EXPERIMENTS;
    }
  },

  /**
   * Create a shadow lab experiment
   */
  createExperiment: async (config) => {
    try {
      return await fetchJson('/experiments', {
        method: 'POST',
        body: JSON.stringify(config),
      });
    } catch (err) {
      console.warn('Backend API unavailable, calculating mock experiment locally:', err.message);
      const calculated = calculateCustomExperiment(config);
      return {
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
    }
  },

  /**
   * Promote experiment configuration to production
   */
  promoteExperiment: async (experimentId) => {
    try {
      return await fetchJson(`/experiments/${experimentId}/promote`, {
        method: 'POST',
      });
    } catch (err) {
      console.warn('Backend API unavailable, simulating promotion locally:', err.message);
      return {
        success: true,
        message: `Experiment ${experimentId} promoted to Production (offline simulation mode).`,
      };
    }
  },

  /**
   * Get chaos scenarios list
   */
  getChaosScenarios: async () => {
    try {
      return await fetchJson('/chaos/scenarios');
    } catch (err) {
      console.warn('Backend API unavailable, returning default chaos scenarios:', err.message);
      return CHAOS_SCENARIOS;
    }
  },

  /**
   * Trigger a chaos fault simulation
   */
  runChaosSimulation: async (scenarioId) => {
    try {
      return await fetchJson('/chaos/run', {
        method: 'POST',
        body: JSON.stringify({ scenarioId }),
      });
    } catch (err) {
      console.warn('Backend API unavailable, running mock chaos simulation:', err.message);
      const scenario = CHAOS_SCENARIOS.find((s) => s.id === scenarioId) || CHAOS_SCENARIOS[0];
      return scenario.result;
    }
  },

  /**
   * Request AI analysis for an experiment
   */
  analyzeExperiment: async (experimentData) => {
    try {
      return await fetchJson('/ai/analyze', {
        method: 'POST',
        body: JSON.stringify(experimentData),
      });
    } catch (err) {
      console.warn('Backend API unavailable, returning fallback AI analysis:', err.message);
      return experimentData.aiAnalysis;
    }
  },

  /**
   * Import & Inspect GitHub Repository
   */
  importGithubRepo: async (repoUrl) => {
    return await fetchJson('/projects/github-import', {
      method: 'POST',
      body: JSON.stringify({ repoUrl }),
    });
  },
};
