import { Activity } from '@/data/dummyData';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ActivityCardProps {
  activity: Activity;
}

export const ActivityCard = ({ activity }: ActivityCardProps) => {
  const getActivityColor = (type: Activity['type']) => {
    const colors = {
      submission: 'text-status-review',
      started: 'text-status-working',
      overdue: 'text-status-overdue',
      completed: 'text-status-completed',
      assigned: 'text-primary',
    };
    return colors[type];
  };

  const getActivityText = (type: Activity['type']) => {
    const texts = {
      submission: 'submitted',
      started: 'started working on',
      overdue: 'has overdue task',
      completed: 'completed',
      assigned: 'was assigned',
    };
    return texts[type];
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors animate-fade-in">
      <Avatar className="w-8 h-8 shrink-0">
        <AvatarImage src={activity.memberAvatar} alt={activity.memberName} />
        <AvatarFallback className="text-xs bg-primary/20 text-primary">
          {activity.memberName.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-medium text-foreground">{activity.memberName}</span>
          {' '}
          <span className={cn("font-medium", getActivityColor(activity.type))}>
            {getActivityText(activity.type)}
          </span>
          {' '}
          <span className="text-muted-foreground">{activity.taskTitle}</span>
        </p>
        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
          <span>{activity.vertical}</span>
          <span>•</span>
          <span>{activity.timestamp}</span>
        </div>
      </div>
    </div>
  );
};
