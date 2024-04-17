import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken && !refreshToken) {
      navigate('/login');
    }
  }, [navigate]);
  return <Outlet />;
};

export default PrivateRoute;
