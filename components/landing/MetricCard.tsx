/**
 * Metric Card Component
 *
 * Displays performance metrics with large numbers and labels
 */

import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  value: string;
  label: string;
  subtext?: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down';
  gradient?: string;
}

export function MetricCard({
  value,
  label,
  subtext,
  icon: Icon,
  trend,
  gradient = 'from-emerald-500 to-teal-500',
}: MetricCardProps) {
  return (
    <Card className="relative overflow-hidden border-2 hover:scale-105 transition-transform duration-300">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`}
      />
      <CardContent className="p-6 relative">
        {Icon && (
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        )}
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {value}
            </span>
            {trend && (
              <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trend === 'up' ? '↑' : '↓'}
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          {subtext && (
            <p className="text-xs text-muted-foreground/70">{subtext}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
