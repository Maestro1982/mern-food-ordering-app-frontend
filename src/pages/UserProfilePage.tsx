import { useGetMyUser, useUpdateMyUser } from '@/api/MyUserApi';

import UserProfileForm from '@/forms/user-profile-form/UserProfileForm';
import { Loader2 } from 'lucide-react';

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  if (isGetLoading) {
    return (
      <div className='flex items-center justify-center'>
        <Loader2 className='w-4 h-4 mr-2 animate-spin' />
        Loading
      </div>
    );
  }

  if (!currentUser) {
    return (
      <span className='flex items-center justify-center'>
        Unable to load user profile
      </span>
    );
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};
export default UserProfilePage;
