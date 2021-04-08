import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    update: (state, action) => {
      state.userData = action.payload;
    },
    clear: (state) => {
      state.userData = {};
    },
  },
});

export const { update, clear } = userSlice.actions;

export const selectUser = ({user}) => user.userData;
export const noUserData = ({user}) => Object.keys(user.userData).length === 0;

export default userSlice.reducer;
