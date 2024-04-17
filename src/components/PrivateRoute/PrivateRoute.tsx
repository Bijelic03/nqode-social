import React, { useEffect } from 'react';
import { Route, RouteProps, Routes, useNavigate } from 'react-router-dom';

const PrivateRoute: React.FC<RouteProps> = ({ path, element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken && !refreshToken) {
      navigate('/login');
    }
  }, [navigate]);
  return (
    <Routes>
      <Route path={path} element={element} />{' '}
    </Routes>
  );
};

export default PrivateRoute;
