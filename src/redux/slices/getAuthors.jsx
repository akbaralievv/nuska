import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../config/api';

const api = API_URLS.authors;

export const getAuthors = createAsyncThunk('getAuthors', async () => {
  try {
    const response = await axios.get(api);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
  }
});

const initialState = {
  authors: [],
  loading: false,
  error: false,
};

const getAuthorsSlice = createSlice({
  name: 'getAuthors',
  initialState,
  reducers: {
    clearDataAuthors: (state, action) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthors.fulfilled, (state, action) => {
      state.authors = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getAuthors.pending, (state) => {
      state.authors = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getAuthors.rejected, (state, action) => {
      state.authors = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearDataAuthors } = getAuthorsSlice.actions;
export default getAuthorsSlice.reducer;
