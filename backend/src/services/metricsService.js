// Metrics Service Module
// Computes real-time telemetry comparisons between Production baseline and Shadow Lab clone

export const metricsService = {
  calculateExperimentMetrics: (infraChanges = {}, trafficRate = 1000) => {
    let baseProdLatency = 420;
    let baseProdDbLoad = 61;
    let baseProdCpu = 58;

    let shadowLatency = baseProdLatency;
    let shadowDbLoad = baseProdDbLoad;
    let shadowCpu = baseProdCpu;
    let shadowCacheHit = 0;

    if (infraChanges.addValkey) {
      shadowLatency -= 253; // 420ms -> 167ms
      shadowDbLoad -= 37;   // 61% -> 24%
      shadowCacheHit = 87;
      shadowCpu -= 14;
    }

    if (infraChanges.increaseWorkers) {
      shadowLatency -= 60;
      shadowCpu -= 18;
    }

    if (infraChanges.increaseMemory) {
      shadowLatency -= 20;
      shadowCpu -= 5;
    }

    if (trafficRate > 1000) {
      const factor = trafficRate / 1000;
      shadowLatency = Math.round(shadowLatency * (1 + factor * 0.12));
      shadowDbLoad = Math.min(98, Math.round(shadowDbLoad * (1 + factor * 0.18)));
      shadowCpu = Math.min(98, Math.round(shadowCpu * (1 + factor * 0.2)));
    }

    shadowLatency = Math.max(45, shadowLatency);
    shadowDbLoad = Math.max(12, shadowDbLoad);

    const prodLatency = Math.round(baseProdLatency * (trafficRate / 1000));
    const prodDbLoad = Math.min(99, Math.round(baseProdDbLoad * (trafficRate / 1000)));

    return {
      production: {
        latency: prodLatency,
        dbLoad: prodDbLoad,
        cpuUsage: Math.min(95, baseProdCpu * Math.round(trafficRate / 1000)),
        cacheHitRate: 0,
        throughput: Math.min(trafficRate, 1200),
      },
      shadow: {
        latency: shadowLatency,
        dbLoad: shadowDbLoad,
        cpuUsage: shadowCpu,
        cacheHitRate: shadowCacheHit,
        throughput: trafficRate,
      },
      history: [
        { time: '00:00', prodLatency: prodLatency - 10, shadowLatency: shadowLatency + 3, prodDbLoad: prodDbLoad, shadowDbLoad: shadowDbLoad + 1 },
        { time: '00:05', prodLatency: prodLatency + 15, shadowLatency: shadowLatency - 2, prodDbLoad: prodDbLoad + 2, shadowDbLoad: shadowDbLoad },
        { time: '00:10', prodLatency: prodLatency - 2, shadowLatency: shadowLatency + 1, prodDbLoad: prodDbLoad - 1, shadowDbLoad: shadowDbLoad - 1 },
        { time: '00:15', prodLatency: prodLatency + 20, shadowLatency: shadowLatency - 5, prodDbLoad: prodDbLoad + 2, shadowDbLoad: shadowDbLoad },
        { time: '00:20', prodLatency: prodLatency, shadowLatency: shadowLatency, prodDbLoad: prodDbLoad, shadowDbLoad: shadowDbLoad },
      ],
    };
  },
};
