import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRouter = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? (
    <Outlet />
  ) : (
    <Navigate to={'login'}>{toast.error('Please login first')}</Navigate>
  );
};

export default PrivateRouter;
