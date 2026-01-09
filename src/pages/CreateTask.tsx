import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Star, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { verticals, TaskStatus, Priority } from '@/data/types';
import { useTasks } from '@/contexts/TasksContext';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { createTaskInSheet } from "@/services/googleSheet";

const CreateTask = () => {
  const navigate = useNavigate();
  const { addTask } = useTasks();
  const [files, setFiles] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [ratingPopoverOpen, setRatingPopoverOpen] = useState(false);
  const [formData, setFormData] = useState({
    TaskTitle: '',
    Description: '',
    Vertical: '',
    Deadline: '',
    EstimatedTime: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.TaskTitle || !formData.Vertical || !formData.Deadline) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      // ✅ SEND TO GOOGLE SHEET
      await createTaskInSheet({
        TaskTitle : formData.TaskTitle,
        Description: formData.Description,
        Vertical: formData.Vertical,
        Priority: selectedRatings[0],
        Deadline: formData.Deadline,
        EstimatedTime: formData.EstimatedTime,
        Status: "Allocated",
      });     

      // (Optional) update local context
      addTask({
        title: formData.TaskTitle,
        description: formData.Description,
        vertical: formData.Vertical as any,
        assignedTo: null,
        status: "Allocated" as TaskStatus,
        priority: "Medium" as Priority,
        deadline: formData.Deadline,
        estimatedTime: formData.EstimatedTime,
        rating: selectedRatings[0],
      });

      toast({
        title: "Task Created!",
        description: `"${formData.TaskTitle}" has been saved to Google Sheet.`,
      });

      navigate("/tasks");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save task. Please try again.",
        variant: "destructive",
      });
    }
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
            value={formData.TaskTitle}
            onChange={(e) => setFormData({ ...formData, TaskTitle : e.target.value })}
            className="bg-secondary/50"
          />
          <p className="text-xs text-muted-foreground">
            Select the vertical this task belongs to
          </p>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the task in detail..."
            value={formData.Description}
            onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
            className="bg-secondary/50 min-h-[120px]"
          />
        </div>

        {/* Vertical */}
        <div className="space-y-2">
          <Label>Vertical *</Label>
          <Select
            value={formData.Vertical}
            onValueChange={(value) => setFormData({ ...formData, Vertical: value })}
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

        {/* Priority, Deadline & Estimated Time Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Priority</Label>
            <Popover open={ratingPopoverOpen} onOpenChange={setRatingPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between bg-secondary/50",
                    selectedRatings.length === 0 && "text-muted-foreground"
                  )}
                >
                  {selectedRatings.length > 0 ? (
                    <div className="flex items-center gap-2 flex-wrap">
                      {selectedRatings.sort().map((rating) => (
                        <div key={rating} className="flex items-center gap-1">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "w-3 h-3",
                                  i < rating
                                    ? "fill-google-yellow text-google-yellow"
                                    : "fill-gray-200 text-gray-200"
                                )}
                              />
                            ))}
                          </div>
                          <span className="text-xs">{rating}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span>Select priority (1-5 stars)</span>
                  )}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0">
                <div className="p-2 space-y-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <div
                      key={rating}
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary/50 cursor-pointer"
                      onClick={() => {
                        setSelectedRatings([rating]);
                      }}
                    >
                      <Checkbox
                        checked={selectedRatings.includes(rating)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRatings([rating]);
                          } else {
                            setSelectedRatings([]); // Allow deselecting
                          }
                        }}
                      />
                      <div className="flex items-center gap-2 flex-1">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-4 h-4",
                                i < rating
                                  ? "fill-google-yellow text-google-yellow"
                                  : "fill-gray-200 text-gray-200"
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-sm">
                          {rating} {rating === 1 ? 'star' : 'stars'}
                        </span>
                      </div>
                    </div>
                  ))}
                  {selectedRatings.length > 0 && (
                    <div className="pt-2 border-t border-border">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs"
                        onClick={() => {
                          setSelectedRatings([]);
                        }}
                      >
                        Clear all
                      </Button>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            {selectedRatings.length > 0 && (
              <p className="text-xs text-muted-foreground">
                {selectedRatings.length} priority{selectedRatings.length > 1 ? 's' : ''} selected
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="Deadline">Deadline *</Label>
            <Input
              id="Deadline"
              type="date"
              value={formData.Deadline}
              onChange={(e) => setFormData({ ...formData, Deadline: e.target.value })}
              className="bg-secondary/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="estimatedTime">Estimated Time</Label>
            <Input
              id="estimatedTime"
              placeholder="e.g., 4 hours"
              value={formData.EstimatedTime}
              onChange={(e) => setFormData({ ...formData, EstimatedTime: e.target.value })}
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
