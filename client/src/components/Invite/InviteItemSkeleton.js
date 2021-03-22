import { Skeleton } from '@material-ui/lab';
import React from 'react';

const arr = [1, 2, 3, 4, 5];

const InviteItemSkeleton = () => {
  return (
    <div>
      {arr.map(item => (
        <div key={item} className='flex items-center space-x-4  mb-4 '>
          <div>
            <Skeleton variant='circle' width={40} height={40} />
          </div>
          <div className='w-32'>
            <Skeleton variant='text' />
            <Skeleton variant='text' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default InviteItemSkeleton;
