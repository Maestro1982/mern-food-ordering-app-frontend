import { useLocation } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';

import { useGetMyUser } from '@/api/MyUserApi';

import UserProfileForm, {
  UserFormData,
} from '@/forms/user-profile-form/UserProfileForm';

import LoadingButton from '@/components/LoadingButton';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

  const { pathname } = useLocation();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className='bg-orange-500 flex-1'>
        Login to checkout
      </Button>
    );
  }

  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className='bg-orange-500 flex-1'>
          Go to checkout
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-[425px] md:max-w-[700px] bg-gray-50'>
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          title='Confirm Delivery Details'
          buttonText='Continue to payment'
        />
      </DialogContent>
    </Dialog>
  );
};
export default CheckoutButton;
