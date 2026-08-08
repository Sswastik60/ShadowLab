// Zerops Service Integration Layer
// Handles Zerops service topology definitions, shadow environment cloning, and production promotion

let currentProjectState = {
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
      status: 'inactive',
      hitRate: '0%',
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

export const zeropsService = {
  getProject: async (projectId = 'my-production-app') => {
    return { ...currentProjectState, id: projectId, name: projectId };
  },

  cloneShadowEnvironment: async (projectId, infraChanges) => {
    const cloneId = `shadow-${projectId}-${Date.now()}`;
    const clonedServices = JSON.parse(JSON.stringify(currentProjectState.services));

    if (infraChanges?.addValkey) {
      const cacheService = clonedServices.find((s) => s.type === 'cache');
      if (cacheService) {
        cacheService.status = 'healthy';
        cacheService.hitRate = '87%';
        cacheService.memory = '140 MB / 512 MB';
        cacheService.keys = 142500;
      }
    }

    if (infraChanges?.increaseWorkers) {
      const apiService = clonedServices.find((s) => s.type === 'app');
      if (apiService) {
        apiService.instances = 4;
      }
    }

    return {
      cloneId,
      status: 'provisioned',
      basedOn: projectId,
      services: clonedServices,
      createdAt: new Date().toISOString(),
    };
  },

  promoteToProduction: async (experiment) => {
    const { infraChanges, metrics } = experiment;

    currentProjectState.services = currentProjectState.services.map((service) => {
      if (service.type === 'cache' && infraChanges?.addValkey) {
        return {
          ...service,
          status: 'healthy',
          hitRate: '87%',
          memory: '140 MB / 512 MB',
          keys: 142500,
        };
      }
      if (service.type === 'app' && infraChanges?.increaseWorkers) {
        return {
          ...service,
          instances: 4,
          latency: metrics?.shadow?.latency || 167,
          cpuUsage: metrics?.shadow?.cpuUsage || 44,
        };
      }
      if (service.type === 'db' && metrics?.shadow?.dbLoad) {
        return {
          ...service,
          load: metrics.shadow.dbLoad,
        };
      }
      return service;
    });

    currentProjectState.topology.nodes = currentProjectState.topology.nodes.map((node) => {
      if (node.type === 'cache' && infraChanges?.addValkey) {
        return { ...node, status: 'healthy', label: 'Valkey Cache (Active)' };
      }
      if (node.type === 'app' && infraChanges?.increaseWorkers) {
        return { ...node, label: 'API (4 Workers)' };
      }
      return node;
    });

    if (infraChanges?.addValkey && !currentProjectState.topology.edges.some((e) => e.target === 'cache')) {
      currentProjectState.topology.edges.push({
        source: 'api',
        target: 'cache',
        label: 'Valkey Hit (87%)',
      });
    }

    return {
      success: true,
      message: `Successfully promoted experiment "${experiment.name}" to Production on Zerops.`,
      updatedProject: currentProjectState,
    };
  },
};
