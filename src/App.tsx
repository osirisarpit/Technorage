import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import CreateTask from "@/pages/CreateTask";
import MemberList from "@/pages/MemberList";
import AssignedTasks from "@/pages/AssignedTasks";
import FeedbackHub from "@/pages/FeedbackHub";
import SmartSuggestions from "@/pages/SmartSuggestions";
import Settings from "@/pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/members" element={<MemberList />} />
            <Route path="/tasks" element={<AssignedTasks />} />
            <Route path="/feedback" element={<FeedbackHub />} />
            <Route path="/suggestions" element={<SmartSuggestions />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
