import { createSlice } from '@reduxjs/toolkit';

const name = 'modal';

const initialState = {
  modalVisibilityState: false,
};

const modalSlice = createSlice({
  name,
  initialState,
  reducers: {
    showModal: (state) => {
      state.modalVisibilityState = true;
    },
    hideModal: (state) => {
      state.modalVisibilityState = false;
    },
  },
});

export const selectModalVisibilityState = (state) =>
  state.modal.modalVisibilityState;

export const { showModal, hideModal } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
