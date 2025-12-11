import { cn } from '@/lib/utils';
import { TaskStatus, getStatusColor } from '@/data/dummyData';

interface StatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border",
        getStatusColor(status),
        className
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full mr-1.5",
          status === 'Allocated' && "bg-status-allocated",
          status === 'Working' && "bg-status-working",
          status === 'Completed' && "bg-status-completed",
          status === 'Under Review' && "bg-status-review",
          status === 'Revision Required' && "bg-status-revision",
          status === 'Overdue' && "bg-status-overdue animate-pulse"
        )}
      />
      {status}
    </span>
  );
};
