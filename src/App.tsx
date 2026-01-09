import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { TasksProvider } from "@/contexts/TasksContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RoleProtectedRoute } from "@/components/RoleProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import MemberDashboard from "@/pages/MemberDashboard";
import LeadDashboard from "@/pages/LeadDashboard";
import RootRedirect from "@/components/RootRedirect";
import CreateTask from "@/pages/CreateTask";
import MemberList from "@/pages/MemberList";
import AssignedTasks from "@/pages/AssignedTasks";
import Tasks from "@/pages/Tasks";

import Settings from "@/pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TasksProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<RootRedirect />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/member-dashboard" element={<MemberDashboard />} />
              <Route path="/lead-dashboard" element={<LeadDashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/assigned-tasks" element={<AssignedTasks />} />
              <Route path="/settings" element={<Settings />} />
              
              {/* Lead-only routes */}
              <Route
                path="/create-task"
                element={
                  <RoleProtectedRoute allowedRoles={['lead']}>
                    <CreateTask />
                  </RoleProtectedRoute>
                }
              />

            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </TooltipProvider>
      </TasksProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
