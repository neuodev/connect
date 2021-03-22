const User = ({ children, friend }) => {
  const { user } = friend;
  return (
    <div className='flex items-center justify-between space-x-3 rounded-md px-2 hover:bg-gray-200 transition-colors duration-100 cursor-pointer mb-1'>
      <img
        className='h-12 w-12 rounded-full'
        src='./images/hero.jpg'
        alt='UserName'
      />
      <div className='my-2 py-1  w-full '>
        <h1 className='font-medium leading-tight text-gray-800'>
          {user.username}
        </h1>
        <p className='text-gray-500 text-sm'>How Are You??</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default User;
