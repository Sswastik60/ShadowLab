import { Router } from 'express';
import {
  getExperiments,
  getExperimentById,
  createExperiment,
  promoteExperiment,
  streamTelemetry,
} from '../controllers/experimentController.js';

const router = Router();

router.get('/', getExperiments);
router.get('/:id', getExperimentById);
router.get('/:id/stream', streamTelemetry);
router.post('/', createExperiment);
router.post('/:id/promote', promoteExperiment);

export default router;
