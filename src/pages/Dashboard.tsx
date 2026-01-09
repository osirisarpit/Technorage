import { useState } from 'react';
import { ClipboardList, Globe, LayoutGrid, Sparkles } from 'lucide-react';
import { Task } from '@/data/types';
import { useTasks } from '@/contexts/TasksContext';
import { TaskCard } from '@/components/cards/TaskCard';
import { useAuth } from '@/contexts/AuthContext';

// Define the verticals to show
const dashboardVerticals = ['Operations', 'Marketing', 'Social Media', 'Content', 'Design'] as const;

// Helper to map Content to Creative
const getVerticalDisplayName = (vertical: string) => {
  if (vertical === 'Content') return 'Creative';
  return vertical;
};

// Map verticals to specific GDG colors for theming
const getVerticalTheme = (vertical: string) => {
  switch (vertical) {
    case 'Operations':
      return { border: 'border-[#4285F4]', text: 'text-[#4285F4]', bg: 'bg-[#4285F4]/5', icon: 'text-[#4285F4]' };
    case 'Marketing':
      return { border: 'border-[#EA4335]', text: 'text-[#EA4335]', bg: 'bg-[#EA4335]/5', icon: 'text-[#EA4335]' };
    case 'Social Media':
      return { border: 'border-[#FBBC04]', text: 'text-[#FBBC04]', bg: 'bg-[#FBBC04]/10', icon: 'text-[#FBBC04]' };
    case 'Content':
      return { border: 'border-[#34A853]', text: 'text-[#34A853]', bg: 'bg-[#34A853]/5', icon: 'text-[#34A853]' };
    default:
      return { border: 'border-[#202124]', text: 'text-[#202124]', bg: 'bg-[#202124]/5', icon: 'text-[#202124]' };
  }
};

const Dashboard = () => {
  const { user } = useAuth();
  const { tasks } = useTasks();


  // Open for all tasks
  const openForAllTasks = tasks.filter(
    (task) => task.assignedTo === null || task.vertical === 'Overall Club'
  );

  // Group tasks by vertical
  const tasksByVertical = dashboardVerticals.reduce((acc, vertical) => {
    acc[vertical] = tasks.filter((task) => task.vertical === vertical);
    return acc;
  }, {} as Record<string, Task[]>);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-[#202124] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section - Google Material Design */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-3">
             <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-[#4285F4]"></span>
                <span className="w-2 h-2 rounded-full bg-[#EA4335]"></span>
                <span className="w-2 h-2 rounded-full bg-[#FBBC04]"></span>
                <span className="w-2 h-2 rounded-full bg-[#34A853]"></span>
             </div>
             <span className="text-xs font-medium text-gray-500 tracking-wider uppercase">Dashboard</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-[#202124] mb-2">
            Hello, <span className="font-medium text-[#4285F4]">{user?.name || 'Developer'}</span>
          </h1>
          <p className="text-base text-gray-600 max-w-2xl">
            {user?.role === 'lead' 
              ? "Oversee community progress and manage vertical assignments."
              : "Let's build something amazing together. Check your tasks below."
            }
          </p>
        </header>

        <div className="space-y-12">
          
          {/* Section 1: Open Opportunities (Open for All) - Google Material Design */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-white rounded-lg shadow-sm border border-gray-200 text-[#4285F4]">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-[#202124]">Open Opportunities</h2>
                <p className="text-sm text-gray-600">Tasks available for the entire community</p>
              </div>
            </div>

            {/* Clean Container for "Open" Tasks */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              {openForAllTasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {openForAllTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}

                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-normal">All clear! No open tasks right now.</p>
                </div>
              )}
            </div>
          </section>

          {/* Section 2: Vertical Breakdowns - Google Material Design */}
          <section>
             <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-white rounded-lg shadow-sm border border-gray-200 text-[#EA4335]">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-[#202124]">Vertical Tracks</h2>
                <p className="text-sm text-gray-600">Specific tasks assigned to departments</p>
              </div>
            </div>

            <div className="space-y-8">
              {dashboardVerticals.map((vertical) => {
                const verticalTasks = tasksByVertical[vertical];
                const theme = getVerticalTheme(vertical);
                
                if (verticalTasks.length === 0) return null;

                return (
                  <div key={vertical} className="animate-fade-in">
                    {/* Vertical Header - Google Material Design */}
                    <div className="flex items-center gap-4 mb-5 pb-3 border-b border-gray-200">
                      <div className={`px-3 py-1 rounded-md text-sm font-medium border ${theme.border} ${theme.bg} ${theme.text} flex items-center gap-2`}>
                        {getVerticalDisplayName(vertical)}
                        <span className="px-1.5 py-0.5 rounded bg-white/50 text-xs font-medium">{verticalTasks.length}</span>
                      </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {verticalTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
    
                        />
                      ))}
                    </div>
                  </div>
                );
              })}

               {/* Empty State for Verticals */}
               {dashboardVerticals.every((v) => tasksByVertical[v].length === 0) && (
                <div className="border border-dashed border-gray-300 rounded-lg p-12 text-center bg-white">
                  <ClipboardList className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-600">No active vertical tracks at the moment.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>


    </div>
  );
};

export default Dashboard;