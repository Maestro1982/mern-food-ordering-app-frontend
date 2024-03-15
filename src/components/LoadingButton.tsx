import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

const LoadingButton = () => {
  return (
    <Button disabled>
      <Loader2 className='h-4 w-4 mr-2 animate-spin' />
      Please wait
    </Button>
  );
};
export default LoadingButton;
