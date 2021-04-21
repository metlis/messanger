import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import {getConversations} from "./conversations";
import socket from "../socket";

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

export const loginUser = (history, dispatch, nextPage={}) => async (email, password) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/login',
      data: {email, password},
      withCredentials: true,
    })
    dispatch(update(res.data));
    socket.connect();
    await getConversations(dispatch)();
    if (nextPage.success) history.push(nextPage.success);
    return null;
  } catch (err) {
    if (nextPage.error) history.push(nextPage.error);
    return err.response.data;
    }
};

export const registerUser = (history, dispatch, nextPage={}) => async (username, email, password) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/register',
      data: {username, email, password},
      withCredentials: true,
    });
    dispatch(update(res.data));
    if (nextPage.success) history.push(nextPage.success);
    socket.connect();
    return null;
  } catch (err) {
    if (nextPage.error) history.push(nextPage.error);
    return err.response.data;
  }
};

export const logoutUser = (history, dispatch, nextPage={}) => async () => {
  try {
    socket.disconnect();
    await axios({
      method: 'post',
      url: '/logout',
      withCredentials: true,
    });
    dispatch(clear());
    if (nextPage.success) history.push(nextPage.success);
    return null;
  } catch (err) {
    if (nextPage.error) history.push(nextPage.error);
    return err.response.data;
  }
}

export const getUserData = (history, dispatch, nextPage={}) => async () => {
  try {
    const res = await axios({
      method: 'get',
      url: '/user',
      withCredentials: true,
    })
    dispatch(update(res.data));
    socket.connect();
    if (nextPage.success) history.push(nextPage.success);
    return null;
  } catch (err) {
    if (nextPage.error) history.push(nextPage.error);
    return err.response.data;
    }
};

export default userSlice.reducer;
