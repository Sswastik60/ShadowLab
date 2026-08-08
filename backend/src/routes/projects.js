import { Router } from 'express';
import { getProject, connectProject } from '../controllers/projectController.js';

const router = Router();

router.get('/:id?', getProject);
router.post('/connect', connectProject);

export default router;
