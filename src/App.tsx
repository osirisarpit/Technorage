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
import CreateTask from "@/pages/CreateTask";
import MemberList from "@/pages/MemberList";
import AssignedTasks from "@/pages/AssignedTasks";
import Tasks from "@/pages/Tasks";
import FeedbackHub from "@/pages/FeedbackHub";
import SmartSuggestions from "@/pages/SmartSuggestions";
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
              {/* Available to both Lead and Member */}
              <Route path="/" element={<Dashboard />} />
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
              <Route
                path="/members"
                element={
                  <RoleProtectedRoute allowedRoles={['lead']}>
                    <MemberList />
                  </RoleProtectedRoute>
                }
              />
              <Route
                path="/feedback"
                element={
                  <RoleProtectedRoute allowedRoles={['lead']}>
                    <FeedbackHub />
                  </RoleProtectedRoute>
                }
              />
              <Route
                path="/suggestions"
                element={
                  <RoleProtectedRoute allowedRoles={['lead']}>
                    <SmartSuggestions />
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
