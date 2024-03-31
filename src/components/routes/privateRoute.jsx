import { Outlet, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ ...rest }) => {
  const token = localStorage.getItem('jwtToken');
  
  const getUserRole = () => {
    if (token) {
      try {
        const decode = jwtDecode(token);
        return decode.role;
      } catch (error) {
        console.error('Token tidak valid:', error);
        return null;
      }
    }
    return null;
  };

  const userRole = getUserRole();
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  if (userRole === 'admin') {
    return <Outlet {...rest} />;
  }
  if (!rest.admin) {
    return <Outlet {...rest} />;
  }
  return <Navigate to="/unauthorized" />;
};

export default PrivateRoute;
