import { useState } from 'react';
import { ClipboardList, Globe, LayoutGrid, Sparkles } from 'lucide-react';
import { Task } from '@/data/dummyData';
import { useTasks } from '@/contexts/TasksContext';

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

const MemberDashboard = () => {
  const { user } = useAuth();
  const { tasks } = useTasks();
  
  // Filter tasks assigned to the current user
  const assignedTasks = tasks.filter(task => task.assignedToName === user?.name);
  
  // Open for all tasks
  const openForAllTasks = tasks.filter(
    (task) => task.assignedTo === null || task.vertical === 'Overall Club'
  );

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
             <span className="text-xs font-medium text-gray-500 tracking-wider uppercase">Member Dashboard</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-[#202124] mb-2">
            Welcome, <span className="font-medium text-[#4285F4]">{user?.name || 'Member'}</span>
          </h1>
          <p className="text-base text-gray-600 max-w-2xl">
            Let's build something amazing together. Check your assigned tasks below.
          </p>
        </header>

        <div className="space-y-12">
          
          {/* Section 1: Your Assigned Tasks */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-white rounded-lg shadow-sm border border-gray-200 text-[#4285F4]">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-[#202124]">Your Assigned Tasks</h2>
                <p className="text-sm text-gray-600">Tasks specifically assigned to you</p>
              </div>
            </div>

            {/* Clean Container for "Assigned" Tasks */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              {assignedTasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {assignedTasks.map((task) => (
                    <div key={task.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
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
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-normal">All clear! No assigned tasks right now.</p>
                </div>
              )}
            </div>
          </section>

          {/* Section 2: Open Opportunities (Open for All) */}
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
                    <div key={task.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
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
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;