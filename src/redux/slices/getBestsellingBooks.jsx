import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../config/api';

const api = API_URLS.bestselling;

export const getBestsellingBooks = createAsyncThunk('getBestsellingBooks', async () => {
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
  }
});

const initialState = {
  data: [],
  loading: false,
  error: false,
};

const getBestsellingBooksSlice = createSlice({
  name: 'getBestsellingBooks',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getBestsellingBooks.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getBestsellingBooks.pending, (state) => {
      state.data = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getBestsellingBooks.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getBestsellingBooksSlice.reducer;
