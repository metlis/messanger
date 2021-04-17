import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import socket from "../socket";

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
      const toActive = state.active.id === action.payload.conversation;
      if (toActive) state.active.messages.push(action.payload.message);

      const conversation = state.list.find(i => i.id === action.payload.conversation);
      if (conversation) {
        if (conversation.messages) {
          conversation.messages.push(action.payload.message);
        }
        conversation.last_message = action.payload.message;
        if (!toActive) {
          conversation.unread_messages += 1;
          conversation.total_messages += 1;
        }
      }
    },
    updateUserStatus: (state, action) => {
      state.list.forEach(i => {
        const user = i.users.find(u => u.id === action.payload.id);
        if (user) {
          user.active = action.payload.active;
        }
      })
      const user = (state.active.users || []).find(i => i.id === action.payload.id);
      if (user) {
        user.active = action.payload.active;
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
  addMessage,
  updateUserStatus
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

export const startListener = () => (dispatch, getState) => {
  socket.on("message_created", arg => {
    dispatch(addMessage(JSON.parse(arg)));
  })
  socket.on("conversation_created", arg => {
    dispatch(addConversation(JSON.parse(arg)));
  })
  socket.on("user_logged_in", arg => {
    dispatch(updateUserStatus({...arg, ...{active: true}}))
  })
  socket.on("user_logged_out", arg => {
    dispatch(updateUserStatus({...arg, ...{active: false}}))
  })
}

export default conversationsSlice.reducer;
