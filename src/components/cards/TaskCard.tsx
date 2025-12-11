import { Clock, Paperclip, User, MessageSquare } from 'lucide-react';
import { Task } from '@/data/dummyData';
import { StatusBadge } from '@/components/ui/status-badge';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onFeedback?: (task: Task) => void;
  onClick?: (task: Task) => void;
}

export const TaskCard = ({ task, onFeedback, onClick }: TaskCardProps) => {
  const isOverdue = task.status === 'Overdue';
  const needsReview = task.status === 'Under Review' || task.status === 'Completed';

  return (
    <div
      className={cn(
        "task-card animate-fade-in cursor-pointer",
        isOverdue && "border-status-overdue/50"
      )}
      onClick={() => onClick?.(task)}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate mb-1">
            {task.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        </div>
        <StatusBadge status={task.status} />
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
          <span>Progress</span>
          <span>{task.progress}%</span>
        </div>
        <Progress value={task.progress} className="h-2" />
      </div>

      {/* Meta Info */}
      <div className="flex items-center flex-wrap gap-3 text-xs text-muted-foreground mb-3">
        <PriorityBadge priority={task.priority} />
        
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{task.deadline}</span>
        </div>

        {task.assignedToName && (
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{task.assignedToName}</span>
          </div>
        )}

        {task.attachments > 0 && (
          <div className="flex items-center gap-1">
            <Paperclip className="w-3 h-3" />
            <span>{task.attachments}</span>
          </div>
        )}

        <span className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground">
          {task.vertical}
        </span>
      </div>

      {/* Actions */}
      {needsReview && (
        <Button
          size="sm"
          variant="outline"
          className="w-full mt-2 gap-2 hover:bg-primary hover:text-primary-foreground"
          onClick={(e) => {
            e.stopPropagation();
            onFeedback?.(task);
          }}
        >
          <MessageSquare className="w-4 h-4" />
          Give Feedback
        </Button>
      )}
    </div>
  );
};
