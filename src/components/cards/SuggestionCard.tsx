import { Clock, TrendingUp, Zap } from 'lucide-react';
import { Member } from '@/data/types';
import { StarRating } from '@/components/ui/star-rating';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface SuggestionCardProps {
  member: Member;
  rank: number;
  onAssign?: (member: Member) => void;
}

export const SuggestionCard = ({ member, rank, onAssign }: SuggestionCardProps) => {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-google-yellow/30 to-google-yellow/10 border-google-yellow/50';
    if (rank === 2) return 'from-muted/50 to-muted/20 border-muted-foreground/30';
    if (rank === 3) return 'from-neon-orange/20 to-neon-orange/5 border-neon-orange/30';
    return 'from-secondary/50 to-secondary/20 border-border';
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div
      className={cn(
        "glass-card bg-gradient-to-br p-4 border transition-all duration-300 hover:scale-[1.02] animate-scale-in",
        getRankColor(rank)
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="text-2xl">{getRankBadge(rank)}</div>
        <Avatar className="w-10 h-10 ring-2 ring-primary/20">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback className="bg-primary/20 text-primary text-sm">
            {member.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">{member.name}</h4>
          <p className="text-xs text-muted-foreground truncate">{member.role}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Rating
          </span>
          <StarRating rating={member.rating} size="sm" />
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground flex items-center gap-1">
            <Zap className="w-3 h-3" />
            Workload
          </span>
          <span className={cn(
            "font-medium",
            member.assignedTasks <= 2 ? "text-google-green" : 
            member.assignedTasks <= 4 ? "text-google-yellow" : "text-google-red"
          )}>
            {member.assignedTasks} tasks
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Last Active
          </span>
          <span className="text-foreground">{member.lastSeen}</span>
        </div>
      </div>

      <Button
        size="sm"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={() => onAssign?.(member)}
      >
        Assign Task
      </Button>
    </div>
  );
};
