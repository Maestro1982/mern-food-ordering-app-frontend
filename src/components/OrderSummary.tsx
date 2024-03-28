import { Trash } from 'lucide-react';

import { Restaurant } from '@/types';

import { CartItem } from '@/pages/DetailPage';

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
  const getTotalCost = () => {
    const totalInCent = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalWithDeliveryCost = totalInCent + restaurant.deliveryPrice;

    return (totalWithDeliveryCost / 100).toFixed(2);
  };
  return (
    <>
      <CardHeader>
        <CardTitle className='text-2xl font-bold tracking-tight flex justify-between'>
          <span>Your Order</span>
          <span>€{getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-5'>
        {cartItems.map((item) => (
          <div key={item._id} className='flex justify-between'>
            <span>
              <Badge variant='outline' className='mr-2'>
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className='flex items-center gap-1'>
              <Trash
                className='cursor-pointer'
                color='red'
                size={20}
                onClick={() => removeFromCart(item)}
              />
              €{((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className='flex justify-between'>
          <span>Delivery</span>
          <span>€{(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};
export default OrderSummary;
