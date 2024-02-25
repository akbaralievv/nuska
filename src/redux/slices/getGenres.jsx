import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../config/api';

const api = API_URLS.genres;

export const getGenres = createAsyncThunk('getGenres', async () => {
  try {
    const response = await axios.get(api);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
  }
});

const initialState = {
  jenres: [],
  loading: false,
  error: false,
};

const getGenresSlice = createSlice({
  name: 'getGenres',
  initialState,
  reducers: {
    clearDataGenres: (state, action) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.jenres = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getGenres.pending, (state) => {
      state.jenres = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getGenres.rejected, (state, action) => {
      state.jenres = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearDataGenres } = getGenresSlice.actions;
export default getGenresSlice.reducer;
