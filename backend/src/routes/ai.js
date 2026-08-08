import { Router } from 'express';
import { analyzeExperimentData } from '../controllers/aiController.js';

const router = Router();

router.post('/analyze', analyzeExperimentData);

export default router;
