import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
} from '@/api/MyRestaurantApi';

import ManageRestaurantForm from '@/forms/manage-restaurant-form/ManageRestaurantForm';

const ManageRestaurantPage = () => {
  const { createMyRestaurant, isLoading } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();

  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={createMyRestaurant}
      isLoading={isLoading}
    />
  );
};
export default ManageRestaurantPage;
