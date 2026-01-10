import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Mail, Lock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { createUserProfile } from '@/services/userService';
import { auth } from '@/lib/firebase';

type UserRole = 'lead' | 'member';

const Login = () => {
  const navigate = useNavigate();
  const { login: firebaseLogin, register, isAuthenticated } = useAuth();
  const [role, setRole] = useState<UserRole>('lead');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', vertical: '' });
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
    const form = formData;

    try {
      if (!form.email || !form.password) {
        toast({
          title: "Error",
          description: "Please enter both email and password.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Attempt to log in with Firebase
      await firebaseLogin(form.email, form.password);
      
      toast({
        title: "Welcome back!",
        description: `Successfully logged in as ${role === 'lead' ? 'Lead' : 'Member'}.`,
        className: "border-l-4 border-[#4285F4]" // Google Blue accent
      });
      
      // Redirect to appropriate dashboard based on role
      if (role === 'lead') {
        navigate('/lead-dashboard');
      } else {
        navigate('/member-dashboard');
      }
    } catch (error: any) {
      // Handle different types of authentication errors
      let errorMessage = "Login failed. Please check your credentials.";
      if (error.code) {
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = "No account found with this email. Please register first.";
            break;
          case 'auth/wrong-password':
            errorMessage = "Incorrect password. Please try again.";
            break;
          case 'auth/invalid-email':
            errorMessage = "Invalid email format. Please check your email.";
            break;
          case 'auth/user-disabled':
            errorMessage = "This account has been disabled.";
            break;
          case 'auth/too-many-requests':
            errorMessage = "Too many failed attempts. Please try again later.";
            break;
          case 'auth/network-request-failed':
            errorMessage = "Network error. Please check your connection.";
            break;
          default:
            errorMessage = error.message || `Login failed: ${error.code}`;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Login Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async (role: UserRole) => {
    setIsLoading(true);
    console.log('handleGoogleSignup called with role:', role); // Debug logging
    try {
      // Import Google auth provider
      const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
      const provider = new GoogleAuthProvider();
      
      // Sign in with Google popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Create user profile in Firestore
      await createUserProfile(user, {
        role: role,
        name: user.displayName || user.email!.split('@')[0],
        vertical: role === 'lead' ? 'Overall Club' : 'Operations' // Default vertical
      });
      
      toast({
        title: "Account created!",
        description: `Successfully signed up as ${role === 'lead' ? 'Lead' : 'Member'} with Google.`,
        className: "border-l-4 border-[#4285F4]"
      });
      
      // The AuthContext should automatically update via onAuthStateChanged
      // Wait for a brief moment to allow the state to propagate
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log('About to navigate, role is:', role); // Debug logging
      if (role === 'lead') {
        console.log('Navigating to lead dashboard'); // Debug logging
        navigate('/lead-dashboard');
      } else {
        console.log('Navigating to member dashboard'); // Debug logging
        navigate('/member-dashboard');
      }
    } catch (error: any) {
      // Handle different types of Google signup errors
      let errorMessage = "Google signup failed. Please try again.";
      if (error.code) {
        switch (error.code) {
          case 'auth/popup-blocked':
            errorMessage = "Popup blocked. Please allow popups for this site.";
            break;
          case 'auth/popup-closed-by-user':
            errorMessage = "Popup closed. Please try again.";
            break;
          case 'auth/cancelled-popup-request':
            errorMessage = "Request cancelled. Please try again.";
            break;
          case 'auth/network-request-failed':
            errorMessage = "Network error. Please check your connection.";
            break;
          default:
            errorMessage = error.message || `Google signup failed: ${error.code}`;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Google Signup Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent, role: UserRole) => {
    e.preventDefault();
    setIsLoading(true);
    const form = formData;

    try {
      if (!form.email || !form.password || !form.name || !form.vertical) {
        toast({
          title: "Error",
          description: "Please fill in all fields.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (form.password.length < 6) {
        toast({
          title: "Error",
          description: "Password must be at least 6 characters long.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Register user with Firebase
      await register(form.email, form.password, {
        role: role,
        email: form.email,
        name: form.name,
        vertical: form.vertical
      });
      
      toast({
        title: "Account created!",
        description: `Successfully registered as ${role === 'lead' ? 'Lead' : 'Member'}.`,
        className: "border-l-4 border-[#4285F4]"
      });
      
      // Redirect to appropriate dashboard based on role
      if (role === 'lead') {
        navigate('/lead-dashboard');
      } else {
        navigate('/member-dashboard');
      }
    } catch (error: any) {
      // Handle different types of registration errors
      let errorMessage = "Registration failed. Please try again.";
      if (error.code) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = "An account with this email already exists. Please sign in.";
            break;
          case 'auth/invalid-email':
            errorMessage = "Invalid email format. Please check your email.";
            break;
          case 'auth/weak-password':
            errorMessage = "Password is too weak. Please use at least 6 characters.";
            break;
          case 'auth/operation-not-allowed':
            errorMessage = "Email/password authentication is not enabled for this project.";
            break;
          case 'auth/network-request-failed':
            errorMessage = "Network error. Please check your connection.";
            break;
          default:
            errorMessage = error.message || `Registration failed: ${error.code}`;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Registration Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
              {/* Role Selection Dropdown */}
              <div className="space-y-2 mb-6">
                <Label htmlFor="role-select" className="text-gray-700 font-medium">Select Role</Label>
                <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                  <SelectTrigger className="w-full bg-gray-50 border-gray-200 focus:border-[#4285F4] focus:ring-2 focus:ring-[#4285F4]/20 rounded-xl transition-all text-gray-900 h-11">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Lead
                      </div>
                    </SelectItem>
                    <SelectItem value="member">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Member
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Single Signup Form */}
              <form onSubmit={(e) => handleRegister(e, role)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">Full Name</Label>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#4285F4] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10 h-11 bg-gray-50 border-gray-200 focus:border-[#4285F4] focus:ring-2 focus:ring-[#4285F4]/20 rounded-xl transition-all text-gray-900 placeholder:text-gray-400"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-[#4285F4]"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          name: role === 'lead' ? 'John Smith' : 'Jane Doe',
                          email: role === 'lead' ? 'john@gdg.dev' : 'jane@gdg.dev',
                          vertical: role === 'lead' ? 'Design' : 'Tech'
                        });
                      }}
                    >
                      Demo
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vertical">Vertical</Label>
                  <Select
                    value={formData.vertical}
                    onValueChange={(value) => setFormData({ ...formData, vertical: value })}
                    required
                  >
                    <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-[#4285F4] focus:ring-2 focus:ring-[#4285F4]/20 rounded-xl transition-all text-gray-900">
                      <SelectValue placeholder="Select your vertical" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Overall Club">Overall Club</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="PR">PR</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Tech">Tech</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Social Media">Social Media</SelectItem>
                      <SelectItem value="Content">Content</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#4285F4] transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={`${role}@gdg.dev`}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 h-11 bg-gray-50 border-gray-200 focus:border-[#4285F4] focus:ring-2 focus:ring-[#4285F4]/20 rounded-xl transition-all text-gray-900 placeholder:text-gray-400"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-[#4285F4]"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          email: role === 'lead' ? 'john@gdg.dev' : 'jane@gdg.dev',
                          password: 'password123'
                        });
                      }}
                    >
                      Demo
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#4285F4] transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 h-11 bg-gray-50 border-gray-200 focus:border-[#4285F4] focus:ring-2 focus:ring-[#4285F4]/20 rounded-xl transition-all text-gray-900 placeholder:text-gray-400"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-[#4285F4]"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          password: 'password123'
                        });
                      }}
                    >
                      Demo
                    </Button>
                  </div>
                </div>

                {/* Colorful Signup Button */}
                <Button
                  type="button"
                  variant="default"
                  className={`w-full h-11 text-base font-medium rounded-xl mt-2 shadow-lg hover:shadow-xl transition-all duration-300
                    ${role === 'lead' 
                      ? 'bg-gradient-to-r from-[#4285F4] to-[#3367D6] hover:from-[#3367D6] hover:to-[#1a4780] text-white' 
                      : 'bg-gradient-to-r from-[#34A853] to-[#188038] hover:from-[#188038] hover:to-[#0d4721] text-white'
                    }`}
                  disabled={isLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    handleGoogleSignup(role);
                  }}
                >
                  {isLoading ? (
                    'Signing up...'
                  ) : (
                    <span className="flex items-center gap-2">
                      Sign up as {role.charAt(0).toUpperCase() + role.slice(1)}
                    </span>
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400">
                  Join the community to start collaborating
                </p>
              </div>
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