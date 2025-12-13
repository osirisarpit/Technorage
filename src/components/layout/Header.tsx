import { useNavigate } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  currentVertical: string;
}

export const Header = ({ currentVertical }: HeaderProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const userInitials = user ? getInitials(user.name) : 'U';
  const userDisplayName = user?.name || 'User';
  const userRole = user?.role === 'lead' ? `${user.vertical} Lead` : user?.vertical || 'Member';

  return (
    <header className="h-16 bg-card/50 backdrop-blur-xl border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Search */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks, members..."
          className="pl-10 bg-secondary/50 border-border focus:border-primary"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />
        </Button>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-google-blue to-google-green flex items-center justify-center">
                <span className="text-foreground font-semibold text-sm">{userInitials}</span>
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium">{userDisplayName}</p>
                <p className="text-xs text-muted-foreground">{userRole}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => navigate('/settings')}>View Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')}>Account Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
