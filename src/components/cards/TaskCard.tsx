import { Clock, Paperclip, User, MessageSquare, UserCircle } from 'lucide-react';
import { Task } from '@/data/types';
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
        "task-card animate-fade-in cursor-pointer bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-5",
        isOverdue && "border-red-300 shadow-red-100"
      )}
      onClick={() => onClick?.(task)}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 text-base truncate mb-1.5 leading-tight">
            {task.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        </div>
        <StatusBadge status={task.status} />
      </div>

      {/* Assigned Person Section - Google Material Style */}
      <div className="mb-4 p-3 rounded-lg bg-gray-50 border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            {task.assignedToName ? (
              <>
                <Avatar className="w-9 h-9 shrink-0 ring-2 ring-white">
                  <AvatarFallback className="bg-[#4285F4] text-white text-xs font-medium">
                    {getInitials(task.assignedToName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 mb-0.5 font-normal">Assigned to</p>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {task.assignedToName}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center shrink-0 ring-2 ring-white">
                  <UserCircle className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 mb-0.5 font-normal">Assigned to</p>
                  <p className="text-sm font-medium text-gray-400">
                    Unassigned
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar - Google Material Style */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
          <span className="font-medium">Progress</span>
          <span className="font-medium">{task.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-[#4285F4] rounded-full transition-all duration-300"
            style={{ width: `${task.progress}%` }}
          />
        </div>
      </div>

      {/* Meta Info - Google Material Style */}
      <div className="flex items-center flex-wrap gap-2.5 text-xs text-gray-600 mb-4">
        <PriorityBadge priority={task.priority} />
        
        <div className="flex items-center gap-1.5 text-gray-600">
          <Clock className="w-3.5 h-3.5" />
          <span>{task.deadline}</span>
        </div>

        {task.attachments > 0 && (
          <div className="flex items-center gap-1.5 text-gray-600">
            <Paperclip className="w-3.5 h-3.5" />
            <span>{task.attachments}</span>
          </div>
        )}

        <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 font-medium border border-gray-200">
          {task.vertical}
        </span>
      </div>

      {/* Actions - Google Material Style */}
      {needsReview && (
        <Button
          size="sm"
          variant="outline"
          className="w-full mt-2 gap-2 border-gray-300 text-gray-700 hover:bg-[#4285F4] hover:text-white hover:border-[#4285F4] transition-colors duration-200 font-medium"
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
