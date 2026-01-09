import React, { useState } from 'react';
import { Upload, X, File, CheckCircle2, Loader2 } from 'lucide-react';
import { Task } from '@/data/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { StatusBadge } from '@/components/ui/status-badge';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface TaskSubmissionDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TaskSubmissionDialog = ({ task, open, onOpenChange }: TaskSubmissionDialogProps) => {
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  if (!task) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachedFiles((prev) => [...prev, ...files]);
    toast({
      title: "Files added",
      description: `${files.length} file(s) attached successfully.`,
    });
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitTask = async () => {
    if (!submissionNotes.trim() && attachedFiles.length === 0) {
      toast({
        title: "Submission required",
        description: "Please add submission notes or attach at least one document.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Task submitted!",
        description: "Your submission has been sent for review.",
      });
      setIsSubmitting(false);
      // Reset form
      setSubmissionNotes('');
      setAttachedFiles([]);
      onOpenChange(false);
    }, 1500);
  };

  const handleDoneTask = async () => {
    setIsCompleting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Task completed!",
        description: "Great work! The task has been marked as completed.",
      });
      setIsCompleting(false);
      onOpenChange(false);
    }, 1500);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{task.title}</DialogTitle>
          <DialogDescription className="text-base mt-2">
            {task.description}
          </DialogDescription>
        </DialogHeader>

        {/* Task Info Section */}
        <div className="space-y-4 py-4 border-b border-border">
          <div className="flex items-center gap-4 flex-wrap">
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />
            <span className="text-sm text-muted-foreground">
              Deadline: {task.deadline}
            </span>
            <span className="text-sm text-muted-foreground">
              Vertical: {task.vertical}
            </span>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{task.progress}%</span>
            </div>
            <Progress value={task.progress} className="h-2" />
          </div>
        </div>

        {/* Submission Section */}
        <div className="space-y-4 py-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Submit Task
            </h3>
            
            <div className="space-y-4">
              {/* Submission Notes */}
              <div className="space-y-2">
                <Label htmlFor="submission-notes">
                  Submission Notes <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <Textarea
                  id="submission-notes"
                  placeholder="Add any notes, comments, or updates about your work on this task..."
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  className="min-h-[120px] bg-secondary/50 resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Describe what you've completed, any challenges faced, or additional information for reviewers.
                </p>
              </div>

              {/* Attach Documents Section */}
              <div className="space-y-2">
                <Label>Attach Documents</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 bg-secondary/30">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Upload className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-center">
                      <Label
                        htmlFor="file-upload"
                        className="cursor-pointer text-primary hover:text-primary/80 font-medium"
                      >
                        Click to upload files
                      </Label>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.zip"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, DOC, DOCX, TXT, Images, ZIP (Max 10MB per file)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Attached Files List */}
                {attachedFiles.length > 0 && (
                  <div className="space-y-2 mt-4">
                    <p className="text-sm font-medium text-foreground">
                      Attached Files ({attachedFiles.length})
                    </p>
                    <div className="space-y-2">
                      {attachedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border border-border"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <File className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveFile(index)}
                            className="shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitTask}
            disabled={isSubmitting || isCompleting}
            className="flex-1 gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Submit Task
              </>
            )}
          </Button>
          <Button
            onClick={handleDoneTask}
            disabled={isSubmitting || isCompleting}
            className={cn(
              "flex-1 gap-2",
              "bg-google-green hover:bg-google-green/90 text-white"
            )}
          >
            {isCompleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Completing...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Done Task
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

