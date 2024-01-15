import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../../config/api';

const api = API_URLS.newbooks;

export const getNewbooks = createAsyncThunk('getNewbooks', async () => {
  try {
    const response = await axios.get(api);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching Newbooks:', error);
  }
});

const initialState = {
  data: [],
  info: null,
  loading: false,
  error: false,
};

const getNewbooksSlice = createSlice({
  name: 'NewbooksSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getNewbooks.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getNewbooks.pending, (state) => {
      state.data = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getNewbooks.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getNewbooksSlice.reducer;
