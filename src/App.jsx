import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Home, Register, Login, Posts, Profile } from './pages';
import { getUser, selectToken } from './features';
import { RequiresAuth } from './components';

export const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      dispatch(getUser({ token }));
    }
  }, [token]);

  return (
    <div className='App'>
      <Routes>
        {/* Public Routes */}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        {/* Private Routes */}
        <Route element={<RequiresAuth />}>
          <Route path='/' element={<Home />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
};
