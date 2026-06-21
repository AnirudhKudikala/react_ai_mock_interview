import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from '@clerk/react'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}

export default ProtectedRoute;