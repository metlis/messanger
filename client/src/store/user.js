import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

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

export const loginUser = (history, dispatch) => async (email, password) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/login',
      data: {email, password},
      withCredentials: true,
    })
    dispatch(update(res.data));
    history.push("/dashboard");
    return null;
  } catch (err) {
    return err.response.data;
    }
};

export const registerUser = (history, dispatch) => async (username, email, password) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/register',
      data: {username, email, password},
      withCredentials: true,
    });
    dispatch(update(res.data));
    history.push("/dashboard");
    return null;
  } catch (err) {
    return err.response.data;
  }
};

export const logoutUser = (history, dispatch) => async () => {
  try {
    await axios({
      method: 'post',
      url: '/logout',
      withCredentials: true,
    });
    dispatch(clear());
    history.push("/login");
    return null;
  } catch (err) {
    return err.response.data;
  }
}

export default userSlice.reducer;
