import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../../config/api';
import { api } from '../../../components/helpers/interceptors';

const api_url = API_URLS.addFavoriteBook;

export const postFavoriteBook = createAsyncThunk(
  'postFavoriteBook',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post(api_url + '/' + id);
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

const postFavoriteBookSlice = createSlice({
  name: 'postFavoriteBook',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(postFavoriteBook.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(postFavoriteBook.pending, (state) => {
      state.data = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(postFavoriteBook.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default postFavoriteBookSlice.reducer;
