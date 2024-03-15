import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  return (
    <>
      <Link
        to='/user-profile'
        className='flex bg-white items-center font-bold hover:text-orange-500'
      >
        User Profile
      </Link>
      <Separator />
      <Button
        onClick={() => logout()}
        className='flex items-center px-3 font-bold bg-orange-500'
      >
        Logout
      </Button>
    </>
  );
};
export default MobileNavLinks;
