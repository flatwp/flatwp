/**
 * Real User Monitoring (RUM) - Client-side performance tracking
 *
 * Collects Core Web Vitals, custom metrics, and sends to monitoring endpoint
 */

export interface WebVital {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

export interface ResourceMetric {
  name: string;
  duration: number;
  size: number;
  type: string;
  initiatorType: string;
}

export interface CustomMetric {
  name: string;
  value: number;
  unit?: string;
  tags?: Record<string, string>;
}

export interface PageMetrics {
  url: string;
  timestamp: number;
  vitals: {
    lcp?: WebVital;
    inp?: WebVital;
    cls?: WebVital;
    ttfb?: WebVital;
    fcp?: WebVital;
  };
  resources: {
    images: ResourceMetric[];
    fonts: ResourceMetric[];
    scripts: ResourceMetric[];
    stylesheets: ResourceMetric[];
    other: ResourceMetric[];
  };
  custom: CustomMetric[];
  navigation: {
    domInteractive: number;
    domComplete: number;
    loadEventEnd: number;
  };
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

class RUMMonitor {
  private metrics: PageMetrics = {
    url: typeof window !== 'undefined' ? window.location.href : '',
    timestamp: Date.now(),
    vitals: {},
    resources: {
      images: [],
      fonts: [],
      scripts: [],
      stylesheets: [],
      other: [],
    },
    custom: [],
    navigation: {
      domInteractive: 0,
      domComplete: 0,
      loadEventEnd: 0,
    },
  };

  private vitalCallbacks = new Set<(vital: WebVital) => void>();
  private batchTimer?: NodeJS.Timeout;
  private readonly BATCH_DELAY = 30000; // 30 seconds

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMonitoring();
    }
  }

  private initializeMonitoring() {
    // Collect Web Vitals
    this.collectWebVitals();

    // Collect Resource Performance
    this.collectResourcePerformance();

    // Collect Navigation Timing
    this.collectNavigationTiming();

    // Collect Memory if available
    if ((performance as any).memory) {
      this.collectMemory();
    }

    // Send metrics periodically
    this.scheduleBatch();

    // Send metrics on page unload
    this.setupUnloadHandler();
  }

  private collectWebVitals() {
    // Import web-vitals dynamically to avoid build issues
    if (typeof window !== 'undefined') {
      try {
        // Use PerformanceObserver for real-time vital collection
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'paint') {
              const paintEntry = entry as PerformancePaintTiming;
              if (paintEntry.name === 'first-contentful-paint') {
                this.metrics.vitals.fcp = {
                  name: 'FCP',
                  value: paintEntry.startTime,
                  rating: this.rateVital('FCP', paintEntry.startTime),
                  delta: 0,
                  id: `fcp-${Date.now()}`,
                };
              }
            }
          }
        });

        observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift', 'first-input', 'interaction'] });

        // LCP collection
        this.collectLCP();

        // CLS collection
        this.collectCLS();

        // INP collection
        this.collectINP();

        // TTFB collection
        this.collectTTFB();
      } catch (error) {
        console.warn('Failed to collect Web Vitals:', error);
      }
    }
  }

  private collectLCP() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntryList[0] & { renderTime?: number; loadTime?: number };

        if (lastEntry.renderTime || lastEntry.loadTime) {
          const startTime = (lastEntry.renderTime || lastEntry.loadTime) as number;
          this.metrics.vitals.lcp = {
            name: 'LCP',
            value: startTime,
            rating: this.rateVital('LCP', startTime),
            delta: 0,
            id: `lcp-${Date.now()}`,
          };
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      console.warn('Failed to collect LCP:', error);
    }
  }

  private collectCLS() {
    let clsValue = 0;
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            this.metrics.vitals.cls = {
              name: 'CLS',
              value: clsValue,
              rating: this.rateVital('CLS', clsValue),
              delta: 0,
              id: `cls-${Date.now()}`,
            };
          }
        }
      });

      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('Failed to collect CLS:', error);
    }
  }

  private collectINP() {
    let maxINP = 0;
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const interaction = entry as any;
          const inp = interaction.duration;
          if (inp > maxINP) {
            maxINP = inp;
          }
        }

        if (maxINP > 0) {
          this.metrics.vitals.inp = {
            name: 'INP',
            value: maxINP,
            rating: this.rateVital('INP', maxINP),
            delta: 0,
            id: `inp-${Date.now()}`,
          };
        }
      });

      observer.observe({ entryTypes: ['interaction'] });
    } catch (error) {
      console.warn('Failed to collect INP:', error);
    }
  }

  private collectTTFB() {
    try {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (perfData) {
        const ttfb = perfData.responseStart - perfData.fetchStart;
        this.metrics.vitals.ttfb = {
          name: 'TTFB',
          value: ttfb,
          rating: this.rateVital('TTFB', ttfb),
          delta: 0,
          id: `ttfb-${Date.now()}`,
        };
      }
    } catch (error) {
      console.warn('Failed to collect TTFB:', error);
    }
  }

  private rateVital(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds: Record<string, [number, number]> = {
      LCP: [2500, 4000],
      INP: [200, 500],
      CLS: [0.1, 0.25],
      TTFB: [600, 1200],
      FCP: [1800, 3000],
    };

    const [good, poor] = thresholds[metric] || [0, Infinity];

    if (value <= good) return 'good';
    if (value >= poor) return 'poor';
    return 'needs-improvement';
  }

  private collectResourcePerformance() {
    try {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

      resources.forEach((resource) => {
        const metric: ResourceMetric = {
          name: resource.name,
          duration: resource.duration,
          size: (resource as any).transferSize || 0,
          type: resource.initiatorType,
          initiatorType: resource.initiatorType,
        };

        // Categorize resource
        if (resource.name.match(/\.(jpg|jpeg|png|webp|gif|svg|avif)$/i)) {
          this.metrics.resources.images.push(metric);
        } else if (resource.name.match(/\.(woff|woff2|ttf|otf|eot)$/i)) {
          this.metrics.resources.fonts.push(metric);
        } else if (resource.name.match(/\.js$/i)) {
          this.metrics.resources.scripts.push(metric);
        } else if (resource.name.match(/\.css$/i)) {
          this.metrics.resources.stylesheets.push(metric);
        } else {
          this.metrics.resources.other.push(metric);
        }
      });
    } catch (error) {
      console.warn('Failed to collect resource performance:', error);
    }
  }

  private collectNavigationTiming() {
    try {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (perfData) {
        this.metrics.navigation = {
          domInteractive: perfData.domInteractive - perfData.fetchStart,
          domComplete: perfData.domComplete - perfData.fetchStart,
          loadEventEnd: perfData.loadEventEnd - perfData.fetchStart,
        };
      }
    } catch (error) {
      console.warn('Failed to collect navigation timing:', error);
    }
  }

  private collectMemory() {
    try {
      const memData = (performance as any).memory;
      if (memData) {
        this.metrics.memory = {
          usedJSHeapSize: memData.usedJSHeapSize,
          totalJSHeapSize: memData.totalJSHeapSize,
          jsHeapSizeLimit: memData.jsHeapSizeLimit,
        };
      }
    } catch (error) {
      console.warn('Failed to collect memory metrics:', error);
    }
  }

  private scheduleBatch() {
    if (this.batchTimer) clearTimeout(this.batchTimer);

    this.batchTimer = setTimeout(() => {
      this.sendMetrics();
      this.scheduleBatch();
    }, this.BATCH_DELAY);
  }

  private setupUnloadHandler() {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.sendMetrics(true);
      });
    }
  }

  private async sendMetrics(isUnload = false) {
    try {
      const endpoint = '/api/metrics';

      const payload = {
        type: 'rum',
        metrics: this.metrics,
        timestamp: new Date().toISOString(),
        isUnload,
      };

      if (isUnload) {
        // Use sendBeacon for unload to ensure delivery
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon(endpoint, blob);
      } else {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        });
      }
    } catch (error) {
      console.warn('Failed to send metrics:', error);
    }
  }

  public recordCustomMetric(name: string, value: number, unit?: string, tags?: Record<string, string>) {
    this.metrics.custom.push({
      name,
      value,
      unit,
      tags,
    });
  }

  public onVital(callback: (vital: WebVital) => void) {
    this.vitalCallbacks.add(callback);
  }

  public getMetrics(): PageMetrics {
    return this.metrics;
  }
}

// Export singleton instance
export const rum = new RUMMonitor();

// Export hook for React components
export function useRUM() {
  return {
    recordMetric: (name: string, value: number, unit?: string, tags?: Record<string, string>) => {
      rum.recordCustomMetric(name, value, unit, tags);
    },
    getMetrics: () => rum.getMetrics(),
  };
}
