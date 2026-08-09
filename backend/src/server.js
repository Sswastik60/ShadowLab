import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
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
  res.json({
    status: 'ok',
    service: 'ShadowLab Unified Server',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    time: new Date().toISOString(),
  });
});

// Dynamic static dist path resolution for Zerops / Local environments
const possibleDistPaths = [
  path.resolve(__dirname, '../../frontend/dist'),
  path.resolve(__dirname, '../frontend/dist'),
  path.resolve(process.cwd(), 'frontend/dist'),
  path.resolve(process.cwd(), 'dist'),
];

let distPath = possibleDistPaths.find((p) => fs.existsSync(p)) || possibleDistPaths[0];

console.log(`📁 Serving frontend static assets from: ${distPath}`);
app.use(express.static(distPath));

app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head><title>ShadowLab API Server</title></head>
        <body style="background:#090d16;color:#e2e8f0;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
          <div style="text-align:center;padding:2rem;background:#1e293b;border-radius:12px;border:1px solid #334155;">
            <h1 style="color:#10b981;margin-bottom:0.5rem;">🚀 ShadowLab Unified Server</h1>
            <p style="color:#94a3b8;">API endpoints are live under <code>/api/*</code></p>
            <p style="font-size:0.85rem;color:#64748b;">Frontend static bundle will render when built.</p>
          </div>
        </body>
      </html>
    `);
  }
});

// Explicitly bind to 0.0.0.0 for Zerops HTTP router compatibility
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 ShadowLab Server active on http://0.0.0.0:${PORT}`);
});

