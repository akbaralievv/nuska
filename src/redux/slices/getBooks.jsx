import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../config/api';

const api = API_URLS.library + '/book_list';

axios.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data.results;
    }
    throw new Error('No data in response');
  },
  (error) => {
    throw new Error(`Error ${error.response.status}`);
  },
);

export const getBooks = createAsyncThunk('getBooks', async () => {
  return await axios.get(api);
});

const initialState = {
  data: [],
  loading: false,
  error: false,
};

const getBooksSlice = createSlice({
  name: 'getBooks',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getBooks.pending, (state) => {
      state.data = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getBooks.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getBooksSlice.reducer;
