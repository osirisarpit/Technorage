import { useState } from 'react';
import { Member, tasks } from '@/data/dummyData';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface AssignTaskDialogProps {
  member: Member | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AssignTaskDialog = ({
  member,
  open,
  onOpenChange,
}: AssignTaskDialogProps) => {
  const [selectedTask, setSelectedTask] = useState('');

  if (!member) return null;

  const unassignedTasks = tasks.filter(task => !task.assignedTo || task.status === 'Allocated');

  const handleAssign = () => {
    if (!selectedTask) {
      toast({
        title: "Select a task",
        description: "Please select a task to assign.",
        variant: "destructive",
      });
      return;
    }

    const task = tasks.find(t => t.id === selectedTask);
    toast({
      title: "Task Assigned!",
      description: `"${task?.title}" assigned to ${member.name}`,
    });

    setSelectedTask('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Task</DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <Avatar className="w-10 h-10">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-foreground">{member.name}</p>
              <p className="text-sm text-muted-foreground">
                {member.assignedTasks} active tasks
              </p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Select Task
            </label>
            <Select value={selectedTask} onValueChange={setSelectedTask}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a task to assign" />
              </SelectTrigger>
              <SelectContent>
                {unassignedTasks.length > 0 ? (
                  unassignedTasks.map(task => (
                    <SelectItem key={task.id} value={task.id}>
                      <div className="flex flex-col">
                        <span>{task.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {task.vertical} • {task.priority} Priority
                        </span>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>
                    No unassigned tasks available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAssign}>
            Assign Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
