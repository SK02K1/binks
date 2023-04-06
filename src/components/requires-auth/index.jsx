import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '@src/features';
import { Navbar } from '@src/components';

export const RequiresAuth = () => {
  const token = useSelector(selectToken);
  const location = useLocation();
  return token ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to='/register' state={{ from: location }} replace />
  );
};
