import { useState } from 'react';
import { Search, Filter, Grid, List, Users, UserCircle, LayoutGrid } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { verticals, Task, TaskStatus } from '@/data/types';
import { useTasks } from '@/contexts/TasksContext';
import { TaskCard } from '@/components/cards/TaskCard';
import { FeedbackDialog } from '@/components/dialogs/FeedbackDialog';
import { TaskSubmissionDialog } from '@/components/dialogs/TaskSubmissionDialog';

const statuses: TaskStatus[] = [
  'Allocated', 'Working', 'Completed', 'Under Review', 'Revision Required', 'Overdue',
];

// --- Background Component ---
const GeometricBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0F0F0F]">
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80 z-10" />
    
    {/* Floating Shapes */}
    <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-20 right-20 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
    
    {/* Animated Squares and Circles */}
    <div className="absolute top-1/4 left-1/4 w-12 h-12 border border-white/10 rounded-lg animate-[spin_10s_linear_infinite]" />
    <div className="absolute top-1/3 right-1/4 w-8 h-8 border border-white/5 rounded-full animate-bounce delay-700" />
    <div className="absolute bottom-1/3 left-1/3 w-16 h-16 border border-white/5 rotate-45 animate-pulse" />
    
    {/* Grid Pattern Overlay */}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
  </div>
);

const Tasks = () => {
  const { tasks } = useTasks();
  const [search, setSearch] = useState('');
  const [verticalFilter, setVerticalFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'all' | 'unassigned' | 'assigned'>('all');
  const [feedbackTask, setFeedbackTask] = useState<Task | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [submissionOpen, setSubmissionOpen] = useState(false);

  // Logic remains same...
  const unassignedTasks = tasks.filter(task => task.assignedTo === null);
  const assignedTasks = tasks.filter(task => task.assignedTo !== null);

  const filterTasks = (taskList: Task[]) => {
    return taskList.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());
      const matchesVertical = verticalFilter === 'all' || task.vertical === verticalFilter;
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      return matchesSearch && matchesVertical && matchesStatus && matchesPriority;
    });
  };

  const getFilteredTasks = () => {
    let taskList: Task[] = [];
    if (activeTab === 'unassigned') taskList = unassignedTasks;
    else if (activeTab === 'assigned') taskList = assignedTasks;
    else taskList = tasks;
    return filterTasks(taskList);
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-blue-500/30">
      <GeometricBackground />

      <div className="relative z-10 container mx-auto px-4 py-8 space-y-8 animate-fade-in">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-1 bg-blue-500 rounded-full" />
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Task Board
              </h1>
            </div>
            <p className="text-gray-400 max-w-lg">
              Manage your development workflow efficiently. Track assignments, deadlines, and project verticals in one place.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10 backdrop-blur-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={`${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'} transition-all`}
            >
              <Grid className="w-4 h-4 mr-2" /> Grid
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('list')}
              className={`${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'} transition-all`}
            >
              <List className="w-4 h-4 mr-2" /> List
            </Button>
          </div>
        </div>

        {/* Controls Container */}
        <div className="space-y-6">
          {/* Custom Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="w-full">
            <TabsList className="bg-white/5 border border-white/10 p-1 w-full max-w-md h-auto rounded-xl">
              {['all', 'unassigned', 'assigned'].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-400 flex-1 py-2 rounded-lg transition-all capitalize"
                >
                  {tab === 'all' && <LayoutGrid className="w-4 h-4 mr-2" />}
                  {tab === 'unassigned' && <UserCircle className="w-4 h-4 mr-2" />}
                  {tab === 'assigned' && <Users className="w-4 h-4 mr-2" />}
                  {tab === 'all' ? 'All Tasks' : tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Filters Bar */}
          <div className="flex flex-col lg:flex-row gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <Input
                placeholder="Search tasks by title or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-blue-500/50 focus-visible:border-blue-500"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                { value: verticalFilter, setter: setVerticalFilter, placeholder: "Vertical", items: ['Overall Club', ...verticals] },
                { value: statusFilter, setter: setStatusFilter, placeholder: "Status", items: statuses },
                { value: priorityFilter, setter: setPriorityFilter, placeholder: "Priority", items: ['Low', 'Medium', 'High'] }
              ].map((filter, i) => (
                <Select key={i} value={filter.value} onValueChange={filter.setter}>
                  <SelectTrigger className="w-[160px] bg-black/20 border-white/10 text-gray-200 hover:bg-white/10 transition-colors">
                    <SelectValue placeholder={filter.placeholder} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-white/10 text-gray-200">
                    <SelectItem value="all">All {filter.placeholder}s</SelectItem>
                    {filter.items.map((item) => (
                      <SelectItem key={item} value={item} className="focus:bg-white/10 focus:text-white cursor-pointer">
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center gap-2 text-sm text-gray-400 px-1">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          {filteredTasks.length} Result{filteredTasks.length !== 1 && 's'} Found
        </div>

        {/* Tasks Grid */}
        <div className="min-h-[400px]">
          {filteredTasks.length > 0 ? (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredTasks.map((task, index) => (
                <div
                  key={task.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                >
                  {/* Note: Ensure TaskCard handles dark mode (uses transparent/dark bg and white text) */}
                  <TaskCard
                    task={task}
                    onFeedback={(t) => {
                      setFeedbackTask(t);
                      setFeedbackOpen(true);
                    }}
                    onClick={(t) => {
                      setSelectedTask(t);
                      setSubmissionOpen(true);
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border-2 border-dashed border-white/5 rounded-2xl bg-white/5">
              <div className="p-4 rounded-full bg-white/5">
                 <Filter className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">No tasks found</h3>
                <p className="text-gray-400 max-w-sm mx-auto mt-2">
                  We couldn't find any tasks matching your current filters. Try adjusting your search criteria.
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearch('');
                  setVerticalFilter('all');
                  setStatusFilter('all');
                  setPriorityFilter('all');
                }}
                className="mt-4 border-white/10 hover:bg-white/10 hover:text-white"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        <FeedbackDialog
          task={feedbackTask}
          open={feedbackOpen}
          onOpenChange={setFeedbackOpen}
        />

        <TaskSubmissionDialog
          task={selectedTask}
          open={submissionOpen}
          onOpenChange={setSubmissionOpen}
        />
      </div>
    </div>
  );
};

export default Tasks;