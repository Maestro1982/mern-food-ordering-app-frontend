import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Restaurant } from '@/types';

import DetailsSection from '@/forms/manage-restaurant-form/DetailsSection';
import CuisinesSection from '@/forms/manage-restaurant-form/CuisinesSection';
import MenuSection from '@/forms/manage-restaurant-form/MenuSection';
import ImageSection from '@/forms/manage-restaurant-form/ImageSection';

import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import LoadingButton from '@/components/LoadingButton';

const formSchema = z.object({
  restaurantName: z.string({
    required_error: 'restaurant name is required',
  }),
  city: z.string({
    required_error: 'city is required',
  }),
  country: z.string({
    required_error: 'country is required',
  }),
  deliveryPrice: z.coerce.number({
    required_error: 'delivery price is required',
    invalid_type_error: 'delivery price must be a valid number',
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: 'estimated delivery time is required',
    invalid_type_error: 'estimated delivery time must be a valid number',
  }),
  cuisines: z.array(z.string()).nonempty({
    message: 'please select at least one item',
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, 'name is required'),
      price: z.coerce.number().min(1, 'price is required'),
    })
  ),
  imageFile: z.instanceof(File, { message: 'image is required' }),
});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  restaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ restaurant, onSave, isLoading }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: '', price: 0 }],
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    const deliveryPriceFormatted = parseFloat(
      (restaurant.deliveryPrice / 100).toFixed(2)
    );

    const menuItemsFormatted = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseFloat((item.price / 100).toFixed(2)),
    }));

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedRestaurant);
  }, [form, restaurant]);

  /* When submitting: getting all the formData in plain old javascript object
     to convert it to multipart/form-data */
  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();

    formData.append('restaurantName', formDataJson.restaurantName);
    formData.append('city', formDataJson.city);
    formData.append('country', formDataJson.country);

    formData.append(
      'deliveryPrice',
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      'estimatedDeliveryTime',
      formDataJson.estimatedDeliveryTime.toString()
    );

    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });

    formData.append(`imageFile`, formDataJson.imageFile);

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 bg-gray-50 p-10 rounded-lg'
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type='submit'>Submit</Button>}
      </form>
    </Form>
  );
};
export default ManageRestaurantForm;
