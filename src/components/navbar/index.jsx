import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserDetails } from '@src/features';

export const Navbar = () => {
  const userDetails = useSelector(selectUserDetails);

  const firstname = userDetails?.firstname;
  const lastname = userDetails?.lastname;
  const fullname = `${firstname} ${lastname}`;

  return (
    <nav className='flex justify-between items-center p-4 border-b border-gray-300'>
      <Link to='/'>
        <img
          src='https://getbinks.com/_next/static/media/large-logo.ee207193.svg'
          alt='binks logo'
        />
      </Link>
      {userDetails && (
        <Link to='/profile' className='text-md text-slate-600 font-medium'>
          @{fullname}
        </Link>
      )}
    </nav>
  );
};
