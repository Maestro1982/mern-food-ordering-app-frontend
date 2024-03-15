import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { useCreateMyUser } from '@/api/MyUserApi';

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();

  // Stored this in a useRef because i don't want to reload/re-render the component every time we update this variable
  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }

    navigate('/');
  }, [createUser, navigate, user]);

  return <>Loading...</>;
};
export default AuthCallbackPage;
