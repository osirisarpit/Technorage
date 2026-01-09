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
import { useAuth } from '@/contexts/AuthContext';

import { TaskSubmissionDialog } from '@/components/dialogs/TaskSubmissionDialog';

const statuses: TaskStatus[] = [
  'Allocated', 'Working', 'Completed', 'Under Review', 'Revision Required', 'Overdue',
];

const Tasks = () => {
  const { tasks } = useTasks();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [verticalFilter, setVerticalFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'all' | 'unassigned' | 'assigned'>('all');

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
    <div className="min-h-screen bg-gray-50 font-sans text-[#202124] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-1 bg-[#4285F4] rounded-full" />
              <h1 className="text-3xl md:text-4xl font-bold text-[#202124]">
                Task Board
              </h1>
            </div>
            <p className="text-gray-600 max-w-lg">
              Manage your development workflow efficiently. Track assignments, deadlines, and project verticals in one place.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/50 p-1 rounded-lg border border-gray-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={`${viewMode === 'grid' ? 'bg-secondary text-foreground' : 'text-gray-600 hover:text-foreground'} transition-all`}
            >
              <Grid className="w-4 h-4 mr-2" /> Grid
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('list')}
              className={`${viewMode === 'list' ? 'bg-secondary text-foreground' : 'text-gray-600 hover:text-foreground'} transition-all`}
            >
              <List className="w-4 h-4 mr-2" /> List
            </Button>
          </div>
        </div>

        {/* Controls Container */}
        <div className="space-y-6">
          {/* Custom Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="w-full">
            <TabsList className="bg-secondary/50 p-1 w-full max-w-md h-auto rounded-xl">
              {['all', 'unassigned', 'assigned'].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="data-[state=active]:bg-white data-[state=active]:text-[#4285F4] data-[state=active]:shadow-sm text-gray-600 flex-1 py-2 rounded-lg transition-all capitalize"
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
          <div className="flex flex-col lg:flex-row gap-4 p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#4285F4] transition-colors" />
              <Input
                placeholder="Search tasks by title or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-secondary/50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus-visible:ring-[#4285F4]/50 focus-visible:border-[#4285F4]"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {[  
                { value: verticalFilter, setter: setVerticalFilter, placeholder: "Vertical", items: ['Overall Club', ...verticals] },
                { value: statusFilter, setter: setStatusFilter, placeholder: "Status", items: statuses },
                { value: priorityFilter, setter: setPriorityFilter, placeholder: "Priority", items: ['Low', 'Medium', 'High'] }
              ].map((filter, i) => (
                <Select key={i} value={filter.value} onValueChange={filter.setter}>
                  <SelectTrigger className="w-[160px] bg-secondary/50 border-gray-200 text-gray-900 hover:bg-secondary transition-colors">
                    <SelectValue placeholder={filter.placeholder} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 text-gray-900">
                    <SelectItem value="all">All {filter.placeholder}s</SelectItem>
                    {filter.items.map((item) => (
                      <SelectItem key={item} value={item} className="focus:bg-secondary focus:text-foreground cursor-pointer">
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
        <div className="flex items-center gap-2 text-sm text-gray-600 px-1">
          <div className="w-2 h-2 rounded-full bg-[#4285F4]" />
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
                  {user?.role === 'member' ? (
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-base truncate mb-1.5 leading-tight">
                            {task.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                            {task.description}
                          </p>
                        </div>
                        <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${task.status === 'Completed' ? 'bg-green-100 text-green-800' : task.status === 'Working' ? 'bg-blue-100 text-blue-800' : task.status === 'Allocated' ? 'bg-yellow-100 text-yellow-800' : task.status === 'Overdue' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                          {task.status}
                        </div>
                      </div>

                      {/* Assigned Person Section - Google Material Style */}
                      <div className="mb-4 p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            {task.assignedToName ? (
                              <>
                                <div className="w-9 h-9 rounded-full bg-[#4285F4] flex items-center justify-center text-white text-xs font-medium shrink-0 ring-2 ring-white">
                                  {task.assignedToName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-gray-500 mb-0.5 font-normal">Assigned to</p>
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {task.assignedToName}
                                  </p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center shrink-0 ring-2 ring-white">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-circle w-5 h-5 text-gray-400"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-gray-500 mb-0.5 font-normal">Assigned to</p>
                                  <p className="text-sm font-medium text-gray-400">
                                    Unassigned
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar - Google Material Style */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                          <span className="font-medium">Progress</span>
                          <span className="font-medium">{task.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full bg-[#4285F4] rounded-full transition-all duration-300"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Meta Info - Google Material Style */}
                      <div className="flex items-center flex-wrap gap-2.5 text-xs text-gray-600 mb-4">
                        <div className={`px-2 py-1 rounded-md text-xs font-medium ${task.priority === 'High' ? 'bg-red-100 text-red-800' : task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          {task.priority}
                        </div>
                        
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock w-3.5 h-3.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          <span>{task.deadline}</span>
                        </div>

                        {task.attachments > 0 && (
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-paperclip w-3.5 h-3.5"><path d="4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M7 15H4.5a2.5 2.5 0 0 0 0 5H7"/><path d="10 10l7-7m0 0v5m0-5h-5"/></svg>
                            <span>{task.attachments}</span>
                          </div>
                        )}

                        <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 font-medium border border-gray-200">
                          {task.vertical}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <TaskCard
                      task={task}
                      onClick={(t) => {
                        setSelectedTask(t);
                        setSubmissionOpen(true);
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border-2 border-dashed border-gray-200 rounded-2xl bg-white">
              <div className="p-4 rounded-full bg-gray-100">
                 <Filter className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">No tasks found</h3>
                <p className="text-gray-600 max-w-sm mx-auto mt-2">
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
                className="mt-4 border-gray-200 hover:bg-gray-50 hover:text-gray-900"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>



        {user?.role === 'lead' && (
        <TaskSubmissionDialog
          task={selectedTask}
          open={submissionOpen}
          onOpenChange={setSubmissionOpen}
        />
        )}
      </div>
    </div>
  );
};

export default Tasks;