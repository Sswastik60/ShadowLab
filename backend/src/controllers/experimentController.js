import { pool } from '../db/index.js';
import { zeropsService } from '../services/zeropsService.js';
import { metricsService } from '../services/metricsService.js';
import { aiService } from '../services/aiService.js';

// In-Memory fallback store if PostgreSQL is unreachable locally
let memoryStore = [
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

const mapRowToExperiment = (row) => ({
  id: row.id,
  name: row.name,
  status: row.status,
  createdAt: row.created_at ? new Date(row.created_at).toLocaleTimeString() : 'Just now',
  basedOn: row.based_on,
  trafficRate: row.traffic_rate,
  infraChanges: row.infra_changes,
  metrics: row.metrics,
  aiAnalysis: row.ai_analysis,
});

export const getExperiments = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM experiments ORDER BY created_at DESC');
    if (result.rows.length > 0) {
      return res.json(result.rows.map(mapRowToExperiment));
    }
  } catch (err) {
    console.warn('PostgreSQL fallback to memory store:', err.message);
  }
  res.json(memoryStore);
};

export const getExperimentById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM experiments WHERE id = $1', [req.params.id]);
    if (result.rows.length > 0) {
      return res.json(mapRowToExperiment(result.rows[0]));
    }
  } catch (err) {
    console.warn('PostgreSQL fallback for ID lookup:', err.message);
  }

  const exp = memoryStore.find((e) => e.id === req.params.id);
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
      basedOn: basedOn || 'Production',
      trafficRate: trafficRate || 1000,
      infraChanges: infraChanges || {},
      metrics,
    };

    // Run Groq LLM AI Analysis
    const aiAnalysis = await aiService.analyzeExperiment(tempExp);
    tempExp.aiAnalysis = aiAnalysis;

    // Try saving to PostgreSQL
    try {
      const sql = `
        INSERT INTO experiments (id, name, status, based_on, traffic_rate, infra_changes, metrics, ai_analysis)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
      `;
      const values = [
        tempExp.id,
        tempExp.name,
        tempExp.status,
        tempExp.basedOn,
        tempExp.trafficRate,
        JSON.stringify(tempExp.infraChanges),
        JSON.stringify(tempExp.metrics),
        JSON.stringify(tempExp.aiAnalysis),
      ];
      const dbResult = await pool.query(sql, values);
      return res.status(201).json(mapRowToExperiment(dbResult.rows[0]));
    } catch (dbErr) {
      console.warn('PostgreSQL insert fallback:', dbErr.message);
      memoryStore.unshift(tempExp);
      return res.status(201).json(tempExp);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const promoteExperiment = async (req, res) => {
  try {
    const { id } = req.params;
    let exp;

    try {
      const dbRes = await pool.query('SELECT * FROM experiments WHERE id = $1', [id]);
      if (dbRes.rows.length > 0) {
        exp = mapRowToExperiment(dbRes.rows[0]);
      }
    } catch (e) {
      console.warn('PostgreSQL lookup fallback during promotion:', e.message);
    }

    if (!exp) {
      exp = memoryStore.find((e) => e.id === id);
    }

    if (!exp) return res.status(404).json({ error: 'Experiment not found' });

    const result = await zeropsService.promoteToProduction(exp);

    exp.status = 'promoted';
    exp.aiAnalysis.result = 'PROMOTED TO PRODUCTION';
    exp.aiAnalysis.canPromote = false;

    try {
      await pool.query(
        'UPDATE experiments SET status = $1, ai_analysis = $2 WHERE id = $3',
        ['promoted', JSON.stringify(exp.aiAnalysis), id]
      );
    } catch (dbErr) {
      console.warn('PostgreSQL update fallback:', dbErr.message);
    }

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
