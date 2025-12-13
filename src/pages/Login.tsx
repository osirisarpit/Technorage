import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Mail, Lock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

type UserRole = 'lead' | 'member';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<UserRole>('lead');
  const [leadForm, setLeadForm] = useState({ email: '', password: '' });
  const [memberForm, setMemberForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent, role: UserRole) => {
    e.preventDefault();
    setIsLoading(true);
    const form = role === 'lead' ? leadForm : memberForm;

    // Simulate API call
    setTimeout(() => {
      if (form.email && form.password) {
        login({
          role: role,
          email: form.email,
          name: role === 'lead' ? 'Aditya Kumar' : 'Priya Verma',
          vertical: role === 'lead' ? 'Design' : 'Tech'
        });
        
        toast({
          title: "Welcome back!",
          description: `Successfully logged in as ${role === 'lead' ? 'Lead' : 'Member'}.`,
          className: "border-l-4 border-[#4285F4]" // Google Blue accent
        });
        
        navigate('/');
        setIsLoading(false);
      } else {
        toast({
          title: "Error",
          description: "Please fill in all fields.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] relative flex items-center justify-center p-4 overflow-hidden font-sans">
      
      {/* --- CSS for Floating Animations --- */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          33% { transform: translateY(-30px) translateX(10px) rotate(10deg); }
          66% { transform: translateY(-15px) translateX(-10px) rotate(-5deg); }
        }
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 12s ease-in-out infinite; }
        .animate-rotate-slow { animation: rotate-slow 20s linear infinite; }
      `}</style>

      {/* --- Background Decorations (Google Theme) --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Static Blurs (Base Layer) */}
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-[#4285F4]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-[#34A853]/10 rounded-full blur-3xl" />
        
        {/* Floating Squares and Circles */}
        {/* Top Left Area */}
        <div className="absolute top-[5%] left-[10%] w-16 h-16 bg-[#EA4335]/20 rounded-xl animate-float-slow backdrop-blur-sm" style={{ animationDelay: '0s' }} />
        <div className="absolute top-[15%] left-[5%] w-12 h-12 bg-[#FBBC04]/30 rounded-full animate-float-medium backdrop-blur-sm" style={{ animationDelay: '2s' }} />
        
        {/* Top Right Area */}
        <div className="absolute top-[10%] right-[15%] w-20 h-20 bg-[#4285F4]/20 rounded-full animate-float-slow backdrop-blur-sm" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[25%] right-[8%] w-10 h-10 bg-[#34A853]/30 rounded-xl animate-rotate-slow backdrop-blur-sm" />
        
        {/* Bottom Left Area */}
        <div className="absolute bottom-[15%] left-[12%] w-24 h-24 bg-[#4285F4]/15 rounded-full animate-float-medium backdrop-blur-sm" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-[8%] left-[20%] w-14 h-14 bg-[#EA4335]/20 rounded-xl animate-float-slow backdrop-blur-sm" style={{ animationDelay: '1.5s' }} />

        {/* Bottom Right Area */}
        <div className="absolute bottom-[20%] right-[10%] w-18 h-18 bg-[#FBBC04]/20 rounded-xl animate-float-slow backdrop-blur-sm" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-[5%] right-[20%] w-12 h-12 bg-[#34A853]/25 rounded-full animate-float-medium backdrop-blur-sm" style={{ animationDelay: '2.5s' }} />
        
        {/* Geometric Grid Dots (Static) */}
        <div className="absolute top-20 right-20 opacity-20 hidden md:block">
          <div className="grid grid-cols-4 gap-2">
              {[...Array(16)].map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-[#4285F4]' : 'bg-[#EA4335]'}`} />
              ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10 animate-fade-in">
        
        {/* Logo/Header Section */}
        <div className="text-center space-y-2">
          <div className="flex flex-col items-center justify-center gap-3 mb-6">
            {/* GDG Style Logo Icon */}
            <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-[#EA4335]" /> {/* Red */}
                <div className="w-4 h-4 rounded-full bg-[#4285F4]" /> {/* Blue */}
                <div className="w-4 h-4 rounded-full bg-[#34A853]" /> {/* Green */}
                <div className="w-4 h-4 rounded-full bg-[#FBBC04]" /> {/* Yellow */}
            </div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              GDG <span className="text-[#4285F4]">Task</span> Spark
            </h1>
          </div>
          <p className="text-gray-500 text-sm md:text-base">
            Manage your community tasks efficiently
          </p>
        </div>

        {/* Login Card */}
        <Card className="bg-white/90 backdrop-blur-md border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden">
          <CardHeader className="pb-4 border-b border-gray-100 bg-white/50">
            <CardTitle className="text-xl text-center text-gray-800">Welcome Back</CardTitle>
            <CardDescription className="text-center text-gray-500">
              Select your role to access the dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as UserRole)} className="w-full">
              
              {/* Custom Styled Tabs */}
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100/80 p-1 rounded-xl h-12">
                <TabsTrigger 
                  value="lead" 
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#4285F4] data-[state=active]:shadow-sm transition-all duration-200 font-medium"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Lead
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="member" 
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#34A853] data-[state=active]:shadow-sm transition-all duration-200 font-medium"
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Member
                  </div>
                </TabsTrigger>
              </TabsList>

              {/* Login Forms Wrapper */}
              <div className="mt-2">
                  {['lead', 'member'].map((role) => (
                    <TabsContent key={role} value={role} className="space-y-5 focus-visible:outline-none focus-visible:ring-0">
                        <form onSubmit={(e) => handleLogin(e, role as UserRole)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor={`${role}-email`} className="text-gray-700 font-medium">Email Address</Label>
                            <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#4285F4] transition-colors" />
                            <Input
                                id={`${role}-email`}
                                type="email"
                                placeholder={`${role}@gdg.dev`}
                                value={role === 'lead' ? leadForm.email : memberForm.email}
                                onChange={(e) => role === 'lead' 
                                    ? setLeadForm({ ...leadForm, email: e.target.value })
                                    : setMemberForm({ ...memberForm, email: e.target.value })
                                }
                                className="pl-10 h-11 bg-gray-50 border-gray-200 focus:border-[#4285F4] focus:ring-2 focus:ring-[#4285F4]/20 rounded-xl transition-all text-gray-900 placeholder:text-gray-400"
                                required
                            />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor={`${role}-password`} className="text-gray-700 font-medium">Password</Label>
                            <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#4285F4] transition-colors" />
                            <Input
                                id={`${role}-password`}
                                type="password"
                                placeholder="••••••••"
                                value={role === 'lead' ? leadForm.password : memberForm.password}
                                onChange={(e) => role === 'lead'
                                    ? setLeadForm({ ...leadForm, password: e.target.value })
                                    : setMemberForm({ ...memberForm, password: e.target.value })
                                }
                                className="pl-10 h-11 bg-gray-50 border-gray-200 focus:border-[#4285F4] focus:ring-2 focus:ring-[#4285F4]/20 rounded-xl transition-all text-gray-900 placeholder:text-gray-400"
                                required
                            />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className={`w-full h-11 text-base font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mt-2
                                ${role === 'lead' 
                                    ? 'bg-[#4285F4] hover:bg-[#3367D6] shadow-[#4285F4]/20' 
                                    : 'bg-[#34A853] hover:bg-[#2D9249] shadow-[#34A853]/20'
                                }`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                'Signing in...'
                            ) : (
                                <span className="flex items-center gap-2">
                                    Sign in as {role.charAt(0).toUpperCase() + role.slice(1)} <ChevronRight className="w-4 h-4" />
                                </span>
                            )}
                        </Button>
                        </form>
                    </TabsContent>
                  ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400">
                  Join the community to start collaborating
                </p>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="flex justify-center gap-4 text-xs text-gray-400">
            <span className="hover:text-[#4285F4] cursor-pointer transition-colors">Privacy</span>
            <span>•</span>
            <span className="hover:text-[#4285F4] cursor-pointer transition-colors">Terms</span>
            <span>•</span>
            <span className="hover:text-[#4285F4] cursor-pointer transition-colors">Contact</span>
        </div>
      </div>
    </div>
  );
};

export default Login;