import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const name = 'posts';

const initialState = {
  posts: null,
  status: 'idle',
  error: null,
};

export const getAllPosts = createAsyncThunk(
  'posts/getAllPosts',
  async ({ token }, thunkAPI) => {
    try {
      const { data, status } = await axios.get('posts', {
        headers: { authorization: token },
      });
      if (status === 200) {
        return { posts: data.posts.reverse() };
      }
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue({
        error: {
          message: 'Failed to fetch posts',
          errorMessage: error.message,
        },
      });
    }
  }
);

export const createNewPost = createAsyncThunk(
  'posts/createNewPost',
  async ({ token, content }, thunkAPI) => {
    try {
      const { data, status } = await axios.post(
        'posts',
        { content },
        { headers: { authorization: token } }
      );
      if (status === 200) {
        return { posts: data.posts.reverse() };
      }
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue({
        error: {
          message: 'Failed to create new post',
          errorMessage: error.message,
        },
      });
    }
  }
);

export const editPostContent = createAsyncThunk(
  'posts/editPostContent',
  async ({ token, postId, content }, thunkAPI) => {
    try {
      const { data, status } = await axios.post(
        `posts/${postId}`,
        { content },
        { headers: { authorization: token } }
      );
      if (status === 200) {
        return { posts: data.posts.reverse() };
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({
        error: {
          message: 'Failed to edit the post',
          errorMessage: error.message,
        },
      });
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async ({ token, postId }, thunkAPI) => {
    try {
      const { data, status } = await axios.delete(`posts/${postId}`, {
        headers: { authorization: token },
      });
      if (status === 200) {
        return { posts: data.posts.reverse() };
      }
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue({
        error: {
          message: 'Failed to delete the post',
          errorMessage: error.message,
        },
      });
    }
  }
);

export const likePost = createAsyncThunk(
  'posts/likePost',
  async ({ token, postId }, thunkAPI) => {
    try {
      const { data, status } = await axios.post(
        `posts/${postId}/like`,
        {},
        {
          headers: { authorization: token },
        }
      );
      if (status === 200) {
        return { posts: data.posts.reverse() };
      }
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue({
        error: {
          message: 'Failed to like the post',
          errorMessage: error.message,
        },
      });
    }
  }
);

export const dislikePost = createAsyncThunk(
  'posts/dislikePost',
  async ({ token, postId }, thunkAPI) => {
    try {
      const { data, status } = await axios.post(
        `posts/${postId}/dislike`,
        {},
        {
          headers: { authorization: token },
        }
      );
      if (status === 200) {
        return { posts: data.posts.reverse() };
      }
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue({
        error: {
          message: 'Failed to like the post',
          errorMessage: error.message,
        },
      });
    }
  }
);

const postsSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers(builder) {
    // GET_ALL_POSTS
    builder.addCase(getAllPosts.pending, (state) => {
      state.error = null;
      state.status = 'pending';
    });
    builder.addCase(getAllPosts.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.posts = payload.posts;
    });
    builder.addCase(getAllPosts.rejected, (state, { payload }) => {
      state.status = 'failed';
      state.error = payload.error;
    });

    // CREATE_NEW_POST
    builder.addCase(createNewPost.pending, (state) => {
      state.error = null;
    });
    builder.addCase(createNewPost.fulfilled, (state, { payload }) => {
      state.posts = payload.posts;
    });
    builder.addCase(createNewPost.rejected, (state, { payload }) => {
      state.error = payload.error;
    });

    // EDIT_POST_CONTENT
    builder.addCase(editPostContent.pending, (state) => {
      state.error = null;
    });
    builder.addCase(editPostContent.fulfilled, (state, { payload }) => {
      state.posts = payload.posts;
    });
    builder.addCase(editPostContent.rejected, (state, { payload }) => {
      state.error = payload.error;
    });

    // DELETE_POST
    builder.addCase(deletePost.pending, (state) => {
      state.error = null;
    });
    builder.addCase(deletePost.fulfilled, (state, { payload }) => {
      state.posts = payload.posts;
    });
    builder.addCase(deletePost.rejected, (state, { payload }) => {
      state.error = payload.error;
    });

    // LIKE_POST
    builder.addCase(likePost.pending, (state) => {
      state.error = null;
    });
    builder.addCase(likePost.fulfilled, (state, { payload }) => {
      state.posts = payload.posts;
    });
    builder.addCase(likePost.rejected, (state, { payload }) => {
      state.error = payload.error;
    });

    // DISLIKE_POST
    builder.addCase(dislikePost.pending, (state) => {
      state.error = null;
    });
    builder.addCase(dislikePost.fulfilled, (state, { payload }) => {
      state.posts = payload.posts;
    });
    builder.addCase(dislikePost.rejected, (state, { payload }) => {
      state.error = payload.error;
    });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostsServiceStatus = (state) => state.posts.status;

export const postsReducer = postsSlice.reducer;
