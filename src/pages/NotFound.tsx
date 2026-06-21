import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-indigo-50 to-violet-50 px-6">
      <div className="max-w-2xl text-center">
        <img
          src="/React_AI_Mock_Interview_Logo.png"
          alt="AI Mock Interview"
          className="w-56 mx-auto mb-8"
        />

        <h1
          className="text-8xl md:text-9xl font-extrabold"
          style={{ color: "#4845D2" }}
        >
          404
        </h1>

        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
          Interview Question Not Found
        </h2>

        <p className="mt-4 text-lg text-gray-600">
          Looks like you've taken a wrong turn.
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          {/* <Link to="/">
            <Button
              className="w-full sm:w-auto"
              style={{
                backgroundColor: "#4845D2",
                color: "white",
              }}
            >
              <Home className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Button>
          </Link> */}

          <Button
            variant="outline"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>

        <div className="mt-12">
          <div
            className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium"
            style={{
              backgroundColor: "#4845D215",
              color: "#4845D2",
            }}
          >
            🤖 AI Mock Interview Assistant
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;