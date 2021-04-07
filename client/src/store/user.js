import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
    clear: (state) => {
      state.value = {};
    },
  },
});

export const { update, clear } = userSlice.actions;

export const selectUser = (state) => state.user.value;
export const noUserData = (state) => Object.keys(state.user.value).length === 0;

export default userSlice.reducer;
