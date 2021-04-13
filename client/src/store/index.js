import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import conversationsReducer from "./conversations";
import searchReducer from "./search"


export const store = configureStore({
  reducer: {
    user: userReducer,
    conversations: conversationsReducer,
    search: searchReducer,
  },
});
