import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  users: [],
  query: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    update: (state, action) => {
      state.users = action.payload.users;
      state.query = action.payload.query;
    },
    clear: (state) => {
      state.users = [];
      state.query = '';
    },
  },
});

export const { update, clear } = searchSlice.actions;

export const selectSearchResults = ({search}) => search.users;
export const selectQuery = ({search}) => search.query;

export const searchUsers = (dispatch) => async (query) => {
  try {
    const res = await axios({
      method: 'get',
      url: `/search_users?query=${query}`,
      withCredentials: true,
    })
    dispatch(update({
      users: res.data,
      query: query,
    }));
    return null;
  } catch (err) {
    dispatch(clear());
    return err.response.data;
    }
};

export default searchSlice.reducer;
