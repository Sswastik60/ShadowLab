# 🐘 The Complete PostgreSQL Master Guide for Developers

Welcome to PostgreSQL! PostgreSQL (often called **Postgres**) is the world's most advanced, open-source object-relational database. It is renowned for its reliability, feature richness, performance, and native support for flexible **JSON** data alongside traditional relational tables.

---

## 1. Core Concepts: How Postgres Thinks

Think of PostgreSQL like an organized digital file cabinet:
- **Database (`DB`)**: The whole file cabinet (e.g. `shadowlab_db`).
- **Table**: A specific drawer inside the file cabinet (e.g. `experiments`, `projects`, `users`).
- **Row (Record)**: A single document/sheet in a drawer (e.g. one specific experiment).
- **Column (Field)**: An attribute on every document (e.g. `id`, `name`, `status`, `created_at`).
- **Data Type**: The kind of information allowed in a column (numbers, text, timestamps, JSON).

```
                      +-------------------------------------------------+
                      |            TABLE: experiments                   |
                      +----+---------------------+-----------+----------+
                      | id | name                | status    | metrics  |  <-- Columns
                      +----+---------------------+-----------+----------+
ROW 1 --------------> | 1  | Valkey Cache Test   | running   | {...}    |
ROW 2 --------------> | 2  | Auto-scale Workers  | promoted  | {...}    |
                      +----+---------------------+-----------+----------+
```

---

## 2. Most Common PostgreSQL Data Types

| Data Type | What it stores | Example |
|---|---|---|
| `VARCHAR(n)` / `TEXT` | Any string text | `'Shadow Lab Experiment'` |
| `INT` / `INTEGER` | Whole numbers | `42`, `1000` |
| `BIGINT` | Large integers | `1723485748` |
| `BOOLEAN` / `BOOL` | True or false | `TRUE` / `FALSE` |
| `TIMESTAMP` | Date and time | `'2026-08-09 17:30:00'` |
| `TIMESTAMPTZ` | Timestamp with Timezone | `NOW()` |
| `JSONB` ⚡ | Binary JSON (Flexible key-value data!) | `'{"latency": 142, "cacheHit": 89}'` |

> [!TIP]
> **Why `JSONB` is PostgreSQL's Secret Weapon**:
> Unlike MySQL or older databases, Postgres lets you store raw JSON objects inside a column (`JSONB`) and query inside the JSON fields directly using SQL! This gives you the speed of NoSQL databases (like MongoDB) combined with the reliability of PostgreSQL.

---

## 3. Essential SQL Commands (The Big 5)

SQL (Structured Query Language) is the language used to speak to Postgres.

### 1. Creating a Table (`CREATE TABLE`)
```sql
CREATE TABLE IF NOT EXISTS experiments (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'running',
  based_on VARCHAR(100) DEFAULT 'Production',
  traffic_rate INT DEFAULT 1000,
  infra_changes JSONB,
  metrics JSONB,
  ai_analysis JSONB,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Inserting Data (`INSERT INTO`)
```sql
INSERT INTO experiments (id, name, status, traffic_rate, infra_changes)
VALUES (
  'exp-101', 
  'Valkey Cache Optimization', 
  'running', 
  1500, 
  '{"addValkey": true, "increaseWorkers": false}'::jsonb
);
```

### 3. Reading Data (`SELECT`)
```sql
-- Get all experiments
SELECT * FROM experiments;

-- Get specific fields for running experiments
SELECT id, name, traffic_rate FROM experiments WHERE status = 'running';

-- Querying inside JSONB column!
SELECT name, metrics->'shadow'->>'latency' AS shadow_latency 
FROM experiments 
WHERE (metrics->'shadow'->>'latency')::int < 200;
```

### 4. Updating Data (`UPDATE`)
```sql
UPDATE experiments 
SET status = 'promoted' 
WHERE id = 'exp-101';
```

### 5. Deleting Data (`DELETE`)
```sql
DELETE FROM experiments WHERE id = 'exp-101';
```

---

## 4. How Node.js Connects to PostgreSQL (`node-postgres` / `pg`)

In Node.js applications (like our Express backend), we use the official `pg` library.

### Step-by-Step Connection Code:
```javascript
import pg from 'pg';

// Create a Connection Pool
// A connection pool reuses active database connections instead of creating a new one every query
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/shadowlab',
});

// Executing a Query with Parameters (Prevents SQL Injection!)
export async function getExperimentById(id) {
  const result = await pool.query(
    'SELECT * FROM experiments WHERE id = $1',
    [id] // $1 safely injects id parameter
  );
  return result.rows[0]; // returns the single record object
}

// Inserting Data
export async function saveExperiment(exp) {
  const query = `
    INSERT INTO experiments (id, name, status, infra_changes, metrics, ai_analysis)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [
    exp.id,
    exp.name,
    exp.status,
    JSON.stringify(exp.infraChanges),
    JSON.stringify(exp.metrics),
    JSON.stringify(exp.aiAnalysis),
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
}
```

---

## 5. How Zerops Connects to PostgreSQL

When you deploy a PostgreSQL service on **Zerops**, Zerops spins up an isolated, high-performance PostgreSQL container.

Zerops automatically injects environment variables into your Node.js application container:
- `ZEROPS_DB_HOST` (e.g. `db.zerops.internal`)
- `ZEROPS_DB_PORT` (e.g. `5432`)
- `ZEROPS_DB_USER` (e.g. `zerops`)
- `ZEROPS_DB_PASSWORD` (automatically generated secure password)
- `ZEROPS_DB_NAME` (e.g. `app_db`)

In Node.js, we resolve the connection string automatically:
```javascript
const connectionString = process.env.DATABASE_URL || 
  `postgresql://${process.env.ZEROPS_DB_USER}:${process.env.ZEROPS_DB_PASSWORD}@${process.env.ZEROPS_DB_HOST}:${process.env.ZEROPS_DB_PORT || 5432}/${process.env.ZEROPS_DB_NAME}`;
```

---

## 6. SRE & Database Best Practices

1. **Always Use Prepared Parameters (`$1`, `$2`)**: Never concatenate user input directly into SQL strings (e.g. `WHERE name = '${name}'`) because it causes SQL Injection vulnerabilities.
2. **Use Indexes for Fast Searches**: If you query frequently by `status` or `created_at`, create an index:
   ```sql
   CREATE INDEX idx_experiments_status ON experiments(status);
   ```
3. **Use Auto-Migrations**: On server startup, run `CREATE TABLE IF NOT EXISTS` so tables are automatically initialized without requiring manual database administration.

---

### Quick Reference Glossary
- **Primary Key (`PRIMARY KEY`)**: Unique identifier for every row (e.g. `id`).
- **Foreign Key (`FOREIGN KEY`)**: Connects a row in one table to a row in another table (e.g. `experiment_id` pointing to `projects.id`).
- **Connection Pool**: A manager that keeps 5-10 database connections open and ready to execute queries instantly.
- **Migration**: The script or process that sets up database tables and schemas.
