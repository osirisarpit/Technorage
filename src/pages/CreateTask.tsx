import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { verticals, members } from '@/data/dummyData';
import { toast } from '@/hooks/use-toast';

const CreateTask = () => {
  const navigate = useNavigate();
  const [isOpenTask, setIsOpenTask] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    vertical: '',
    assignee: '',
    priority: '',
    deadline: '',
    estimatedTime: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.vertical || !formData.priority || !formData.deadline) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Task Created!",
      description: `"${formData.title}" has been created successfully.`,
    });

    navigate('/tasks');
  };

  const handleFileAdd = () => {
    const fileName = `document_${files.length + 1}.pdf`;
    setFiles([...files, fileName]);
  };

  const handleFileRemove = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Create New Task
        </h1>
        <p className="text-muted-foreground mt-1">
          Assign tasks to your vertical members
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Task Title *</Label>
          <Input
            id="title"
            placeholder="Enter task title..."
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="bg-secondary/50"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the task in detail..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-secondary/50 min-h-[120px]"
          />
        </div>

        {/* Vertical & Assignment Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Assign To *</Label>
            <Select
              value={formData.vertical}
              onValueChange={(value) => setFormData({ ...formData, vertical: value })}
            >
              <SelectTrigger className="bg-secondary/50">
                <SelectValue placeholder="Select vertical" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Overall Club">Overall Club</SelectItem>
                {verticals.map((vertical) => (
                  <SelectItem key={vertical} value={vertical}>
                    {vertical}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Assignee</Label>
              <div className="flex items-center gap-2">
                <Switch
                  checked={isOpenTask}
                  onCheckedChange={setIsOpenTask}
                  id="open-task"
                />
                <Label htmlFor="open-task" className="text-sm text-muted-foreground cursor-pointer">
                  Open Task
                </Label>
              </div>
            </div>
            <Select
              value={formData.assignee}
              onValueChange={(value) => setFormData({ ...formData, assignee: value })}
              disabled={isOpenTask}
            >
              <SelectTrigger className="bg-secondary/50">
                <SelectValue placeholder={isOpenTask ? "Anyone can pick" : "Select member"} />
              </SelectTrigger>
              <SelectContent>
                {members.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    <div className="flex items-center gap-2">
                      <span>{member.name}</span>
                      <span className="text-xs text-muted-foreground">({member.vertical})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Priority & Deadline Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Priority *</Label>
            <Select
              value={formData.priority}
              onValueChange={(value) => setFormData({ ...formData, priority: value })}
            >
              <SelectTrigger className="bg-secondary/50">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-google-green" />
                    Low
                  </span>
                </SelectItem>
                <SelectItem value="Medium">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-google-yellow" />
                    Medium
                  </span>
                </SelectItem>
                <SelectItem value="High">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-google-red" />
                    High
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline *</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="bg-secondary/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="estimatedTime">Estimated Time</Label>
            <Input
              id="estimatedTime"
              placeholder="e.g., 4 hours"
              value={formData.estimatedTime}
              onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
              className="bg-secondary/50"
            />
          </div>
        </div>

        {/* Attachments */}
        <div className="space-y-2">
          <Label>Attachments</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-sm"
              >
                <span>{file}</span>
                <button
                  type="button"
                  onClick={() => handleFileRemove(index)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={handleFileAdd}
          >
            <Upload className="w-4 h-4" />
            Add Attachment
          </Button>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Create Task
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
