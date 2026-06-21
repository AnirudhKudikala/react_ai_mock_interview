import { BrowserRouter, Routes, Route } from "react-router";

import routesConfig from "./routesConfig";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/NotFound";
import { ClerkProvider } from "@clerk/react";

function AppRoutes() {

  return (
    <BrowserRouter>
        <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY} signInUrl="/sign-in" signUpUrl="/sign-up">
            <Routes>
                {routesConfig.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                    route.isProtected ? (
                        <ProtectedRoute>{route.element}</ProtectedRoute>
                    ) : (
                        route.element
                    )
                    }
                />
                ))}

                <Route path="*" element={<NotFound />} />
            </Routes>
        </ClerkProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;
