import { useAuth0 } from '@auth0/auth0-react';

import { Button } from '@/components/ui/button';

import UsernameMenu from '@/components/UsernameMenu';

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <span className='flex space-x-2 items-center'>
      {isAuthenticated ? (
        <UsernameMenu />
      ) : (
        <Button
          variant='ghost'
          className='font-bold text-lg hover:text-orange-500 hover:bg-white'
          onClick={async () => await loginWithRedirect()}
        >
          Login
        </Button>
      )}
    </span>
  );
};
export default MainNav;
