import { zeropsService } from '../services/zeropsService.js';
import { metricsService } from '../services/metricsService.js';
import { aiService } from '../services/aiService.js';

let experimentsMemoryStore = [
  {
    id: 'exp-redis-opt',
    name: 'Redis / Valkey Optimization',
    status: 'running',
    createdAt: '12 minutes ago',
    basedOn: 'Production',
    trafficRate: 1000,
    infraChanges: {
      addValkey: true,
      increaseWorkers: false,
      changeNodeVersion: false,
      changeDatabase: false,
      increaseMemory: true,
    },
    metrics: metricsService.calculateExperimentMetrics({ addValkey: true, increaseMemory: true }, 1000),
    aiAnalysis: {
      result: 'SIGNIFICANT IMPROVEMENT',
      resultType: 'success',
      headline: 'API latency decreased by 60%.',
      reasons: [
        '68% fewer database reads due to high Valkey cache hit rate',
        '87% cache hit rate for frequent payload requests',
        '14% lower CPU usage across API containers',
      ],
      risks: [
        'At >8,000 concurrent users, cache memory may become the new bottleneck.',
      ],
      recommendation: 'Promote Valkey Cache & Memory allocation changes to Production.',
      canPromote: true,
    },
  },
];

export const getExperiments = async (req, res) => {
  res.json(experimentsMemoryStore);
};

export const getExperimentById = async (req, res) => {
  const exp = experimentsMemoryStore.find((e) => e.id === req.params.id);
  if (!exp) return res.status(404).json({ error: 'Experiment not found' });
  res.json(exp);
};

export const createExperiment = async (req, res) => {
  try {
    const { name, basedOn, trafficRate, infraChanges } = req.body;

    const metrics = metricsService.calculateExperimentMetrics(infraChanges || {}, trafficRate || 1000);

    const tempExp = {
      id: `exp-${Date.now()}`,
      name: name || 'New Shadow Experiment',
      status: 'running',
      createdAt: 'Just now',
      basedOn: basedOn || 'Production',
      trafficRate: trafficRate || 1000,
      infraChanges: infraChanges || {},
      metrics,
    };

    const aiAnalysis = await aiService.analyzeExperiment(tempExp);
    tempExp.aiAnalysis = aiAnalysis;

    experimentsMemoryStore.unshift(tempExp);
    res.status(201).json(tempExp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const promoteExperiment = async (req, res) => {
  try {
    const { id } = req.params;
    const exp = experimentsMemoryStore.find((e) => e.id === id);

    if (!exp) return res.status(404).json({ error: 'Experiment not found' });

    const result = await zeropsService.promoteToProduction(exp);

    exp.status = 'promoted';
    exp.aiAnalysis.result = 'PROMOTED TO PRODUCTION';
    exp.aiAnalysis.canPromote = false;

    res.json({
      success: true,
      message: `Experiment "${exp.name}" promoted to production cleanly!`,
      experiment: exp,
      zeropsResult: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
