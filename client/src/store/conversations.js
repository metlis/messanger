import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  list: [],
  active: {},
};

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    updateConversationsList: (state, action) => {
      state.list = action.payload;
    },
    updateActiveConversation: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { updateConversationsList, updateActiveConversation } = conversationsSlice.actions;

export const selectConversations = ({conversations}) => conversations.list;
export const selectActiveConversation = ({conversations}) => conversations.active;

export const createConversation = () => async (interlocutor_id) => {
  try {
    await axios({
      method: 'post',
      url: '/conversations',
      withCredentials: true,
      data: {interlocutor_id},
    })
    return null;
  } catch (err) {
    return err.response.data;
    }
};

export const getConversations = (dispatch) => async () => {
  try {
    const res = await axios({
      method: 'get',
      url: '/conversations',
      withCredentials: true,
    })
    dispatch(updateConversationsList(res.data));
    return null;
  } catch (err) {
    return err.response.data;
    }
};

export const getConversation = (dispatch) => async (id, username) => {
  try {
    const res = await axios({
      method: 'get',
      url: `/conversations/${id}/messages`,
      withCredentials: true,
    })
    const payload = {
      id,
      username,
      messages: res.data,
    }
    dispatch(updateActiveConversation(payload));
    return null;
  } catch (err) {
    return err.response.data;
    }
};

export const createMessage = () => async (id, text) => {
  try {
    await axios({
      method: 'post',
      url: `/conversations/${id}/messages`,
      withCredentials: true,
      data: {text},
    })
    return null;
  } catch (err) {
    return err.response.data;
    }
};

export const markMessagesRead = async (id, messages) => {
  try {
    await axios({
      method: 'post',
      url: `/conversations/${id}/messages/mark_as_read`,
      withCredentials: true,
      data: {messages},
    })
    return null;
  } catch (err) {
    return err.response.data;
    }
};

export default conversationsSlice.reducer;
