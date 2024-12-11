import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuthStore} from "../../Services/authStore.ts";

export const ProtectedRoute: React.FC = () => {
  const {token} = useAuthStore();
  return token ? <Outlet/> : <Navigate to="/login"/>;
};
