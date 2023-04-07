import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUserDetails } from '@src/features';
import { Profile } from '@src/components';

export const Navbar = () => {
  const userDetails = useSelector(selectUserDetails);
  const dispatch = useDispatch();

  const logoutBtnClickHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className='flex justify-between items-center p-4 border-b border-gray-300'>
      <Link to='/'>
        <img
          src='https://getbinks.com/_next/static/media/large-logo.ee207193.svg'
          alt='binks logo'
        />
      </Link>
      {userDetails && (
        <div className='flex items-center'>
          <button
            onClick={logoutBtnClickHandler}
            className='my-2 bg-red-500 text-white py-1 px-4 rounded  '
          >
            Logout
          </button>
          <Link to='/profile' className='ml-4'>
            <Profile />
          </Link>
        </div>
      )}
    </nav>
  );
};
