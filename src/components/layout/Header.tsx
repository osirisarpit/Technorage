import { Bell, Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  currentVertical: string;
}

export const Header = ({ currentVertical }: HeaderProps) => {
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
        {/* Vertical Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <span className="text-sm">{currentVertical}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Design</DropdownMenuItem>
            <DropdownMenuItem>Tech</DropdownMenuItem>
            <DropdownMenuItem>PR</DropdownMenuItem>
            <DropdownMenuItem>Marketing</DropdownMenuItem>
            <DropdownMenuItem>Operations</DropdownMenuItem>
            <DropdownMenuItem>Social Media</DropdownMenuItem>
            <DropdownMenuItem>Content</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
                <span className="text-foreground font-semibold text-sm">AK</span>
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium">Aditya Kumar</p>
                <p className="text-xs text-muted-foreground">Design Lead</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Account Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
