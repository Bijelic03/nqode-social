import React, { useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken && !refreshToken) {
      navigate('/login');
    }
  }, [navigate]);
  return <Route path={path} element={element} />;
};

export default PrivateRoute;
