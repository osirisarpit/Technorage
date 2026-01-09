import { useState } from 'react';
import { Task } from '@/data/types';
import { StarRating } from '@/components/ui/star-rating';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface FeedbackDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FeedbackDialog = ({
  task,
  open,
  onOpenChange,
}: FeedbackDialogProps) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [action, setAction] = useState<'approve' | 'revision' | null>(null);

  if (!task) return null;

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please provide a rating before submitting feedback.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: action === 'approve' ? "Task Approved!" : "Revision Requested",
      description: `Feedback submitted for "${task.title}"`,
    });

    setRating(0);
    setFeedback('');
    setAction(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Review Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <h3 className="font-semibold text-foreground">{task.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Submitted by {task.assignedToName}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Rating
            </label>
            <StarRating
              rating={rating}
              size="lg"
              interactive
              onChange={setRating}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Feedback
            </label>
            <Textarea
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant={action === 'approve' ? 'default' : 'outline'}
              className={action === 'approve' ? 'flex-1 bg-google-green hover:bg-google-green/90' : 'flex-1'}
              onClick={() => setAction('approve')}
            >
              ✓ Approve
            </Button>
            <Button
              variant={action === 'revision' ? 'default' : 'outline'}
              className={action === 'revision' ? 'flex-1 bg-neon-orange hover:bg-neon-orange/90' : 'flex-1'}
              onClick={() => setAction('revision')}
            >
              ↻ Request Revision
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!action}>
            Submit Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
