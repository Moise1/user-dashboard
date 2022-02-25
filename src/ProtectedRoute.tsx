import React from 'react';
import { Redirect, Route } from 'react-router-dom';

interface Props {
  component: React.ElementType;
  path?: string | string[];
  exact?: boolean;
}
export const ProtectedRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return (
    <Route {...rest} render={(props) => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login"/>)} />
  );
};