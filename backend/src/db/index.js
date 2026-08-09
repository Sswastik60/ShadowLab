import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Automatic connection string resolution for Zerops / Local environments
const getConnectionString = () => {
  if (process.env.db_connectionString) {
    return process.env.db_connectionString;
  }
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  // Zerops automatically injects db_* or ZEROPS_DB_* variables
  const host = process.env.db_hostname || process.env.ZEROPS_DB_HOST || process.env.DB_HOST || 'localhost';
  const port = process.env.db_port || process.env.ZEROPS_DB_PORT || process.env.DB_PORT || 5432;
  const user = process.env.db_superUser || process.env.db_user || process.env.ZEROPS_DB_USER || process.env.DB_USER || 'postgres';
  const password = process.env.db_superUserPassword || process.env.db_password || process.env.ZEROPS_DB_PASSWORD || process.env.DB_PASSWORD || 'postgres';
  const database = process.env.db_dbName || process.env.ZEROPS_DB_NAME || process.env.DB_NAME || 'shadowlab';

  return `postgresql://${user}:${password}@${host}:${port}/${database}`;
};

const connectionString = getConnectionString();

export const pool = new Pool({
  connectionString,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 3000,
  ssl: false,
});

pool.on('error', (err) => {
  console.warn('⚠️ PostgreSQL Pool Error:', err.message);
});

export const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    if (process.env.DEBUG_SQL) {
      console.log('executed query', { text, duration, rows: res.rowCount });
    }
    return res;
  } catch (err) {
    console.warn('⚠️ SQL Query Error:', err.message);
    throw err;
  }
};
