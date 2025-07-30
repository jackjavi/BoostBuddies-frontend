import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextWrapper";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from "../Spinner";

function IsLoggedIn() {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default IsLoggedIn;
