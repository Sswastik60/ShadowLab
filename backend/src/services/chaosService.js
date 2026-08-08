// Chaos Service Module
// Simulates production & shadow lab disruptions and computes resilience scorecards

const SCENARIO_RESULTS = {
  kill_api: {
    title: 'API Worker Failure Test',
    prodStatus: 'UNAFFECTED',
    shadowStatus: 'FAILOVER RECOVERED',
    downtime: '1.2 seconds',
    recoveryTime: '45s',
    resilienceScore: 88,
    weakness: 'Single worker load spiked temporarily during secondary spin-up.',
  },
  kill_db: {
    title: 'Database Outage Resilience Test',
    prodStatus: 'UNAFFECTED',
    shadowStatus: 'API FAILED (No Fallback)',
    downtime: '2m 14s',
    recoveryTime: '2m 14s',
    resilienceScore: 64,
    weakness: 'No database fallback or circuit breaker pattern implemented in API layer.',
  },
  latency_spike: {
    title: 'Latency Spike & Timeout Test',
    prodStatus: 'UNAFFECTED',
    shadowStatus: 'GRACEFUL DEGRADATION',
    downtime: '0s',
    recoveryTime: 'Instant',
    resilienceScore: 92,
    weakness: 'Slight accumulation of HTTP connection sockets on API workers.',
  },
  traffic_spike: {
    title: 'Extreme Load Burst Test (10,000 QPS)',
    prodStatus: 'UNAFFECTED',
    shadowStatus: 'HIGH CPU THROTTLE',
    downtime: '4.8 seconds',
    recoveryTime: '1m 05s',
    resilienceScore: 78,
    weakness: 'Worker pool saturated before auto-scaling trigger kicked in.',
  },
  kill_worker: {
    title: 'Background Queue Resiliency',
    prodStatus: 'UNAFFECTED',
    shadowStatus: 'QUEUED BACKLOG',
    downtime: '0s',
    recoveryTime: '12s',
    resilienceScore: 95,
    weakness: 'Jobs delayed in Valkey queue but zero data loss reported.',
  },
  memory_pressure: {
    title: 'Memory Saturation Test',
    prodStatus: 'UNAFFECTED',
    shadowStatus: 'WORKER RESTARTED',
    downtime: '3 seconds',
    recoveryTime: '30s',
    resilienceScore: 82,
    weakness: 'Heap limit warning missing alert triggers before OOM kill.',
  },
};

export const chaosService = {
  getScenarios: () => [
    { id: 'kill_api', name: 'Kill API Worker', icon: 'ZapOff', severity: 'High', description: 'Simulates a sudden API container crash during peak load' },
    { id: 'kill_db', name: 'Kill Database', icon: 'DatabaseZap', severity: 'Critical', description: 'Simulates sudden PostgreSQL primary connection loss' },
    { id: 'latency_spike', name: 'Add 500ms Latency', icon: 'Clock', severity: 'Medium', description: 'Injects simulated cross-datacenter network packet latency' },
    { id: 'traffic_spike', name: 'Traffic Spike (10,000 QPS)', icon: 'TrendingUp', severity: 'High', description: 'Instantaneous 10x load burst test' },
    { id: 'kill_worker', name: 'Kill Background Worker', icon: 'Cpu', severity: 'Medium', description: 'Terminates async job queue background instance' },
    { id: 'memory_pressure', name: 'Memory Pressure', icon: 'AlertTriangle', severity: 'Medium', description: 'Simulates memory saturation and garbage collection delay' },
  ],

  runSimulation: async (scenarioId) => {
    const result = SCENARIO_RESULTS[scenarioId] || SCENARIO_RESULTS.kill_db;
    return {
      scenarioId,
      timestamp: new Date().toISOString(),
      result,
    };
  },
};
