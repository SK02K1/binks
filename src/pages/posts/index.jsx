import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Post } from '@src/components';

import {
  createNewPost,
  getAllPosts,
  selectAllPosts,
  selectPostsServiceStatus,
  selectToken,
} from '@src/features';

export const Posts = () => {
  const [isPosting, setIsPosting] = useState(false);
  const [content, setContent] = useState('');

  const postsServiceStatus = useSelector(selectPostsServiceStatus);
  const posts = useSelector(selectAllPosts);
  const token = useSelector(selectToken);

  const dispatch = useDispatch();

  const contentChangeHandler = (e) => {
    setContent(e.target.value);
  };

  const postSubmitHandler = async (e) => {
    e.preventDefault();
    setIsPosting(true);
    await dispatch(createNewPost({ token, content }));
    setIsPosting(false);
    setContent('');
  };

  useEffect(() => {
    dispatch(getAllPosts({ token }));
  }, []);

  if (postsServiceStatus === 'pending') {
    return <Spinner />;
  }

  return (
    <div className='max-w-xl mx-auto px-1'>
      <form onSubmit={postSubmitHandler}>
        <textarea
          onChange={contentChangeHandler}
          className='border mt-1 w-full p-2'
          name='content'
          id='content'
          value={content}
          cols='20'
          rows='5'
          placeholder='share your "dhamakedar" moments ✨'
        ></textarea>
        <div className='flex'>
          <button
            className='bg-slate-600 py-1 px-4 rounded ml-auto disabled:cursor-not-allowed disabled:bg-slate-100 text-white'
            disabled={content === '' || isPosting}
          >
            Post
          </button>
        </div>
      </form>
      {posts && (
        <div className='py-2'>
          {posts.map((post) => {
            return <Post post={post} key={post._id} />;
          })}
        </div>
      )}
    </div>
  );
};
