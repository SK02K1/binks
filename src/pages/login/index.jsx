import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { defaultLoginFormData, testCredentials } from '@src/constants';
import { formFieldsFilled } from '@src/libs';

import {
  login,
  selectAuthServiceError,
  selectAuthServiceStatus,
  selectToken,
} from '@src/features';

export const Login = () => {
  const [formData, setFormData] = useState(defaultLoginFormData);
  const authServiceStatus = useSelector(selectAuthServiceStatus);
  const error = useSelector(selectAuthServiceError);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const location = useLocation();

  const { email, password } = formData;
  const from = location?.state?.from?.pathname || '/';
  const isFormReadyToSubmit = formFieldsFilled(formData);

  const inputChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const testCredentialsHandler = () => {
    setFormData(testCredentials);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login({ userData }));
  };

  if (token) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center text-slate-700'>
      <form
        onSubmit={formSubmitHandler}
        className='sm:w-2/3 md:w-1/2 lg:w-1/3 px-8 py-4 m-4 rounded-2xl'
      >
        <h1 className='text-2xl font-semibold text-center mb-8'>Login</h1>
        {error && (
          <p className='text-red-500 text-center pb-2'>{error.errorMessage}</p>
        )}
        <label className='mb-2 flex flex-col' htmlFor='email'>
          <span className='mb-1 font-medium'>Email</span>
          <input
            onChange={inputChangeHandler}
            className='p-1.5 outline-none border-2  border-slate-400 focus:border-slate-800 rounded w-full'
            type='email'
            value={email}
            name='email'
            id='email'
            placeholder='Enter your email'
            required
          />
        </label>
        <label className='mb-2 flex flex-col' htmlFor='password'>
          <span className='mb-1 font-medium'>Password</span>
          <input
            onChange={inputChangeHandler}
            className='p-1.5 outline-none border-2  border-slate-400 focus:border-slate-800 rounded w-full'
            type='text'
            value={password}
            name='password'
            id='password'
            placeholder='Enter your password'
            required
          />
        </label>
        <button
          className='w-full px-4 py-2 my-4 block rounded mx-auto bg-slate-600 text-white disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors'
          disabled={!isFormReadyToSubmit || authServiceStatus === 'pending'}
        >
          Login
        </button>
        <button
          onClick={testCredentialsHandler}
          type='button'
          className='w-full px-4 py-2 my-4 block rounded mx-auto border border-slate-600 box-border'
        >
          Use test credentials
        </button>
        <Link
          className='block w-fit mx-auto my-2 border-b border-slate-400'
          to='/register'
        >
          Don't have an account? Create one now
        </Link>
      </form>
    </div>
  );
};
