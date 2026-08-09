import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Automatic connection string resolution for Zerops / Local environments
const getConnectionString = () => {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  // Zerops automatically injects ZEROPS_DB_* variables
  const host = process.env.ZEROPS_DB_HOST || process.env.DB_HOST || 'localhost';
  const port = process.env.ZEROPS_DB_PORT || process.env.DB_PORT || 5432;
  const user = process.env.ZEROPS_DB_USER || process.env.DB_USER || 'postgres';
  const password = process.env.ZEROPS_DB_PASSWORD || process.env.DB_PASSWORD || 'postgres';
  const database = process.env.ZEROPS_DB_NAME || process.env.DB_NAME || 'shadowlab';

  return `postgresql://${user}:${password}@${host}:${port}/${database}`;
};

const connectionString = getConnectionString();

export const pool = new Pool({
  connectionString,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: process.env.NODE_ENV === 'production' && !connectionString.includes('localhost')
    ? { rejectUnauthorized: false }
    : false,
});

pool.on('error', (err) => {
  console.warn('⚠️ PostgreSQL Pool Error:', err.message);
});

export const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    // Log queries in debug mode
    if (process.env.DEBUG_SQL) {
      console.log('executed query', { text, duration, rows: res.rowCount });
    }
    return res;
  } catch (err) {
    console.warn('⚠️ SQL Query Error:', err.message);
    throw err;
  }
};
