/**
 * Performance Metrics Section
 *
 * Showcases FlatWP's performance benchmarks and Core Web Vitals
 */

import { MetricCard } from './MetricCard';
import { Zap, TrendingUp, Gauge, Clock } from 'lucide-react';

export function PerformanceMetrics() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-background dark:to-slate-950/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold">
            Performance That{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Speaks for Itself
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            FlatWP delivers exceptional Core Web Vitals scores and real-world performance metrics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <MetricCard
            value="98"
            label="Lighthouse Score"
            subtext="Performance"
            icon={Gauge}
            gradient="from-emerald-500 to-green-600"
          />
          <MetricCard
            value="<0.8s"
            label="Largest Contentful Paint"
            subtext="LCP - Core Web Vital"
            icon={Zap}
            gradient="from-blue-500 to-cyan-600"
          />
          <MetricCard
            value="0.01"
            label="Cumulative Layout Shift"
            subtext="CLS - Core Web Vital"
            icon={TrendingUp}
            gradient="from-purple-500 to-pink-600"
          />
          <MetricCard
            value="<100ms"
            label="Time to First Byte"
            subtext="TTFB with ISR"
            icon={Clock}
            gradient="from-orange-500 to-red-600"
          />
        </div>

        {/* Performance comparison */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Why FlatWP Outperforms Traditional WordPress
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-red-600 dark:text-red-400">3.2s</div>
                <div className="text-sm text-muted-foreground">Traditional WordPress</div>
                <div className="text-xs text-muted-foreground/70">Average page load time</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-6xl font-bold text-emerald-600 dark:text-emerald-400">→</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">0.7s</div>
                <div className="text-sm text-muted-foreground">FlatWP</div>
                <div className="text-xs text-muted-foreground/70">78% faster load time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
