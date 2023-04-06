import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@src/features';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
