import { chaosService } from '../services/chaosService.js';

export const getChaosScenarios = async (req, res) => {
  res.json(chaosService.getScenarios());
};

export const runChaosSimulation = async (req, res) => {
  try {
    const { scenarioId } = req.body;
    const report = await chaosService.runSimulation(scenarioId || 'kill_db');
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
