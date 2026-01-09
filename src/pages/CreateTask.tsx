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
    <div className="max-w-3xl mx-auto animate-fade-in bg-white">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-[#4285F4]"></span>
            <span className="w-2 h-2 rounded-full bg-[#EA4335]"></span>
            <span className="w-2 h-2 rounded-full bg-[#FBBC04]"></span>
            <span className="w-2 h-2 rounded-full bg-[#34A853]"></span>
          </div>
          <span className="text-xs font-medium text-gray-500 tracking-wider uppercase">Create Task</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-[#202124]">
          Create New Task
        </h1>
        <p className="text-gray-600 mt-1">
          Assign tasks to your vertical members
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-gray-700 font-medium">Task Title *</Label>
          <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#4285F4] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
          </div>
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
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="pl-10 h-11 bg-gray-50 border-gray-200 focus:border-[#4285F4] focus:ring-2 focus:ring-[#4285F4]/20 rounded-xl transition-all text-gray-900 placeholder:text-gray-400"
          />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-gray-700 font-medium">Description</Label>
          <div className="relative group">
          <div className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-[#34A853] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-align-left"><line x1="21" x2="3" y1="6" y2="6"/><line x1="21" x2="3" y1="12" y2="12"/><line x1="21" x2="3" y1="18" y2="18"/></svg>
          </div>
          <Textarea
            id="description"
            placeholder="Describe the task in detail..."
            value={formData.Description}
            onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
            className="bg-secondary/50 min-h-[120px]"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="pl-10 bg-gray-50 border-gray-200 focus:border-[#34A853] focus:ring-2 focus:ring-[#34A853]/20 rounded-xl transition-all text-gray-900 placeholder:text-gray-400 min-h-[120px]"
          />
          </div>
        </div>

        {/* Vertical */}
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">Vertical *</Label>
          <Select
            value={formData.Vertical}
            onValueChange={(value) => setFormData({ ...formData, Vertical: value })}
          >
            <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-[#FBBC04] focus:ring-2 focus:ring-[#FBBC04]/20 rounded-xl transition-all text-gray-900 h-11">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/><line x1="15" x2="15" y1="21" y2="9"/></svg>
                </div>
                <SelectValue placeholder="Select vertical" />
              </div>
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
            <Label className="text-gray-700 font-medium">Priority</Label>
            <div className="relative">
            <Popover open={ratingPopoverOpen} onOpenChange={setRatingPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between bg-gray-50 border-gray-200 focus:border-[#EA4335] focus:ring-2 focus:ring-[#EA4335]/20 rounded-xl transition-all text-gray-900 h-11",
                    selectedRatings.length === 0 && "text-gray-400"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    </div>
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
                  </div>
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
            </div>
            {selectedRatings.length > 0 && (
              <p className="text-xs text-gray-500">
                {selectedRatings.length} priority{selectedRatings.length > 1 ? 's' : ''} selected
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="Deadline">Deadline *</Label>
            <Label htmlFor="deadline" className="text-gray-700 font-medium">Deadline *</Label>
            <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#4285F4] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            </div>
            <Input
              id="Deadline"
              type="date"
              value={formData.Deadline}
              onChange={(e) => setFormData({ ...formData, Deadline: e.target.value })}
              className="bg-secondary/50"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="pl-10 h-11 bg-gray-50 border-gray-200 focus:border-[#4285F4] focus:ring-2 focus:ring-[#4285F4]/20 rounded-xl transition-all text-gray-900 placeholder:text-gray-400"
            />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="estimatedTime" className="text-gray-700 font-medium">Estimated Time</Label>
            <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#34A853] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <Input
              id="estimatedTime"
              placeholder="e.g., 4 hours"
              value={formData.EstimatedTime}
              onChange={(e) => setFormData({ ...formData, EstimatedTime: e.target.value })}
              className="bg-secondary/50"
              value={formData.estimatedTime}
              onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
              className="pl-10 h-11 bg-gray-50 border-gray-200 focus:border-[#34A853] focus:ring-2 focus:ring-[#34A853]/20 rounded-xl transition-all text-gray-900 placeholder:text-gray-400"
            />
            </div>
          </div>
        </div>

        {/* Attachments */}
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">Attachments</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 text-sm border border-blue-200 text-blue-800"
              >
                <span>{file}</span>
                <button
                  type="button"
                  onClick={() => handleFileRemove(index)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            className="gap-2 border-gray-300 hover:bg-gray-50 text-gray-700"
            onClick={handleFileAdd}
          >
            <Upload className="w-4 h-4" />
            Add Attachment
          </Button>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            className="flex-1 border-gray-300 hover:bg-gray-50 text-gray-700"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1 bg-[#4285F4] hover:bg-[#3367D6] text-white">
            Create Task
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;