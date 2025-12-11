import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'accent' | 'blue' | 'green' | 'yellow' | 'red';
}

export const StatCard = ({ title, value, icon: Icon, trend, color = 'primary' }: StatCardProps) => {
  const colorClasses = {
    primary: 'from-primary/20 to-primary/5 border-primary/30',
    accent: 'from-accent/20 to-accent/5 border-accent/30',
    blue: 'from-google-blue/20 to-google-blue/5 border-google-blue/30',
    green: 'from-google-green/20 to-google-green/5 border-google-green/30',
    yellow: 'from-google-yellow/20 to-google-yellow/5 border-google-yellow/30',
    red: 'from-google-red/20 to-google-red/5 border-google-red/30',
  };

  const iconColorClasses = {
    primary: 'text-primary',
    accent: 'text-accent',
    blue: 'text-google-blue',
    green: 'text-google-green',
    yellow: 'text-google-yellow',
    red: 'text-google-red',
  };

  return (
    <div
      className={cn(
        "stat-card bg-gradient-to-br border",
        colorClasses[color]
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p
              className={cn(
                "text-sm mt-2 flex items-center gap-1",
                trend.isPositive ? "text-google-green" : "text-google-red"
              )}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              <span className="text-muted-foreground">vs last week</span>
            </p>
          )}
        </div>
        <div
          className={cn(
            "w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center",
            iconColorClasses[color]
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
