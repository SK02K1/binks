import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Comment, Edit, Trash, Modal } from '@src/components';

import {
  selectModalVisibilityState,
  selectUserDetails,
  showModal,
  hideModal,
  editPostContent,
  selectToken,
  deletePost,
} from '@src/features';

export const Post = ({ post }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const modalVisibilityState = useSelector(selectModalVisibilityState);
  const userDetails = useSelector(selectUserDetails);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const { user, content } = post;
  const { firstname, lastname } = user;
  const isMyPost = post.user._id === userDetails?._id;
  const isEditFormReadyToSubmit =
    editedContent.trim() !== '' && editedContent.trim() !== content;

  const editBtnClickHandler = () => {
    setEditedContent(content);
    setShowEditModal(true);
    dispatch(showModal());
  };

  const trashBtnClickHandler = () => {
    dispatch(deletePost({ token, postId: post._id }));
  };

  const editContentFormSubmitHandler = async (e) => {
    e.preventDefault();
    setIsEditing(true);
    await dispatch(
      editPostContent({ token, postId: post._id, content: editedContent })
    );
    setIsEditing(false);
    dispatch(hideModal());
  };

  useEffect(() => {
    if (modalVisibilityState === false) {
      setShowEditModal(false);
    }
  }, [modalVisibilityState]);

  return (
    <>
      {showEditModal && (
        <Modal>
          <form onSubmit={editContentFormSubmitHandler} className='p-2'>
            <h2 className='text-2xl font-semibold text-center m-4'>
              Edit Post
            </h2>
            <textarea
              onChange={(e) => setEditedContent(e.target.value)}
              className='border mt-1 w-full p-2'
              name='content'
              id='content'
              value={editedContent}
              cols='20'
              rows='5'
              placeholder='Update post content'
            ></textarea>
            <div className='flex items-center justify-end'>
              <button
                className=' bg-slate-600 py-1 px-4 rounded text-white disabled:bg-slate-200 disabled:cursor-not-allowed'
                disabled={!isEditFormReadyToSubmit || isEditing}
              >
                Save
              </button>
              <button
                onClick={() => dispatch(hideModal())}
                type='button'
                className=' ml-2 my-2 bg-slate-200 py-1 px-4 rounded '
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
      <div className='py-4 px-8 border-b hover:bg-sky-50'>
        <div className='flex items-center'>
          <img
            className='rounded-full bg-slate-200 w-12 h-12 border-2	 border-slate-300'
            src='https://getbinks.com/_next/static/media/large-logo.ee207193.svg'
            alt='user avatar'
          />
          <h2 className='text-md ml-2'>
            {firstname} {lastname}
          </h2>
        </div>
        <p className='py-4'>{content}</p>
        <div className='flex items-center'>
          <div className='cursor-pointer p-1 mr-2'>
            <Heart />
          </div>
          <div className='cursor-pointer p-1'>
            <Comment />
          </div>
          {isMyPost && (
            <div className='flex items-center ml-auto p-1'>
              <div onClick={editBtnClickHandler} className='cursor-pointer p-1'>
                <Edit />
              </div>
              <div
                onClick={trashBtnClickHandler}
                className='cursor-pointer p-1 ml-2'
              >
                <Trash />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
