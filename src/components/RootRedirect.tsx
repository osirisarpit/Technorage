import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const RootRedirect = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      if (user.role === 'lead') {
        navigate('/lead-dashboard');
      } else {
        navigate('/member-dashboard');
      }
    }
  }, [user, navigate]);

  return null; // This component doesn't render anything
};

export default RootRedirect;