/**
 * Application Performance Monitoring (APM) - Server-side performance tracking
 *
 * Tracks API performance, GraphQL queries, cache statistics, and error tracking
 */

import { performance } from 'perf_hooks';

export interface APMMetric {
  name: string;
  value: number;
  unit: string;
  tags: Record<string, string>;
  timestamp: number;
}

export interface RequestMetrics {
  path: string;
  method: string;
  statusCode: number;
  duration: number;
  timestamp: number;
  tags: Record<string, string>;
  errors?: string[];
}

export interface GraphQLMetrics {
  query: string;
  operationName?: string;
  duration: number;
  cacheHit: boolean;
  timestamp: number;
}

export interface CacheMetrics {
  path: string;
  hit: boolean;
  duration: number;
  timestamp: number;
}

export interface AggregatedMetrics {
  timeWindow: number; // in milliseconds
  requestMetrics: {
    totalRequests: number;
    avgDuration: number;
    minDuration: number;
    maxDuration: number;
    errorCount: number;
    errorRate: number;
  };
  cacheMetrics: {
    totalRequests: number;
    hits: number;
    hitRate: number;
    avgDuration: number;
  };
  graphqlMetrics: {
    totalQueries: number;
    avgDuration: number;
    slowQueries: number;
  };
  resourceMetrics: {
    memoryUsage: number;
    uptime: number;
  };
}

class APMMonitor {
  private requestMetrics: RequestMetrics[] = [];
  private cacheMetrics: CacheMetrics[] = [];
  private graphqlMetrics: GraphQLMetrics[] = [];
  private customMetrics: APMMetric[] = [];
  private startTime = Date.now();

  private readonly MAX_METRICS = 1000; // Keep last N metrics
  private readonly AGGREGATION_INTERVAL = 60000; // 1 minute
  private aggregationTimer?: NodeJS.Timeout;

  constructor() {
    this.startAggregation();
  }

  /**
   * Record HTTP request metrics
   */
  public recordRequest(
    path: string,
    method: string,
    statusCode: number,
    duration: number,
    tags: Record<string, string> = {}
  ) {
    const metric: RequestMetrics = {
      path,
      method,
      statusCode,
      duration,
      timestamp: Date.now(),
      tags,
      errors: statusCode >= 400 ? [`HTTP ${statusCode}`] : undefined,
    };

    this.requestMetrics.push(metric);
    this.trimMetrics();
  }

  /**
   * Record cache hit/miss
   */
  public recordCache(path: string, hit: boolean, duration: number) {
    const metric: CacheMetrics = {
      path,
      hit,
      duration,
      timestamp: Date.now(),
    };

    this.cacheMetrics.push(metric);
    this.trimMetrics();
  }

  /**
   * Record GraphQL query performance
   */
  public recordGraphQL(query: string, duration: number, cacheHit: boolean, operationName?: string) {
    const metric: GraphQLMetrics = {
      query,
      operationName,
      duration,
      cacheHit,
      timestamp: Date.now(),
    };

    this.graphqlMetrics.push(metric);
    this.trimMetrics();
  }

  /**
   * Record custom metrics
   */
  public recordMetric(name: string, value: number, unit = 'ms', tags: Record<string, string> = {}) {
    const metric: APMMetric = {
      name,
      value,
      unit,
      tags,
      timestamp: Date.now(),
    };

    this.customMetrics.push(metric);
    this.trimMetrics();
  }

  /**
   * Create a timer for measuring operation duration
   */
  public createTimer() {
    const start = performance.now();
    return {
      end: () => performance.now() - start,
      record: (name: string, tags?: Record<string, string>) => {
        const duration = performance.now() - start;
        this.recordMetric(name, duration, 'ms', tags);
        return duration;
      },
    };
  }

  /**
   * Get aggregated metrics for the current time window
   */
  public getAggregatedMetrics(): AggregatedMetrics {
    return {
      timeWindow: this.AGGREGATION_INTERVAL,
      requestMetrics: this.aggregateRequestMetrics(),
      cacheMetrics: this.aggregateCacheMetrics(),
      graphqlMetrics: this.aggregateGraphQLMetrics(),
      resourceMetrics: this.getResourceMetrics(),
    };
  }

  /**
   * Get top slow endpoints
   */
  public getSlowEndpoints(limit = 10): RequestMetrics[] {
    return [...this.requestMetrics]
      .sort((a, b) => b.duration - a.duration)
      .slice(0, limit);
  }

  /**
   * Get top slow GraphQL queries
   */
  public getSlowQueries(limit = 10): GraphQLMetrics[] {
    return [...this.graphqlMetrics]
      .sort((a, b) => b.duration - a.duration)
      .slice(0, limit);
  }

  /**
   * Get recent errors
   */
  public getRecentErrors(limit = 20): RequestMetrics[] {
    return [...this.requestMetrics]
      .filter((m) => m.statusCode >= 400)
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  /**
   * Export metrics as JSON
   */
  public export() {
    return {
      aggregated: this.getAggregatedMetrics(),
      slowEndpoints: this.getSlowEndpoints(),
      slowQueries: this.getSlowQueries(),
      recentErrors: this.getRecentErrors(),
      timestamp: new Date().toISOString(),
    };
  }

  private aggregateRequestMetrics() {
    if (this.requestMetrics.length === 0) {
      return {
        totalRequests: 0,
        avgDuration: 0,
        minDuration: 0,
        maxDuration: 0,
        errorCount: 0,
        errorRate: 0,
      };
    }

    const durations = this.requestMetrics.map((m) => m.duration);
    const errors = this.requestMetrics.filter((m) => m.statusCode >= 400).length;

    return {
      totalRequests: this.requestMetrics.length,
      avgDuration: durations.reduce((a, b) => a + b, 0) / durations.length,
      minDuration: Math.min(...durations),
      maxDuration: Math.max(...durations),
      errorCount: errors,
      errorRate: (errors / this.requestMetrics.length) * 100,
    };
  }

  private aggregateCacheMetrics() {
    if (this.cacheMetrics.length === 0) {
      return {
        totalRequests: 0,
        hits: 0,
        hitRate: 0,
        avgDuration: 0,
      };
    }

    const hits = this.cacheMetrics.filter((m) => m.hit).length;
    const durations = this.cacheMetrics.map((m) => m.duration);

    return {
      totalRequests: this.cacheMetrics.length,
      hits,
      hitRate: (hits / this.cacheMetrics.length) * 100,
      avgDuration: durations.reduce((a, b) => a + b, 0) / durations.length,
    };
  }

  private aggregateGraphQLMetrics() {
    if (this.graphqlMetrics.length === 0) {
      return {
        totalQueries: 0,
        avgDuration: 0,
        slowQueries: 0,
      };
    }

    const durations = this.graphqlMetrics.map((m) => m.duration);
    const slowQueries = this.graphqlMetrics.filter((m) => m.duration > 1000).length;

    return {
      totalQueries: this.graphqlMetrics.length,
      avgDuration: durations.reduce((a, b) => a + b, 0) / durations.length,
      slowQueries,
    };
  }

  private getResourceMetrics() {
    const uptime = Date.now() - this.startTime;

    return {
      memoryUsage:
        typeof process !== 'undefined' && process.memoryUsage
          ? process.memoryUsage().heapUsed / 1024 / 1024 // MB
          : 0,
      uptime: uptime / 1000, // seconds
    };
  }

  private trimMetrics() {
    if (this.requestMetrics.length > this.MAX_METRICS) {
      this.requestMetrics = this.requestMetrics.slice(-this.MAX_METRICS);
    }
    if (this.cacheMetrics.length > this.MAX_METRICS) {
      this.cacheMetrics = this.cacheMetrics.slice(-this.MAX_METRICS);
    }
    if (this.graphqlMetrics.length > this.MAX_METRICS) {
      this.graphqlMetrics = this.graphqlMetrics.slice(-this.MAX_METRICS);
    }
    if (this.customMetrics.length > this.MAX_METRICS) {
      this.customMetrics = this.customMetrics.slice(-this.MAX_METRICS);
    }
  }

  private startAggregation() {
    this.aggregationTimer = setInterval(() => {
      const metrics = this.getAggregatedMetrics();
      // Send to monitoring endpoint
      this.sendMetrics(metrics);
    }, this.AGGREGATION_INTERVAL);
  }

  private async sendMetrics(metrics: AggregatedMetrics) {
    try {
      const response = await fetch('/api/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'apm',
          metrics,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        console.warn('Failed to send APM metrics:', response.statusText);
      }
    } catch (error) {
      console.warn('Failed to send APM metrics:', error);
    }
  }

  public stop() {
    if (this.aggregationTimer) {
      clearInterval(this.aggregationTimer);
    }
  }
}

// Export singleton instance
export const apm = new APMMonitor();

// Middleware helper for Next.js
export function withAPMTracking() {
  return (handler: (req: any, res: any) => Promise<void>) => {
    return async (req: any, res: any) => {
      const startTime = performance.now();

      // Wrap response to capture status code
      const originalJson = res.json.bind(res);
      res.json = function (data: any) {
        const duration = performance.now() - startTime;
        apm.recordRequest(req.url, req.method, res.statusCode, duration, {
          route: req.nextUrl?.pathname || req.url,
          method: req.method,
        });
        return originalJson(data);
      };

      // Call the original handler
      await handler(req, res);
    };
  };
}
