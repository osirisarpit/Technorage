import { useState } from 'react';
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
import { verticals, TaskStatus, Priority } from '@/data/dummyData';
import { useTasks } from '@/contexts/TasksContext';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const CreateTask = () => {
  const navigate = useNavigate();
  const { addTask } = useTasks();
  const [files, setFiles] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [ratingPopoverOpen, setRatingPopoverOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    vertical: '',
    deadline: '',
    estimatedTime: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.vertical || !formData.deadline) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Add the new task
    // deadline will be formatted in TasksContext
    addTask({
      title: formData.title,
      description: formData.description || '',
      vertical: formData.vertical as any,
      assignedTo: null, // Ensure it's unassigned
      status: 'Allocated' as TaskStatus,
      priority: 'Medium' as Priority, // Default priority
      deadline: formData.deadline, // Pass the date string (YYYY-MM-DD format)
      estimatedTime: formData.estimatedTime || '',
      rating: selectedRatings.length > 0 ? selectedRatings[0] : undefined, // Use first selected rating or undefined
    });

    toast({
      title: "Task Created!",
      description: `"${formData.title}" has been created successfully and appears as unassigned.`,
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

        {/* Vertical */}
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

        {/* Rating, Deadline & Estimated Time Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Rating</Label>
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
                    <span>Select ratings (1-5 stars)</span>
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
                        setSelectedRatings((prev) =>
                          prev.includes(rating)
                            ? prev.filter((r) => r !== rating)
                            : [...prev, rating]
                        );
                      }}
                    >
                      <Checkbox
                        checked={selectedRatings.includes(rating)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRatings((prev) => [...prev, rating]);
                          } else {
                            setSelectedRatings((prev) => prev.filter((r) => r !== rating));
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
                {selectedRatings.length} rating{selectedRatings.length > 1 ? 's' : ''} selected
              </p>
            )}
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
