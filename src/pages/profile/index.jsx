import { useSelector } from 'react-redux';
import { selectUserDetails, selectUserServiceStatus } from '@src/features';
import { Spinner } from '/src/components';

export const Profile = () => {
  const userServiceStatus = useSelector(selectUserServiceStatus);
  const userDetails = useSelector(selectUserDetails);
  const firstname = userDetails?.firstname;
  const lastname = userDetails?.lastname;
  const fullname = `${firstname} ${lastname}`;
  const email = userDetails?.email;
  const bio = userDetails?.bio;

  if (userServiceStatus === 'pending') {
    return <Spinner />;
  }

  return (
    <div className='min-w-fit	max-w-xl mx-auto px-1'>
      <div className='flex items-start my-2 p-4 border rounded-xl'>
        <img
          className='rounded-full bg-slate-100 w-20 h-20'
          src='https://getbinks.com/_next/static/media/large-logo.ee207193.svg'
          alt='user avatar'
        />
        <div className='ml-4 mt-2'>
          <h2 className='text-lg -mb-1'>{fullname}</h2>
          <p className='text-slate-500 text-sm'>{email}</p>
          <p className='text-slate-700 text-sm'>{bio}</p>
        </div>
        <button className='ml-auto bg-slate-300 py-1 px-4 rounded'>Edit</button>
      </div>
      <h2 className='text-center text-md my-4'>Manage posts</h2>
    </div>
  );
};
