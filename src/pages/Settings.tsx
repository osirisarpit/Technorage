import { User, Bell, Shield, Palette, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Section */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <User className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Profile</h2>
        </div>

        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-google-blue to-google-green flex items-center justify-center">
            <span className="text-foreground font-bold text-2xl">
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">{user?.name || 'User'}</h3>
            <p className="text-muted-foreground">{user?.role === 'lead' ? `${user?.vertical} Lead` : user?.vertical || 'Member'}</p>
            <p className="text-sm text-muted-foreground mt-1">{user?.email || 'user@example.com'}</p>
          </div>
          <Button variant="outline" className="ml-auto">
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
        </div>

        <div className="space-y-4">
          {[
            { id: 'email', label: 'Email Notifications', desc: 'Receive updates via email', enabled: true },
            { id: 'task', label: 'Task Reminders', desc: 'Get reminded about deadlines', enabled: true },
            { id: 'submission', label: 'Submission Alerts', desc: 'When members submit tasks', enabled: true },
            { id: 'digest', label: 'Weekly Digest', desc: 'Summary of weekly activity', enabled: false },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <Label htmlFor={item.id} className="text-foreground cursor-pointer">
                  {item.label}
                </Label>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
              <Switch id={item.id} defaultChecked={item.enabled} />
            </div>
          ))}
        </div>
      </div>

      {/* Appearance Section */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <Palette className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Use dark theme</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground">Compact View</Label>
              <p className="text-sm text-muted-foreground">Reduce spacing in lists</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Security</h2>
        </div>

        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Two-Factor Authentication
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Active Sessions
          </Button>
        </div>
      </div>

      {/* Help & Support */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Help & Support</h2>
        </div>

        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            Documentation
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Contact Support
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Report a Bug
          </Button>
        </div>
      </div>

      {/* Logout */}
      <Separator />
      
      <Button variant="destructive" className="w-full gap-2">
        <LogOut className="w-4 h-4" />
        Log Out
      </Button>

      {/* Version Info */}
      <p className="text-center text-sm text-muted-foreground">
        GDG On Campus Dashboard v1.0.0 (Prototype)
      </p>
    </div>
  );
};

export default Settings;
