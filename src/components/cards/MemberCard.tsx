import { Clock, ClipboardList } from 'lucide-react';
import { Member } from '@/data/types';
import { StarRating } from '@/components/ui/star-rating';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface MemberCardProps {
  member: Member;
  onAssignTask?: (member: Member) => void;
  onClick?: (member: Member) => void;
}

export const MemberCard = ({ member, onAssignTask, onClick }: MemberCardProps) => {
  return (
    <div
      className="member-card animate-scale-in"
      onClick={() => onClick?.(member)}
    >
      <div className="flex items-start gap-4">
        <Avatar className="w-12 h-12 ring-2 ring-primary/20">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback className="bg-primary/20 text-primary">
            {member.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{member.name}</h3>
          <p className="text-sm text-muted-foreground truncate">{member.role}</p>

          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{member.lastSeen}</span>
            </div>
            <div className="flex items-center gap-1">
              <ClipboardList className="w-3 h-3" />
              <span>{member.assignedTasks} tasks</span>
            </div>
          </div>

          <div className="mt-2">
            <StarRating rating={member.rating} size="sm" />
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          className="shrink-0 hover:bg-primary hover:text-primary-foreground hover:border-primary"
          onClick={(e) => {
            e.stopPropagation();
            onAssignTask?.(member);
          }}
        >
          Assign
        </Button>
      </div>
    </div>
  );
};
