import { Skeleton } from '@material-ui/lab';
import React from 'react';

const GroupUserSkeleton = () => {
  return (
    <div className='mb-2 '>
      <Skeleton variant='text' height={40} width={300} />
      <div className='flex items-center justify-start my-1'>
        <Skeleton variant='circle' height={25} width={25} />
        <Skeleton variant='circle' height={25} width={25} />
        <Skeleton variant='circle' height={25} width={25} />
      </div>
    </div>
  );
};

export default GroupUserSkeleton;
