// ShadowLab API Client
// Connects React frontend to Express API server with automatic fallback

const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  getProject: async (projectId = 'my-production-app') => {
    try {
      const res = await fetch(`${API_BASE_URL}/projects/${projectId}`);
      if (!res.ok) throw new Error('Backend offline');
      return await res.json();
    } catch (err) {
      console.warn('Backend API unreachable, using local state fallback:', err.message);
      return null;
    }
  },

  getExperiments: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/experiments`);
      if (!res.ok) throw new Error('Backend offline');
      return await res.json();
    } catch (err) {
      console.warn('Backend API unreachable, using local state fallback:', err.message);
      return null;
    }
  },

  createExperiment: async (config) => {
    try {
      const res = await fetch(`${API_BASE_URL}/experiments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (!res.ok) throw new Error('Backend offline');
      return await res.json();
    } catch (err) {
      console.warn('Backend API unreachable, using local state fallback:', err.message);
      return null;
    }
  },

  promoteExperiment: async (experimentId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/experiments/${experimentId}/promote`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Backend offline');
      return await res.json();
    } catch (err) {
      console.warn('Backend API unreachable, using local state fallback:', err.message);
      return null;
    }
  },

  runChaosTest: async (scenarioId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/chaos/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenarioId }),
      });
      if (!res.ok) throw new Error('Backend offline');
      return await res.json();
    } catch (err) {
      console.warn('Backend API unreachable, using local state fallback:', err.message);
      return null;
    }
  },
};
