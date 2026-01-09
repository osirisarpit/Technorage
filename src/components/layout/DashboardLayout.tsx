import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '@/lib/utils';

export const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div
        className={cn(
          "transition-all duration-300 bg-white",
          sidebarCollapsed ? "ml-20" : "ml-64"
        )}
      >
        <Header currentVertical="Design" />

        <main className="p-6 bg-white min-h-screen">
          <Outlet />
        </main>
      </div>

      {/* FAB Button - Google Material Design */}
      <button
        onClick={() => navigate('/create-task')}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-[#4285F4] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-[#3367D6] z-50"
        aria-label="Create new task"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};
