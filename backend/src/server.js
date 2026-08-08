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
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/experiments', experimentRoutes);
app.use('/api/chaos', chaosRoutes);
app.use('/api/ai', aiRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'ShadowLab Unified Server', time: new Date().toISOString() });
});

// Serve React frontend static assets from /var/www/frontend/dist
const distPath = path.resolve(__dirname, '../../frontend/dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.status(200).send('ShadowLab Unified Server Active.');
    }
  });
});

// Explicitly bind to 0.0.0.0 for Zerops HTTP router compatibility
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 ShadowLab Server active on http://0.0.0.0:${PORT}`);
});
