import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../../config/api';
import { api } from '../../../components/helpers/interceptors';

const api_url = API_URLS.favoriteBooks;

export const getFavoriteBooks = createAsyncThunk(
  'getFavoriteBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(api_url);
      const data = response.data;
      return data.user;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue('Белгисиз ката кетти');
    }
  },
);

const initialState = {
  data: [],
  info: null,
  loading: false,
  error: false,
};

const getFavoriteBooksSlice = createSlice({
  name: 'getFavoriteBooks',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getFavoriteBooks.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getFavoriteBooks.pending, (state) => {
      state.data = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getFavoriteBooks.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getFavoriteBooksSlice.reducer;
