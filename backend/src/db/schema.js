import { pool } from './index.js';

export const initSchema = async () => {
  try {
    // 1. Projects Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        region VARCHAR(50) DEFAULT 'prg1',
        status VARCHAR(50) DEFAULT 'healthy',
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Experiments Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS experiments (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'running',
        based_on VARCHAR(100) DEFAULT 'Production',
        traffic_rate INT DEFAULT 1000,
        infra_changes JSONB DEFAULT '{}'::jsonb,
        metrics JSONB DEFAULT '{}'::jsonb,
        ai_analysis JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Chaos Test Runs Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS chaos_runs (
        id VARCHAR(100) PRIMARY KEY,
        scenario_id VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        resilience_score INT DEFAULT 92,
        prod_status VARCHAR(100) DEFAULT 'HEALTHY',
        shadow_status VARCHAR(100) DEFAULT 'CONTAINED',
        downtime VARCHAR(50) DEFAULT '0s (Zero Blast Radius)',
        recovery_time VARCHAR(50) DEFAULT 'Immediate',
        weakness TEXT,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Seed Initial Project Record if empty
    const projCheck = await pool.query('SELECT COUNT(*) FROM projects');
    if (parseInt(projCheck.rows[0].count, 10) === 0) {
      await pool.query(`
        INSERT INTO projects (id, name, region, status)
        VALUES ('my-production-app', 'my-production-app', 'prg1', 'healthy')
        ON CONFLICT (id) DO NOTHING;
      `);
    }

    // 5. Seed Initial Experiment Record if empty
    const expCheck = await pool.query('SELECT COUNT(*) FROM experiments');
    if (parseInt(expCheck.rows[0].count, 10) === 0) {
      await pool.query(`
        INSERT INTO experiments (id, name, status, based_on, traffic_rate, infra_changes, metrics, ai_analysis)
        VALUES (
          'exp-redis-opt',
          'Valkey Cache Optimization',
          'running',
          'Production',
          1000,
          '{"addValkey": true, "increaseWorkers": false, "increaseMemory": true}'::jsonb,
          '{"production": {"latency": 420, "dbLoad": 61, "cpuUsage": 58}, "shadow": {"latency": 167, "dbLoad": 24, "cpuUsage": 44, "cacheHitRate": 87}, "history": [{"time": "00:00", "prodLatency": 420, "shadowLatency": 170}, {"time": "00:05", "prodLatency": 435, "shadowLatency": 165}, {"time": "00:10", "prodLatency": 418, "shadowLatency": 168}, {"time": "00:15", "prodLatency": 440, "shadowLatency": 162}, {"time": "00:20", "prodLatency": 420, "shadowLatency": 167}]}'::jsonb,
          '{"result": "SIGNIFICANT IMPROVEMENT", "resultType": "success", "headline": "API latency decreased by 60%.", "reasons": ["68% fewer database reads due to high Valkey cache hit rate", "87% cache hit rate for frequent payload requests", "14% lower CPU usage across API containers"], "risks": ["At >8,000 concurrent users, cache memory may become the new bottleneck."], "recommendation": "Promote Valkey Cache & Memory allocation changes to Production.", "canPromote": true}'::jsonb
        )
        ON CONFLICT (id) DO NOTHING;
      `);
    }

    console.log('🐘 PostgreSQL Database Schema Initialized & Seeded Cleanly!');
  } catch (err) {
    console.warn('⚠️ PostgreSQL Schema Migration Notice:', err.message);
  }
};
