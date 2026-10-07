import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className='p-10 text-center text-gray-500'>Loading...</div>;
  if (!user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }
  if (adminOnly && user.role !== 'admin') return <Navigate to='/' replace />;
  return children;
};

export default ProtectedRoute;
