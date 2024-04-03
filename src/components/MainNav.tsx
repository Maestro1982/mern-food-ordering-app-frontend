import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

import { useAuth0 } from '@auth0/auth0-react';

import { Button } from '@/components/ui/button';

import UsernameMenu from '@/components/UsernameMenu';

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <span className='flex space-x-2 items-center'>
      {isAuthenticated ? (
        <>
          <Link to='order-status' className='font-bold hover:text-orange-500'>
            Order Status
          </Link>
          <UsernameMenu />
        </>
      ) : (
        <Button
          variant='ghost'
          className='font-bold text-lg hover:text-orange-500 hover:bg-white '
          onClick={async () => await loginWithRedirect()}
        >
          <LogIn className='w-4 h-4 mt-0.5 mr-2' /> Login
        </Button>
      )}
    </span>
  );
};
export default MainNav;
