import { Loader2 } from 'lucide-react';

import { useGetMyOrders } from '@/api/OrderApi';

import OrderStatusHeader from '@/components/OrderStatusHeader';
import OrderStatusDetail from '@/components/OrderStatusDetail';

import { AspectRatio } from '@/components/ui/aspect-ratio';

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();

  if (isLoading) {
    return (
      <div className='flex items-center justify-center mt-[25%]'>
        <Loader2 className='w-10 h-10 animate-spin' />
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return 'No orders found';
  }

  return (
    <div className='space-y-10'>
      {orders.map((order) => (
        <div key={order._id} className='space-y-10 bg-gray-50 p-10 rounded-lg'>
          <OrderStatusHeader order={order} />
          <div className='grid gap-10 md:grid-cols-2'>
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                alt='Restaurant Image'
                className='rounded-md object-cover h-full w-full'
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};
export default OrderStatusPage;
