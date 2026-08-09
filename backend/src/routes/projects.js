import { Router } from 'express';
import { getProject, connectProject, importGithubRepo } from '../controllers/projectController.js';

const router = Router();

router.get('/:id?', getProject);
router.post('/connect', connectProject);
router.post('/github-import', importGithubRepo);

export default router;
