import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { formFieldsFilled } from '@src/libs';
import { Spinner, Modal, Post } from '@src/components';

import {
  selectUserDetails,
  selectUserServiceStatus,
  showModal,
  hideModal,
  updateUserDetails,
  selectToken,
  selectUserPosts,
  selectAllPosts,
  getUser,
} from '@src/features';

export const Profile = () => {
  const [editFormData, setEditFormData] = useState({
    firstname: '',
    lastname: '',
    bio: '',
  });

  const userServiceStatus = useSelector(selectUserServiceStatus);
  const userDetails = useSelector(selectUserDetails);
  const userPosts = useSelector(selectUserPosts);
  const allposts = useSelector(selectAllPosts);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const firstname = userDetails?.firstname;
  const lastname = userDetails?.lastname;
  const fullname = `${firstname} ${lastname}`;
  const email = userDetails?.email;
  const bio = userDetails?.bio;

  const isFormReadyToSubmit =
    formFieldsFilled(editFormData) &&
    Object.entries(editFormData).some(([field, fieldValue]) => {
      if (userDetails) {
        return userDetails[field].trim() !== fieldValue.trim();
      }
      return false;
    });

  const inputChangeHandler = (e) => {
    setEditFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const editBtnClickHandler = () => {
    setEditFormData({ firstname, lastname, bio });
    dispatch(showModal());
  };

  const editFormSubmitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateUserDetails({ token, editFormData }));
    dispatch(hideModal());
  };

  useEffect(() => {
    dispatch(getUser({ token }));
  }, [allposts]);

  if (userServiceStatus === 'pending') {
    return <Spinner />;
  }

  return (
    <div className='max-w-xl mx-auto px-1'>
      <Modal>
        <form onSubmit={editFormSubmitHandler} className='p-2'>
          <h2 className='text-2xl font-semibold text-center m-4'>
            Edit your profile
          </h2>
          <div className='flex gap-x-2'>
            <label className='mb-2 flex flex-col grow' htmlFor='firstname'>
              <span className='mb-1 font-medium'>First Name</span>
              <input
                onChange={inputChangeHandler}
                className='p-1.5 outline-none border-2  border-slate-400 focus:border-slate-800 rounded w-full'
                type='text'
                value={editFormData.firstname}
                name='firstname'
                id='firstname'
                placeholder='Enter your firstname'
                autoFocus
                required
              />
            </label>
            <label className='mb-2 flex flex-col grow' htmlFor='lastname'>
              <span className='mb-1 font-medium'>Last Name</span>
              <input
                onChange={inputChangeHandler}
                className='p-1.5 outline-none border-2  border-slate-400 focus:border-slate-800 rounded w-full'
                type='text'
                value={editFormData.lastname}
                name='lastname'
                id='lastname'
                placeholder='Enter your lastname'
                required
              />
            </label>
          </div>
          <label className='mb-2 flex flex-col' htmlFor='bio'>
            <span className='mb-1 font-medium'>Bio</span>
            <input
              onChange={inputChangeHandler}
              className='p-1.5 outline-none border-2  border-slate-400 focus:border-slate-800 rounded w-full'
              type='text'
              value={editFormData.bio}
              name='bio'
              id='bio'
              placeholder='Enter you bio'
              required
            />
          </label>
          <div className='flex items-center justify-end'>
            <button
              className=' bg-slate-600 py-1 px-4 rounded text-white disabled:bg-slate-200 disabled:cursor-not-allowed'
              disabled={!isFormReadyToSubmit}
            >
              Save
            </button>
            <button
              onClick={() => dispatch(hideModal())}
              className=' ml-2 my-2 bg-slate-200 py-1 px-4 rounded '
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
      <div className='flex items-start my-2 p-4 border rounded-xl'>
        <img
          className='rounded-full bg-slate-100 w-20 h-20'
          src='https://getbinks.com/_next/static/media/large-logo.ee207193.svg'
          alt='user avatar'
        />
        <div className='ml-4 mt-2'>
          <h2 className='text-lg -mb-1'>{fullname}</h2>
          <p className='text-slate-500 text-sm'>{email}</p>
          <p className='text-slate-700 text-sm mt-1'>{bio}</p>
        </div>
        <button
          onClick={editBtnClickHandler}
          className='ml-auto bg-slate-600 text-white py-1 px-4 rounded'
        >
          Edit
        </button>
      </div>
      <div className='py-2 mb-2'>
        <h2 className='text-center text-md my-4'>Manage posts</h2>
        {userPosts &&
          userPosts.map((post) => <Post key={post._id} post={post} />)}
        {userPosts && userPosts.length === 0 && (
          <p className='text-center'>no posts found :(</p>
        )}
      </div>
    </div>
  );
};
