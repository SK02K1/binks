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
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostsServiceStatus = (state) => state.posts.status;

export const postsReducer = postsSlice.reducer;
