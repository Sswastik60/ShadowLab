import { Router } from 'express';
import { getChaosScenarios, runChaosSimulation } from '../controllers/chaosController.js';

const router = Router();

router.get('/scenarios', getChaosScenarios);
router.post('/run', runChaosSimulation);

export default router;
