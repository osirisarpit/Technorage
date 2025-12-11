import { Member } from '@/data/dummyData';
import { StarRating } from '@/components/ui/star-rating';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Clock, Mail, Calendar, ClipboardList, CheckCircle2 } from 'lucide-react';

interface MemberProfileDialogProps {
  member: Member | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssignTask?: (member: Member) => void;
}

export const MemberProfileDialog = ({
  member,
  open,
  onOpenChange,
  onAssignTask,
}: MemberProfileDialogProps) => {
  if (!member) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">Member Profile</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center text-center pb-4">
          <Avatar className="w-20 h-20 ring-4 ring-primary/20 mb-4">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback className="bg-primary/20 text-primary text-2xl">
              {member.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          <h2 className="text-xl font-bold text-foreground">{member.name}</h2>
          <p className="text-muted-foreground">{member.role}</p>
          <span className="mt-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
            {member.vertical}
          </span>

          <div className="mt-4">
            <StarRating rating={member.rating} size="lg" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{member.completedTasks}</p>
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Completed
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{member.assignedTasks}</p>
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <ClipboardList className="w-4 h-4" />
              Active Tasks
            </p>
          </div>
        </div>

        <div className="space-y-3 py-4">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">{member.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">Joined {member.joinDate}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">Last seen {member.lastSeen}</span>
          </div>
        </div>

        <Button
          className="w-full mt-2"
          onClick={() => {
            onAssignTask?.(member);
            onOpenChange(false);
          }}
        >
          Assign Task to {member.name.split(' ')[0]}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
