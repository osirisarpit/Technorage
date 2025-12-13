import { useState } from 'react';
import { ClipboardList, Globe, LayoutGrid, Sparkles } from 'lucide-react';
import { Task } from '@/data/dummyData';
import { useTasks } from '@/contexts/TasksContext';
import { TaskCard } from '@/components/cards/TaskCard';
import { FeedbackDialog } from '@/components/dialogs/FeedbackDialog';
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
  const [feedbackTask, setFeedbackTask] = useState<Task | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

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
    <div className="min-h-screen bg-white font-sans text-[#202124] relative selection:bg-[#4285F4]/30 overflow-hidden">
      
      {/* --- START: NEW ANIMATED BACKGROUND --- */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(40px, -60px) rotate(180deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-50px, 30px) rotate(-180deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-30px, -30px) rotate(90deg); }
        }
      `}</style>

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Blue Shapes */}
        <div className="absolute top-20 left-[10%] w-20 h-20 bg-[#4285F4]/10 rounded-2xl animate-[float-slow_20s_ease-in-out_infinite]" />
        <div className="absolute bottom-40 right-[20%] w-16 h-16 bg-[#4285F4]/10 rounded-full animate-[float-medium_18s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-[40%] left-[5%] w-10 h-10 bg-[#4285F4]/20 rounded-2xl animate-[float-reverse_25s_ease-in-out_infinite_1s]" />

        {/* Red Shapes */}
        <div className="absolute top-40 right-[15%] w-24 h-24 bg-[#EA4335]/10 rounded-full animate-[float-medium_22s_ease-in-out_infinite_2s]" />
        <div className="absolute bottom-20 left-[25%] w-14 h-14 bg-[#EA4335]/10 rounded-2xl animate-[float-slow_15s_ease-in-out_infinite_reverse]" />
        
        {/* Yellow Shapes */}
        <div className="absolute top-[30%] left-[40%] w-12 h-12 bg-[#FBBC04]/20 rounded-2xl animate-[float-reverse_20s_ease-in-out_infinite_3s]" />
        <div className="absolute bottom-[30%] right-[5%] w-20 h-20 bg-[#FBBC04]/10 rounded-full animate-[float-slow_24s_ease-in-out_infinite_1s]" />

        {/* Green Shapes */}
        <div className="absolute top-10 right-[40%] w-16 h-16 bg-[#34A853]/10 rounded-2xl animate-[float-slow_19s_ease-in-out_infinite_4s]" />
        <div className="absolute bottom-10 right-[45%] w-28 h-28 bg-[#34A853]/10 rounded-full animate-[float-medium_21s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-[60%] left-[20%] w-8 h-8 bg-[#34A853]/20 rounded-2xl animate-[float-reverse_23s_ease-in-out_infinite_2s]" />

        {/* Extra grey subtle shapes for depth */}
        <div className="absolute top-[50%] right-[30%] w-6 h-6 bg-gray-200/50 rounded-2xl animate-[float-slow_30s_ease-in-out_infinite]" />
        <div className="absolute bottom-[15%] left-[50%] w-10 h-10 bg-gray-200/50 rounded-full animate-[float-medium_28s_ease-in-out_infinite_reverse]" />
      </div>
      {/* --- END: NEW ANIMATED BACKGROUND --- */}


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Header Section */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-2">
             <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-[#4285F4]"></span>
                <span className="w-2 h-2 rounded-full bg-[#EA4335]"></span>
                <span className="w-2 h-2 rounded-full bg-[#FBBC04]"></span>
                <span className="w-2 h-2 rounded-full bg-[#34A853]"></span>
             </div>
             <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase">Internal Dashboard</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#202124] mb-3">
            Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC04]">{user?.name || 'Developer'}</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            {user?.role === 'lead' 
              ? "Oversee community progress and manage vertical assignments."
              : "Let's build something amazing together. Check your tasks below."
            }
          </p>
        </header>

        <div className="space-y-12">
          
          {/* Section 1: Open Opportunities (Open for All) */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white rounded-full shadow-sm border border-gray-100 text-[#4285F4]">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#202124]">Open Opportunities</h2>
                <p className="text-sm text-gray-500">Tasks available for the entire community</p>
              </div>
            </div>

            {/* Gradient Border Container for "Open" Tasks */}
            <div className="relative group rounded-3xl p-[2px] bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853] shadow-sm">
              <div className="bg-white/95 backdrop-blur-sm rounded-[22px] p-6 h-full">
                {openForAllTasks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {openForAllTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onFeedback={(t) => {
                          setFeedbackTask(t);
                          setFeedbackOpen(true);
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-medium">All clear! No open tasks right now.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Section 2: Vertical Breakdowns */}
          <section>
             <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white rounded-full shadow-sm border border-gray-100 text-[#EA4335]">
                <LayoutGrid className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#202124]">Vertical Tracks</h2>
                <p className="text-sm text-gray-500">Specific tasks assigned to departments</p>
              </div>
            </div>

            <div className="space-y-10">
              {dashboardVerticals.map((vertical) => {
                const verticalTasks = tasksByVertical[vertical];
                const theme = getVerticalTheme(vertical);
                
                if (verticalTasks.length === 0) return null;

                return (
                  <div key={vertical} className="animate-fade-in">
                    {/* Vertical Header */}
                    <div className="flex items-center gap-4 mb-5 border-b border-gray-100 pb-2">
                      <div className={`px-4 py-1.5 rounded-full text-sm font-bold border ${theme.border} ${theme.bg} ${theme.text} flex items-center gap-2`}>
                        {getVerticalDisplayName(vertical)}
                        <span className="w-1 h-1 rounded-full bg-current opacity-60" />
                        <span>{verticalTasks.length}</span>
                      </div>
                      <div className="h-[1px] flex-1 bg-gray-100" />
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {verticalTasks.map((task) => (
                        <div key={task.id} className="transition-transform duration-200 hover:-translate-y-1">
                           <TaskCard
                            task={task}
                            onFeedback={(t) => {
                              setFeedbackTask(t);
                              setFeedbackOpen(true);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

               {/* Empty State for Verticals */}
               {dashboardVerticals.every((v) => tasksByVertical[v].length === 0) && (
                <div className="border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center bg-gray-50/50 backdrop-blur-sm">
                  <ClipboardList className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-gray-500">No active vertical tracks at the moment.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      <FeedbackDialog
        task={feedbackTask}
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
      />
    </div>
  );
};

export default Dashboard;