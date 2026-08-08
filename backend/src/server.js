import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import projectRoutes from './routes/projects.js';
import experimentRoutes from './routes/experiments.js';
import chaosRoutes from './routes/chaos.js';
import aiRoutes from './routes/ai.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve frontend static build assets if available
const distPath = path.resolve(__dirname, '../../frontend/dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.status(200).send('ShadowLab Backend API Service Active.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 ShadowLab Express API running on http://localhost:${PORT}`);
});
