import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../../config/api';

const api = API_URLS.recommendedBooks;

export const getRecommendedBooks = createAsyncThunk(
  'getRecommendedBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(api);
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
  info: null,
  loading: false,
  error: false,
};

const getRecommendedBooksSlice = createSlice({
  name: 'RecommendedBooksSlice',
  initialState,
  reducers: {
    clearDataRecommended: (state, action) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRecommendedBooks.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getRecommendedBooks.pending, (state) => {
      state.data = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getRecommendedBooks.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearDataRecommended } = getRecommendedBooksSlice.actions;
export default getRecommendedBooksSlice.reducer;
