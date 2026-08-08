// ShadowLab Mock Data Service
// Simulates Zerops environment metrics, experiments, chaos tests, and AI analysis

export const INITIAL_PROJECT = {
  id: 'my-production-app',
  name: 'my-production-app',
  environment: 'Production',
  status: 'healthy',
  region: 'prg1 (Europe)',
  createdDate: '2026-07-15',
  services: [
    {
      id: 'api-service',
      name: 'API Service',
      type: 'app',
      runtime: 'Node.js 20',
      status: 'healthy',
      instances: 2,
      cpuUsage: 42,
      memory: '310 MB / 1 GB',
      memoryPercentage: 31,
      latency: 184,
      throughput: 1050,
      port: 3000,
    },
    {
      id: 'postgres-db',
      name: 'PostgreSQL DB',
      type: 'db',
      version: 'PostgreSQL 16',
      status: 'healthy',
      load: 61,
      connections: 420,
      maxConnections: 500,
      storage: '14.2 GB / 50 GB',
    },
    {
      id: 'valkey-cache',
      name: 'Valkey Cache',
      type: 'cache',
      version: 'Valkey 7.2',
      status: 'inactive', // inactive in baseline production until added in experiment
      hitRate: 0,
      memory: '0 MB',
      keys: 0,
    },
  ],
  topology: {
    nodes: [
      { id: 'user', label: 'User Traffic', type: 'ingress', icon: 'Globe' },
      { id: 'api', label: 'API (2 Workers)', type: 'app', status: 'healthy', icon: 'Server' },
      { id: 'db', label: 'PostgreSQL DB', type: 'db', status: 'healthy', icon: 'Database' },
      { id: 'cache', label: 'Valkey Cache', type: 'cache', status: 'disabled', icon: 'Zap' },
    ],
    edges: [
      { source: 'user', target: 'api', label: 'HTTP / QPS 1,050' },
      { source: 'api', target: 'db', label: 'SQL (420 conn)' },
    ],
  },
};

export const INITIAL_EXPERIMENTS = [
  {
    id: 'exp-redis-opt',
    name: 'Redis / Valkey Optimization',
    status: 'running',
    createdAt: '12 minutes ago',
    basedOn: 'Production',
    trafficRate: 1000,
    infraChanges: {
      addValkey: true,
      increaseWorkers: false,
      changeNodeVersion: false,
      changeDatabase: false,
      increaseMemory: true,
    },
    metrics: {
      production: {
        latency: 420,
        dbLoad: 61,
        cpuUsage: 58,
        cacheHitRate: 0,
        throughput: 980,
      },
      shadow: {
        latency: 167,
        dbLoad: 24,
        cpuUsage: 44,
        cacheHitRate: 87,
        throughput: 1000,
      },
      history: [
        { time: '00:00', prodLatency: 410, shadowLatency: 170, prodDbLoad: 60, shadowDbLoad: 25 },
        { time: '00:05', prodLatency: 425, shadowLatency: 165, prodDbLoad: 62, shadowDbLoad: 24 },
        { time: '00:10', prodLatency: 418, shadowLatency: 168, prodDbLoad: 61, shadowDbLoad: 23 },
        { time: '00:15', prodLatency: 430, shadowLatency: 162, prodDbLoad: 63, shadowDbLoad: 24 },
        { time: '00:20', prodLatency: 420, shadowLatency: 167, prodDbLoad: 61, shadowDbLoad: 24 },
      ],
    },
    aiAnalysis: {
      result: 'SIGNIFICANT IMPROVEMENT',
      resultType: 'success',
      headline: 'API latency decreased by 60%.',
      reasons: [
        '68% fewer database reads due to high Valkey cache hit rate',
        '87% cache hit rate for frequent payload requests',
        '14% lower CPU usage across API containers',
      ],
      risks: [
        'At >8,000 concurrent users, cache memory may become the new bottleneck.',
      ],
      recommendation: 'Promote Valkey Cache & Memory allocation changes to Production.',
      canPromote: true,
    },
  },
  {
    id: 'exp-worker-scale',
    name: 'Worker Auto-scaling (2 -> 4 Instances)',
    status: 'completed',
    createdAt: '3 hours ago',
    basedOn: 'Production',
    trafficRate: 5000,
    infraChanges: {
      addValkey: false,
      increaseWorkers: true,
      changeNodeVersion: false,
      changeDatabase: false,
      increaseMemory: false,
    },
    metrics: {
      production: {
        latency: 650,
        dbLoad: 88,
        cpuUsage: 92,
        cacheHitRate: 0,
        throughput: 3200,
      },
      shadow: {
        latency: 240,
        dbLoad: 65,
        cpuUsage: 48,
        cacheHitRate: 0,
        throughput: 4950,
      },
      history: [
        { time: '00:00', prodLatency: 620, shadowLatency: 250, prodDbLoad: 85, shadowDbLoad: 64 },
        { time: '00:05', prodLatency: 660, shadowLatency: 242, prodDbLoad: 89, shadowDbLoad: 66 },
        { time: '00:10', prodLatency: 645, shadowLatency: 238, prodDbLoad: 87, shadowDbLoad: 65 },
        { time: '00:15', prodLatency: 650, shadowLatency: 240, prodDbLoad: 88, shadowDbLoad: 65 },
      ],
    },
    aiAnalysis: {
      result: 'MODERATE IMPROVEMENT',
      resultType: 'success',
      headline: 'Throughput increased by 54% under peak load.',
      reasons: [
        'Distributed event-loop workload over 4 API workers',
        'Prevented worker node CPU throttle at 5K req/sec',
      ],
      risks: [
        'Database connections nearing maximum capacity (88% load).',
      ],
      recommendation: 'Promote to production with DB connection pool tuning.',
      canPromote: true,
    },
  },
];

export const CHAOS_SCENARIOS = [
  {
    id: 'kill_api',
    name: 'Kill API Worker',
    icon: 'ZapOff',
    description: 'Simulates a sudden API container crash during peak load',
    severity: 'High',
    result: {
      title: 'API Worker Failure Test',
      prodStatus: 'UNAFFECTED',
      prodBadge: 'healthy',
      shadowStatus: 'FAILOVER RECOVERED',
      shadowBadge: 'warning',
      downtime: '1.2 seconds',
      recoveryTime: '45s',
      resilienceScore: 88,
      weakness: 'Single worker load spiked temporarily during secondary spin-up.',
    },
  },
  {
    id: 'kill_db',
    name: 'Kill Database',
    icon: 'DatabaseZap',
    description: 'Simulates sudden PostgreSQL primary connection loss',
    severity: 'Critical',
    result: {
      title: 'Database Outage Resilience Test',
      prodStatus: 'UNAFFECTED',
      prodBadge: 'healthy',
      shadowStatus: 'API FAILED (No Fallback)',
      shadowBadge: 'danger',
      downtime: '2m 14s',
      recoveryTime: '2m 14s',
      resilienceScore: 64,
      weakness: 'No database fallback or circuit breaker pattern implemented in API layer.',
    },
  },
  {
    id: 'latency_spike',
    name: 'Add 500ms Latency',
    icon: 'Clock',
    description: 'Injects simulated cross-datacenter network packet latency',
    severity: 'Medium',
    result: {
      title: 'Latency Spike & Timeout Test',
      prodStatus: 'UNAFFECTED',
      prodBadge: 'healthy',
      shadowStatus: 'GRACEFUL DEGRADATION',
      shadowBadge: 'success',
      downtime: '0s',
      recoveryTime: 'Instant',
      resilienceScore: 92,
      weakness: 'Slight accumulation of HTTP connection sockets on API workers.',
    },
  },
  {
    id: 'traffic_spike',
    name: 'Traffic Spike (10,000 QPS)',
    icon: 'TrendingUp',
    description: 'Instantaneous 10x load burst test',
    severity: 'High',
    result: {
      title: 'Extreme Load Burst Test',
      prodStatus: 'UNAFFECTED',
      prodBadge: 'healthy',
      shadowStatus: 'HIGH CPU THROTTLE',
      shadowBadge: 'warning',
      downtime: '4.8 seconds',
      recoveryTime: '1m 05s',
      resilienceScore: 78,
      weakness: 'Worker pool saturated before auto-scaling trigger kicked in.',
    },
  },
  {
    id: 'kill_worker',
    name: 'Kill Background Worker',
    icon: 'Cpu',
    description: 'Terminates async job queue background instance',
    severity: 'Medium',
    result: {
      title: 'Background Queue Resiliency',
      prodStatus: 'UNAFFECTED',
      prodBadge: 'healthy',
      shadowStatus: 'QUEUED BACKLOG',
      shadowBadge: 'success',
      downtime: '0s',
      recoveryTime: '12s',
      resilienceScore: 95,
      weakness: 'Jobs delayed in Valkey queue but zero data loss reported.',
    },
  },
  {
    id: 'memory_pressure',
    name: 'Memory Pressure',
    icon: 'AlertTriangle',
    description: 'Simulates memory saturation and garbage collection delay',
    severity: 'Medium',
    result: {
      title: 'Memory Saturation Test',
      prodStatus: 'UNAFFECTED',
      prodBadge: 'healthy',
      shadowStatus: 'WORKER RESTARTED',
      shadowBadge: 'warning',
      downtime: '3 seconds',
      recoveryTime: '30s',
      resilienceScore: 82,
      weakness: 'Heap limit warning missing alert triggers before OOM kill.',
    },
  },
];

export function calculateCustomExperiment(config) {
  let baseProdLatency = 420;
  let baseProdDbLoad = 61;
  let baseProdCpu = 58;

  let shadowLatency = baseProdLatency;
  let shadowDbLoad = baseProdDbLoad;
  let shadowCpu = baseProdCpu;
  let shadowCacheHit = 0;

  if (config.addValkey) {
    shadowLatency -= 220;
    shadowDbLoad -= 35;
    shadowCacheHit = 87;
    shadowCpu -= 12;
  }

  if (config.increaseWorkers) {
    shadowLatency -= 60;
    shadowCpu -= 18;
  }

  if (config.increaseMemory) {
    shadowLatency -= 30;
    shadowCpu -= 5;
  }

  if (config.trafficRate > 1000) {
    const factor = config.trafficRate / 1000;
    shadowLatency = Math.round(shadowLatency * (1 + factor * 0.15));
    shadowDbLoad = Math.min(99, Math.round(shadowDbLoad * (1 + factor * 0.2)));
    shadowCpu = Math.min(99, Math.round(shadowCpu * (1 + factor * 0.25)));
  }

  shadowLatency = Math.max(45, shadowLatency);
  shadowDbLoad = Math.max(10, shadowDbLoad);

  const prodLatency = Math.round(baseProdLatency * (config.trafficRate / 1000));
  const prodDbLoad = Math.min(98, Math.round(baseProdDbLoad * (config.trafficRate / 1000)));

  return {
    metrics: {
      production: {
        latency: prodLatency,
        dbLoad: prodDbLoad,
        cpuUsage: Math.min(95, baseProdCpu * Math.round(config.trafficRate / 1000)),
        cacheHitRate: 0,
        throughput: Math.min(config.trafficRate, 1200),
      },
      shadow: {
        latency: shadowLatency,
        dbLoad: shadowDbLoad,
        cpuUsage: shadowCpu,
        cacheHitRate: shadowCacheHit,
        throughput: config.trafficRate,
      },
    },
    aiAnalysis: {
      result: shadowLatency < prodLatency ? 'SIGNIFICANT IMPROVEMENT' : 'NO SIGNIFICANT DIFFERENCE',
      resultType: shadowLatency < prodLatency ? 'success' : 'warning',
      headline: shadowLatency < prodLatency 
        ? `API latency reduced by ${Math.round(((prodLatency - shadowLatency) / prodLatency) * 100)}%.`
        : 'Metrics remain comparable to baseline.',
      reasons: [
        config.addValkey ? '87% hit rate offloading repetitive query load from database' : 'Standard database polling',
        config.increaseWorkers ? 'Parallelized CPU event loop execution across workers' : 'Baseline 2-worker pool',
        `${Math.round(prodDbLoad - shadowDbLoad)}% database load delta achieved`,
      ],
      risks: [
        config.trafficRate >= 5000 ? 'High concurrent QPS requires cache memory scaling above 512MB.' : 'Low risk profile under current traffic rate.',
      ],
      recommendation: 'Promote Shadow Lab infrastructure adjustments to Production.',
      canPromote: true,
    },
  };
}
