import React from "react";
import {Navigate, Outlet} from "react-router-dom";

interface PublicRouteProps {
  isAuthenticated: boolean;
  redirectPath?: string;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({isAuthenticated, redirectPath = "/mainpage",}) => {
  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace/>;
  }
  return <Outlet/>;
};
