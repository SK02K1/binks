import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const name = 'user';

const initialState = {
  details: null,
  posts: null,
  status: 'idle',
};

export const getUser = createAsyncThunk(
  'user/getUser',
  async ({ token }, thunkAPI) => {
    try {
      const { data, status } = await axios.get('user', {
        headers: { authorization: token },
      });
      if (status === 200) {
        const { user, posts } = data;
        return { user: { details: user, posts } };
      }
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue({
        error: {
          message: 'Failed to get user',
          errorMessage: error.response.data.message,
        },
      });
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  'user/updateUserDetails',
  async ({ token, editFormData }, thunkAPI) => {
    try {
      const { data, status } = await axios.post(
        'user',
        { ...editFormData },
        { headers: { authorization: token } }
      );
      if (status === 200) {
        const { user: details, posts } = data;
        return {
          user: {
            details,
            posts,
          },
        };
      }
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue({
        error: {
          message: 'Failed to update user details',
          errorMessage: error.response.data.message,
        },
      });
    }
  }
);

const userSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers(builder) {
    // GET_USER
    builder.addCase(getUser.pending, (state) => {
      state.error = null;
      state.status = 'pending';
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.error = null;
      state.status = 'succeeded';
      state.details = payload.user.details;
      state.posts = payload.user.posts;
    });
    builder.addCase(getUser.rejected, (state, { payload }) => {
      state.error = payload.error;
      state.status = 'failed';
    });

    // UPDATE_USER_DETAILS
    builder.addCase(updateUserDetails.pending, (state) => {
      state.error = null;
      state.status = 'pending';
    });
    builder.addCase(updateUserDetails.fulfilled, (state, { payload }) => {
      state.error = null;
      state.status = 'succeeded';
      state.details = payload.user.details;
      state.posts = payload.user.posts;
    });
    builder.addCase(updateUserDetails.rejected, (state, { payload }) => {
      state.error = payload.error;
      state.status = 'failed';
    });
  },
});

export const selectUserServiceStatus = (state) => state.user.status;
export const selectUserDetails = (state) => state.user.details;
export const selectUserPosts = (state) => state.user.posts;

export const userReducer = userSlice.reducer;
