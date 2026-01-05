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
          status === 'Allocated' && "bg-gray-500",
          status === 'Working' && "bg-[#4285F4]",
          status === 'Completed' && "bg-[#34A853]",
          status === 'Under Review' && "bg-[#9C27B0]",
          status === 'Revision Required' && "bg-[#FF9800]",
          status === 'Overdue' && "bg-[#EA4335] animate-pulse"
        )}
      />
      {status}
    </span>
  );
};
