import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
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
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6 sticky top-0 z-30 shadow-sm shadow-gray-100">

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative text-gray-600 hover:bg-gray-100">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#EA4335] rounded-full" />
        </Button>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 rounded-full bg-[#4285F4] flex items-center justify-center ring-2 ring-white shadow-sm">
                <span className="text-white font-medium text-sm">{userInitials}</span>
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-gray-900">{userDisplayName}</p>
                <p className="text-xs text-gray-500">{userRole}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white border-gray-200 shadow-lg">
            <DropdownMenuItem onClick={() => navigate('/settings')} className="text-gray-700 hover:bg-gray-100">View Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')} className="text-gray-700 hover:bg-gray-100">Account Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-[#EA4335] hover:bg-red-50" onClick={handleLogout}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
