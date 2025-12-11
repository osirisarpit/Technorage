import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '@/lib/utils';

export const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
      />

      <div
        className={cn(
          "transition-all duration-300",
          sidebarCollapsed ? "ml-20" : "ml-64"
        )}
      >
        <Header currentVertical="Design" />

        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* FAB Button */}
      <button
        onClick={() => navigate('/create-task')}
        className="fab-button"
        aria-label="Create new task"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};
