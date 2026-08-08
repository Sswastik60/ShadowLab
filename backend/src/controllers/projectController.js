import { zeropsService } from '../services/zeropsService.js';

export const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await zeropsService.getProject(id || 'my-production-app');
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const connectProject = async (req, res) => {
  try {
    const { projectId } = req.body;
    const project = await zeropsService.getProject(projectId || 'my-production-app');
    res.json({ success: true, message: `Connected to Zerops project ${project.id}`, project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
