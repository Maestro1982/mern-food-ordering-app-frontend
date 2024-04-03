import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from '@/api/MyRestaurantApi';

import ManageRestaurantForm from '@/forms/manage-restaurant-form/ManageRestaurantForm';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import OrderItemCard from '@/components/OrderItemCard';

const ManageRestaurantPage = () => {
  const { createMyRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateMyRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();
  const { orders } = useGetMyRestaurantOrders();

  const isEditing = !!restaurant;

  return (
    <Tabs defaultValue='orders'>
      <TabsList>
        <TabsTrigger value='orders'>Orders</TabsTrigger>
        <TabsTrigger value='manage-restaurant'>Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value='orders'
        className='space-y-5 bg-gray-50 p-10 rounded-lg'
      >
        <h2 className='text-2xl font-bold'>
          {orders
            ? orders.length === 1
              ? '1 active order'
              : `${orders.length} active orders`
            : '0 active orders'}
        </h2>
        {orders?.map((order) => (
          <OrderItemCard key={order._id} order={order} />
        ))}
      </TabsContent>
      <TabsContent value='manage-restaurant'>
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={isEditing ? updateMyRestaurant : createMyRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};
export default ManageRestaurantPage;
