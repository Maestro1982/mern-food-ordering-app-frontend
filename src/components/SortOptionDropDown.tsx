import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Props = {
  onChange: (value: string) => void;
  sortOption: string;
};

const SORT_OPTIONS = [
  {
    label: 'Best match',
    value: 'bestMatch',
  },
  {
    label: 'Delivery price',
    value: 'deliveryPrice',
  },
  {
    label: 'Estimated delivery time',
    value: 'estimatedDeliveryTime',
  },
];

const SortOptionDropDown = ({ onChange, sortOption }: Props) => {
  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
    SORT_OPTIONS[0].label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='cursor-pointer'>
        <Button variant='outline' className='w-full'>
          Sorted By: {selectedSortLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className='cursor-pointer'
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default SortOptionDropDown;
