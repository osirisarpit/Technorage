import { Clock, Paperclip, User, MessageSquare, UserCircle } from 'lucide-react';
import { Task } from '@/data/dummyData';
import { StatusBadge } from '@/components/ui/status-badge';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onFeedback?: (task: Task) => void;
  onClick?: (task: Task) => void;
}

export const TaskCard = ({ task, onFeedback, onClick }: TaskCardProps) => {
  const isOverdue = task.status === 'Overdue';
  const needsReview = task.status === 'Under Review' || task.status === 'Completed';

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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

      {/* Assigned Person Section - Prominent */}
      <div className="mb-4 p-3 rounded-lg bg-secondary/50 border border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {task.assignedToName ? (
              <>
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarFallback className="bg-primary/20 text-primary text-xs">
                    {getInitials(task.assignedToName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">Assigned to</p>
                  <p className="text-sm font-medium text-foreground truncate">
                    {task.assignedToName}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <UserCircle className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">Assigned to</p>
                  <p className="text-sm font-medium text-muted-foreground">
                    Unassigned
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
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
