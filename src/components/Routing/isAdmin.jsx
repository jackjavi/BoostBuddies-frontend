import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContextWrapper";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from "../Spinner";

function IsAdmin() {
  const { user, isLoading, isLoggedIn, isAdmin } = useContext(AuthContext);
  const location = useLocation();
  // const [showAccessDenied, setShowAccessDenied] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!isLoading && isLoggedIn && user && !isAdmin) {
      // setShowAccessDenied(true);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isLoading, isLoggedIn, user, isAdmin]);

  if (isLoading) {
    return <Spinner />;
  }

  // If not logged in, redirect to login
  if (!isLoggedIn || !user) {
    const from = {
      pathname: location.pathname,
      search: location.search,
    };
    return <Navigate to="/login" state={{ from }} replace />;
  }

  // If logged in but not admin, show access denied message with countdown
  if (!isAdmin) {
    if (countdown === 0) {
      return <Navigate to="/" replace />;
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl p-8 shadow-lg border max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            You don't have admin privileges to access this page.
          </p>
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">
              Redirecting to dashboard in:
            </p>
            <div className="text-3xl font-bold text-gray-800">{countdown}</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => (window.location.href = "/")}
              className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Go to Dashboard Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
}

export default IsAdmin;
