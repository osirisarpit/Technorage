import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: ('lead' | 'member')[];
}

export const RoleProtectedRoute = ({ children, allowedRoles }: RoleProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    // Redirect to dashboard if user doesn't have access
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

