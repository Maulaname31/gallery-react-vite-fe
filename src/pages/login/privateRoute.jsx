import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {

  const isLoggedIn = localStorage.getItem('isLoggedIn'); 

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;