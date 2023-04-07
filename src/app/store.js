import { configureStore } from '@reduxjs/toolkit';

import {
  authReducer,
  userReducer,
  modalReducer,
  postsReducer,
} from '@src/features';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    modal: modalReducer,
    posts: postsReducer,
  },
});
