import { Skeleton } from '@material-ui/lab';
import React from 'react';

const FriendSkeleton = () => {
  return (
    <div className='flex space-x-2 mb-4'>
      <Skeleton variant='circle' width={40} height={40} />
      <div className='w-full'>
        <div className='flex justify-between w-full '>
          <Skeleton variant='text' width={100} height={20} />
          <Skeleton variant='text' width={40} height={20} />
        </div>
        <div className='w-full flex items-center justify-between'>
          <Skeleton variant='text' width={170} height={20} />
          <Skeleton variant='text' width={50} height={20} />
        </div>
      </div>
    </div>
  );
};

export default FriendSkeleton;
