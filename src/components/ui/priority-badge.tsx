import { cn } from '@/lib/utils';
import { Priority, getPriorityColor } from '@/data/dummyData';

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

export const PriorityBadge = ({ priority, className }: PriorityBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border",
        getPriorityColor(priority),
        className
      )}
    >
      {priority}
    </span>
  );
};
