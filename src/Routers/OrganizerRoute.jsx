/* eslint-disable react/prop-types */
import { Spinner } from "flowbite-react";
import UseAuth from "../Hooks/UseAuth";
import useRole from "../Hooks/useRole";
import { Navigate, useLocation } from "react-router-dom";

const OrganizerRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const [userRole, roleLoading] = useRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <Spinner aria-label="Extra large spinner example" size="xl" />;
  }

  if (user && userRole === "organizer") {
    return children;
  }
  return <Navigate to="/signin" state={{ from: location }} replace></Navigate>;
};

export default OrganizerRoute;
