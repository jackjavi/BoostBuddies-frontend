import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextWrapper";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../Spinner";

function IsLoggedIn() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Spinner />;
  }
  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
}

export default IsLoggedIn;
