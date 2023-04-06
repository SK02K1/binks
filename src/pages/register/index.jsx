import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  register,
  selectAuthServiceError,
  selectAuthServiceStatus,
  selectToken,
} from '@src/features';
import { defaultRegisterFormData } from '@src/constants';
import { formFieldsFilled } from '@src/libs';

export const Register = () => {
  const [formData, setFormData] = useState(defaultRegisterFormData);
  const authServiceStatus = useSelector(selectAuthServiceStatus);
  const error = useSelector(selectAuthServiceError);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const { firstname, lastname, email, password, confirmPassword } = formData;

  const from = location?.state?.from?.pathname || '/';

  const isFormReadyToSubmit =
    formFieldsFilled(formData) && password === confirmPassword;

  const inputChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const userData = { firstname, lastname, email, password };
    dispatch(register({ userData }));
  };

  if (token) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className='h-screen w-screen	flex justify-center	items-center text-slate-700'>
      <form
        onSubmit={formSubmitHandler}
        className='sm:w-2/3 md:w-1/2 lg:w-1/3 px-8 py-4 m-4 rounded-2xl'
      >
        <h1 className='text-2xl font-semibold text-center mb-8'>Signup</h1>
        {error && (
          <p className='text-red-500 text-center pb-2'>{error.errorMessage}</p>
        )}
        <div className='flex gap-x-2'>
          <label className='mb-2 flex flex-col grow' htmlFor='firstname'>
            <span className='mb-1 font-medium'>First Name</span>
            <input
              onChange={inputChangeHandler}
              className='p-1.5 outline-none border-2  border-slate-400 focus:border-slate-800 rounded w-full'
              type='text'
              value={firstname}
              name='firstname'
              id='firstname'
              placeholder='Tanay'
              required
            />
          </label>
          <label className='mb-2 flex flex-col grow' htmlFor='lastname'>
            <span className='mb-1 font-medium'>Last Name</span>
            <input
              onChange={inputChangeHandler}
              className='p-1.5 outline-none border-2  border-slate-400 focus:border-slate-800 rounded w-full'
              type='text'
              value={lastname}
              name='lastname'
              id='lastname'
              placeholder='Pratap'
              required
            />
          </label>
        </div>
        <label className='mb-2 flex flex-col' htmlFor='email'>
          <span className='mb-1 font-medium'>Email</span>
          <input
            onChange={inputChangeHandler}
            className='p-1.5 outline-none border-2  border-slate-400 focus:border-slate-800 rounded w-full'
            type='email'
            value={email}
            name='email'
            id='email'
            placeholder='tanay@neog.com'
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
        <label className='mb-2 flex flex-col' htmlFor='confirm-password'>
          <span className='mb-1 font-medium'>Confirm Password</span>
          <input
            onChange={inputChangeHandler}
            className='p-1.5 outline-none border-2  border-slate-400 focus:border-slate-800 rounded w-full'
            type='text'
            value={confirmPassword}
            name='confirmPassword'
            id='confirm-password'
            placeholder='Re-enter your password'
            required
          />
        </label>
        <button
          className='w-full px-4 py-2 my-4 block rounded mx-auto bg-slate-600 text-white disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors'
          disabled={!isFormReadyToSubmit || authServiceStatus === 'pending'}
        >
          Create new account
        </button>

        <Link
          className='block w-fit mx-auto my-2 border-b border-slate-400'
          to='/login'
        >
          Already have an account? Sign in
        </Link>
      </form>
    </div>
  );
};
