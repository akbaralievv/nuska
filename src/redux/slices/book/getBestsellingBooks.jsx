import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../../config/api';

const api = API_URLS.bestselling;

export const getBestsellingBooks = createAsyncThunk(
  'getBestsellingBooks',
  async (jenre_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(api + `${jenre_id ? '?jenre_id=' + jenre_id : ''}`);
      const data = response.data;
      return data;
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
  loading: false,
  error: false,
};

const getBestsellingBooksSlice = createSlice({
  name: 'getBestsellingBooks',
  initialState,
  reducers: {
    clearDataBestsellingBooks: (state, action) => {
      state.data = [];
    },
  },
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

export const { clearDataBestsellingBooks } = getBestsellingBooksSlice.actions;
export default getBestsellingBooksSlice.reducer;
