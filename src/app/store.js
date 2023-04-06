import { configureStore } from '@reduxjs/toolkit';
import { authReducer, userReducer } from '@src/features';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
