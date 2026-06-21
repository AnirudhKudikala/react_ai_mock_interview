import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from '@clerk/react'
import { Loader2 } from "lucide-react";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 /> 
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-up" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;