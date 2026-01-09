import { useState } from 'react';
import { Sparkles, Brain, Zap, Target, RefreshCw } from 'lucide-react';
import { Member } from '@/data/types';
import { SuggestionCard } from '@/components/cards/SuggestionCard';
import { AssignTaskDialog } from '@/components/dialogs/AssignTaskDialog';
import { Button } from '@/components/ui/button';

const SmartSuggestions = () => {
  const [assignMember, setAssignMember] = useState<Member | null>(null);
  const [assignOpen, setAssignOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Mock data for members
  const [members] = useState<Member[]>([
    {
      id: '1',
      name: 'Riya Sharma',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=riya',
      role: 'Senior Designer',
      vertical: 'Design',
      lastSeen: '5 mins ago',
      lastSeenDate: new Date(Date.now() - 5 * 60000),
      assignedTasks: 3,
      rating: 4.8,
      completedTasks: 24,
      email: 'riya@gdg.dev',
      joinDate: 'Aug 2024'
    },
    {
      id: '2',
      name: 'Ayush Patel',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ayush',
      role: 'PR Lead',
      vertical: 'PR',
      lastSeen: '1 hour ago',
      lastSeenDate: new Date(Date.now() - 60 * 60000),
      assignedTasks: 2,
      rating: 4.5,
      completedTasks: 18,
      email: 'ayush@gdg.dev',
      joinDate: 'Sep 2024'
    },
    {
      id: '3',
      name: 'Priya Verma',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
      role: 'Tech Developer',
      vertical: 'Tech',
      lastSeen: '30 mins ago',
      lastSeenDate: new Date(Date.now() - 30 * 60000),
      assignedTasks: 4,
      rating: 4.9,
      completedTasks: 31,
      email: 'priya@gdg.dev',
      joinDate: 'Jul 2024'
    },
    {
      id: '4',
      name: 'Karan Singh',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karan',
      role: 'Marketing Specialist',
      vertical: 'Marketing',
      lastSeen: 'Yesterday',
      lastSeenDate: new Date(Date.now() - 24 * 60 * 60000),
      assignedTasks: 1,
      rating: 4.2,
      completedTasks: 12,
      email: 'karan@gdg.dev',
      joinDate: 'Oct 2024'
    },
    {
      id: '5',
      name: 'Sneha Gupta',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha',
      role: 'Content Writer',
      vertical: 'Content',
      lastSeen: '2 hours ago',
      lastSeenDate: new Date(Date.now() - 2 * 60 * 60000),
      assignedTasks: 2,
      rating: 4.6,
      completedTasks: 20,
      email: 'sneha@gdg.dev',
      joinDate: 'Aug 2024'
    },
  ]);

  // Sort members by a scoring algorithm (simulated)
  const getSuggestedMembers = () => {
    return [...members]
      .sort((a, b) => {
        // Score based on: rating, low workload, recent activity
        const scoreA = a.rating * 2 - a.assignedTasks * 0.5;
        const scoreB = b.rating * 2 - b.assignedTasks * 0.5;
        return scoreB - scoreA;
      })
      .slice(0, 5);
  };

  const suggestedMembers = getSuggestedMembers();

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleAssign = (member: Member) => {
    setAssignMember(member);
    setAssignOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-google-yellow" />
            Smart Suggestions
          </h1>
          <p className="text-muted-foreground mt-1">
            AI-powered volunteer recommendations based on performance metrics
          </p>
        </div>

        <Button
          variant="outline"
          className="gap-2"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
          Refresh
        </Button>
      </div>

      {/* AI Indicator */}
      <div className="glass-card p-4 border-primary/30 neon-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">AI Analysis Complete</p>
            <p className="text-sm text-muted-foreground">
              Analyzed {members.length} members based on ratings, workload, and activity
            </p>
          </div>
        </div>
      </div>

      {/* Ranking Factors */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: Target, label: 'Past Ratings', desc: 'Historical performance' },
          { icon: Zap, label: 'Recent Activity', desc: 'Last seen & engagement' },
          { icon: Sparkles, label: 'Workload Balance', desc: 'Current task count' },
          { icon: RefreshCw, label: 'Completion Speed', desc: 'Task delivery time' },
        ].map((factor, index) => (
          <div
            key={factor.label}
            className="glass-card p-4 text-center animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <factor.icon className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="font-medium text-foreground text-sm">{factor.label}</p>
            <p className="text-xs text-muted-foreground">{factor.desc}</p>
          </div>
        ))}
      </div>

      {/* Top Suggestions */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="text-gradient">Top 5</span> Recommended Volunteers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {suggestedMembers.map((member, index) => (
            <SuggestionCard
              key={member.id}
              member={member}
              rank={index + 1}
              onAssign={handleAssign}
            />
          ))}
        </div>
      </div>

      {/* Prototype Notice */}
      <div className="glass-card p-4 bg-secondary/30 border-dashed">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-lg">🧪</span>
          </div>
          <div>
            <p className="font-medium text-foreground">Prototype Mode</p>
            <p className="text-sm text-muted-foreground">
              This is a UI simulation. In production, the AI will analyze real-time data to provide dynamic suggestions.
            </p>
          </div>
        </div>
      </div>

      <AssignTaskDialog
        member={assignMember}
        open={assignOpen}
        onOpenChange={setAssignOpen}
      />
    </div>
  );
};

export default SmartSuggestions;

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
