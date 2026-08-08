import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import projectRoutes from './routes/projects.js';
import experimentRoutes from './routes/experiments.js';
import chaosRoutes from './routes/chaos.js';
import aiRoutes from './routes/ai.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/experiments', experimentRoutes);
app.use('/api/chaos', chaosRoutes);
app.use('/api/ai', aiRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'ShadowLab Backend API', time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 ShadowLab Express API running on http://localhost:${PORT}`);
});
