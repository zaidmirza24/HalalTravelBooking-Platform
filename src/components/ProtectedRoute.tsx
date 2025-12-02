import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, User } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: User['role'];
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access if requiredRole is specified
  if (requiredRole && user) {
    const hasAccess = checkRoleAccess(user.role, requiredRole);

    if (!hasAccess) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-50">
          <div className="max-w-md w-full bg-white rounded-xl shadow-card p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Access Denied</h2>
            <p className="text-neutral-600 mb-6">
              You don't have permission to access this page. This area is restricted to {requiredRole} users only.
            </p>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}

// Helper function to check role access
function checkRoleAccess(userRole: User['role'], requiredRole: User['role']): boolean {
  // Superadmin has access to everything
  if (userRole === 'superadmin') return true;

  // Admin has access to admin routes and can view vendor/user areas for support
  if (userRole === 'admin') {
    return requiredRole === 'admin' || requiredRole === 'vendor' || requiredRole === 'user';
  }

  // Vendor and vendor_staff can access vendor routes
  if (userRole === 'vendor' || userRole === 'vendor_staff') {
    return requiredRole === 'vendor' || requiredRole === 'vendor_staff';
  }

  // Regular users can access user routes
  if (userRole === 'user') {
    return requiredRole === 'user';
  }

  return false;
}
