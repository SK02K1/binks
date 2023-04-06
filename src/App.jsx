import { Route, Routes } from 'react-router-dom';
import { RequiresAuth } from './components';
import { Home, Register, Login } from './pages';

export const App = () => {
  return (
    <div className='App'>
      <Routes>
        {/* Public Routes */}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        {/* Private Routes */}
        <Route element={<RequiresAuth />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
};
