import { aiService } from '../services/aiService.js';

export const analyzeExperimentData = async (req, res) => {
  try {
    const experiment = req.body;
    const analysis = await aiService.analyzeExperiment(experiment);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
