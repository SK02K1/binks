import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const name = 'auth';

const initialState = {
  token: localStorage.getItem('binks-token'),
  status: 'idle',
  error: null,
};

export const register = createAsyncThunk(
  'auth/register',
  async ({ userData }, thunkAPI) => {
    try {
      const { data, status } = await axios.post('auth/register', {
        ...userData,
      });
      if (status === 201) {
        const { token } = data;
        localStorage.setItem('binks-token', token);
        return { token };
      }
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue({
        error: {
          message: 'Failed to register',
          errorMessage: error.response.data.message,
        },
      });
    }
  }
);

const authSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers(builder) {
    // REGISTER
    builder.addCase(register.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.error = null;
      state.token = payload.token;
    });
    builder.addCase(register.rejected, (state, { payload }) => {
      state.status = 'failed';
      state.error = payload.error;
    });
  },
});

export const selectToken = (state) => state.auth.token;
export const selectAuthServiceStatus = (state) => state.auth.status;
export const selectAuthServiceError = (state) => state.auth.error;

export const authReducer = authSlice.reducer;
