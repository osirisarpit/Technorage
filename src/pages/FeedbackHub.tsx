import { useState } from 'react';
import { MessageSquare, CheckCircle2, RotateCcw, Star } from 'lucide-react';
import { Task } from '@/data/types';
import { useTasks } from '@/contexts/TasksContext';
import { StatusBadge } from '@/components/ui/status-badge';
import { StarRating } from '@/components/ui/star-rating';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FeedbackDialog } from '@/components/dialogs/FeedbackDialog';
import { cn } from '@/lib/utils';

const FeedbackHub = () => {
  const [feedbackTask, setFeedbackTask] = useState<Task | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const { tasks } = useTasks();
  
  // Tasks that need review
  const reviewTasks = tasks.filter(
    (t) => t.status === 'Under Review' || t.status === 'Completed'
  );

  // Tasks with feedback
  const feedbackTasks = tasks.filter((t) => t.feedback);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Feedback Hub
        </h1>
        <p className="text-muted-foreground mt-1">
          Review submissions and provide feedback to your team
        </p>
      </div>

      {/* Pending Reviews */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Pending Reviews</h2>
          <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-sm">
            {reviewTasks.length}
          </span>
        </div>

        {reviewTasks.length > 0 ? (
          <div className="space-y-4">
            {reviewTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignedToName}`}
                    />
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {task.assignedToName?.split(' ').map((n) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-foreground">{task.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <span>{task.assignedToName}</span>
                      <span>•</span>
                      <span>{task.vertical}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <StatusBadge status={task.status} />
                  <Button
                    size="sm"
                    onClick={() => {
                      setFeedbackTask(task);
                      setFeedbackOpen(true);
                    }}
                  >
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No pending reviews at the moment.
          </div>
        )}
      </div>

      {/* Given Feedback */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <Star className="w-5 h-5 text-google-yellow" />
          <h2 className="text-lg font-semibold text-foreground">Given Feedback</h2>
        </div>

        {feedbackTasks.length > 0 ? (
          <div className="space-y-4">
            {feedbackTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-lg bg-secondary/30 border border-border"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-foreground">{task.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <span>{task.assignedToName}</span>
                      <span>•</span>
                      <span>{task.vertical}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {task.rating && <StarRating rating={task.rating} size="sm" />}
                    <span
                      className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium",
                        task.status === 'Completed'
                          ? "bg-google-green/20 text-google-green"
                          : "bg-neon-orange/20 text-neon-orange"
                      )}
                    >
                      {task.status === 'Completed' ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          Approved
                        </>
                      ) : (
                        <>
                          <RotateCcw className="w-3 h-3" />
                          Revision
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-background/50 text-sm text-muted-foreground">
                  "{task.feedback}"
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No feedback given yet.
          </div>
        )}
      </div>

      <FeedbackDialog
        task={feedbackTask}
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
      />
    </div>
  );
};

export default FeedbackHub;
