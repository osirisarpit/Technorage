import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { fetchMemberTask } from '@/services/googleSheet';
import { MemberTask } from '@/data/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';


const MemberDashboard = () => {
  const { user, username, isLoading: authLoading, isAuthenticated } = useAuth();
  const [task, setTask] = useState<MemberTask | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMemberTask = async () => {
      if (!isAuthenticated || !username) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Fetch the task assigned to this member from Google Sheets
        const memberTask = await fetchMemberTask(username);
        setTask(memberTask);
      } catch (err: any) {
        console.error('Error fetching member task:', err);
        setError(err.message || 'Failed to fetch task data');
      } finally {
        setLoading(false);
      }
    };

    loadMemberTask();
  }, [username, isAuthenticated]);

  // Show loading state while authentication is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-1/3 mb-6" />
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-4/5 mb-4" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show message if user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertDescription>
              Please sign in to view your assigned tasks.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Member Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.name}! Here's your assigned task.
          </p>
        </div>

        {error ? (
          <Alert className="bg-red-50 border-red-200">
            <AlertDescription className="text-red-700">
              Error: {error}
            </AlertDescription>
          </Alert>
        ) : loading ? (
          <Card>
            <CardHeader>
              <CardTitle>Loading Task...</CardTitle>
              <CardDescription>Fetching your assigned task</CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-4/5 mb-4" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              <div className="flex space-x-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
            </CardContent>
          </Card>
        ) : task ? (
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl text-gray-900">{task.taskTitle}</CardTitle>
                  <CardDescription className="text-gray-600 mt-1">
                    {task.description}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {task.vertical}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-medium">Assigned to:</span> {task.username}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-medium">Category:</span> {task.vertical}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">Task Details</h3>
                  <p className="text-gray-700 whitespace-pre-line">{task.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border border-dashed border-gray-300">
            <CardHeader className="text-center">
              <CardTitle className="text-gray-500">No Task Assigned</CardTitle>
              <CardDescription className="text-gray-500">
                You don't have any tasks assigned to you at this time.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-8">
              <p className="text-gray-600">
                Please check back later or contact your team lead for task assignments.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MemberDashboard;