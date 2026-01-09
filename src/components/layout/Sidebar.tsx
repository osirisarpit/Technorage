import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Users, 
  ClipboardList, 
  MessageSquare, 
  Sparkles, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;

}

interface NavItem {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  roles: ('lead' | 'member')[];
}

const allNavItems: NavItem[] = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard', roles: ['lead', 'member'] },
  { path: '/create-task', icon: PlusCircle, label: 'Create Task', roles: ['lead'] },
  { path: '/tasks', icon: ClipboardList, label: 'Task Room', roles: ['member'] },
  { path: '/tasks', icon: ClipboardList, label: 'Tasks', roles: ['lead'] },
  { path: '/settings', icon: Settings, label: 'Settings', roles: ['lead', 'member'] },
];

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();
  const { user } = useAuth();

  // Filter nav items based on user role and adjust paths/labels
  const navItems = allNavItems
    .filter(item => user && item.roles.includes(user.role))
    .map(item => {
      // Adjust path for dashboard based on user role
      if (item.path === '/' && user?.role === 'member') {
        return { ...item, path: '/member-dashboard' };
      } else if (item.path === '/' && user?.role === 'lead') {
        return { ...item, path: '/lead-dashboard' };
      }
      // Adjust label for tasks based on user role
      else if (item.path === '/tasks' && user?.role === 'member') {
        return { ...item, label: 'Tasks' };
      }
      return item;
    });

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-40 transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-google-blue via-google-red to-google-yellow flex items-center justify-center shrink-0">
            <span className="text-foreground font-bold text-sm">GDG</span>
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="font-display font-bold text-sm text-foreground leading-tight">
                GDG On Campus
              </h1>
              <p className="text-xs text-muted-foreground">IET DAVV</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "sidebar-item group relative",
                isActive && "sidebar-item-active"
              )}
            >
              <item.icon 
                className={cn(
                  "w-5 h-5 shrink-0 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )} 
              />
              {!collapsed && (
                <span className="animate-fade-in truncate">{item.label}</span>
              )}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-popover border border-border rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-sidebar-border space-y-2">


        {/* Collapse Toggle */}
        <button
          onClick={onToggle}
          className="sidebar-item w-full justify-center"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="animate-fade-in">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
