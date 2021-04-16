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
    addConversation: (state, action) => {
      state.list.push(action.payload);
    },
    clearConversations: (state) => {
      state.list = [];
      state.active = {};
    },
    addMessages: (state, action) => {
      const conversation = state.list.find(i => i.id === action.payload.id);
      if (conversation) {
        conversation.messages = action.payload.messages;
        conversation.username = action.payload.username;
      }
    },
    addMessage: (state, action) => {
      state.active.messages.push(action.payload);
      const conversation = state.list.find(i => i.id === state.active.id);
      if (conversation) {
        conversation.messages = state.active.messages;
        conversation.last_message = action.payload;
      }
    }
  },
});

export const {
  updateConversationsList,
  updateActiveConversation,
  clearConversations,
  addConversation,
  addMessages,
  addMessage
} = conversationsSlice.actions;

export const selectConversations = ({conversations}) => conversations.list;
export const selectActiveConversation = ({conversations}) => conversations.active;

export const createConversation = () => async (interlocutor_id) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/conversations',
      withCredentials: true,
      data: {interlocutor_id},
    })
    return res.data;
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
    return res.data;
  } catch (err) {
    return err.response.data;
    }
};

export const setConversation = (dispatch) => async (id, username, conversations) => {
  const conversation = conversations.find(i => i.id === id) || {};
  if (conversation.messages) {
    dispatch(updateActiveConversation(conversation));
  } else {
    try {
      const res = await axios({
        method: 'get',
        url: `/conversations/${id}/messages`,
        withCredentials: true,
      })
      const payload = {
        ...conversation,
        username,
        messages: res.data,
      }
      dispatch(updateActiveConversation(payload));
      dispatch(addMessages(payload));
    } catch (err) {
      return err.response.data;
      }
  }
};

export const createMessage = (dispatch) => async (id, text) => {
  try {
    const res = await axios({
      method: 'post',
      url: `/conversations/${id}/messages`,
      withCredentials: true,
      data: {text},
    })
    dispatch(addMessage(res.data));
    return res.data;
  } catch (err) {
    return err.response.data;
    }
};

export const markMessagesRead = async (id) => {
  try {
    await axios({
      method: 'post',
      url: `/conversations/${id}/messages/mark_as_read`,
      withCredentials: true,
    })
    return null;
  } catch (err) {
    return err.response.data;
    }
};

export const getNewConversationId = (interlocutorId) => async (dispatch, getState) => {
  const conversation = await createConversation()(interlocutorId);
  dispatch(addConversation(conversation));
  const conversations = selectConversations(getState());
  return [conversations, conversation.id]
};

export default conversationsSlice.reducer;
