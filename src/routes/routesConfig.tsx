import type { ReactNode } from "react";

import Dashboard from "../pages/Dashboard";
import Questions from "../pages/Questions";
import Upgrade from "../pages/Upgrade";
import HowItWorks from "../pages/HowItWorks";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import Interview from "../pages/Interview";
import Feedback from "../pages/Feedback";
import StartInterview from "../pages/StartInterview";

export interface AppRoute {
    path: string;
    element: ReactNode;
    isProtected?: boolean;
}

const routesConfig: AppRoute[] = [
    {
        path: "/sign-in",
        element: <SignInPage />,
        isProtected: false,
    },
    {
        path: "/sign-up",
        element: <SignUpPage />,
        isProtected: false,
    },
    {
        path: "/",
        element: <Dashboard />,
        isProtected: true,
    },
    {
        path: "/questions",
        element: <Questions />,
        isProtected: true,
    },
    {
        path: "/upgrade",
        element: <Upgrade />,
        isProtected: true,
    },
    {
        path: "/how-it-works",
        element: <HowItWorks />,
        isProtected: true,
    },
    {
        path: "/interview/:interviewId",
        element: <Interview />,
        isProtected: true,
    },
    {
        path: "/interview/:interviewId/feedback",
        element: <Feedback />,
        isProtected: true,
    },
    {
        path: "/interview/:interviewId/start",
        element: <StartInterview />,
        isProtected: true,
    }
];

export default routesConfig;
