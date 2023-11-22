import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../config/api';

const api = API_URLS.library + '/jenre_list';

axios.interceptors.response.use(
  (response) => {
    if (response) {
      return response;
    }
    throw new Error('No data in response');
  },
  (error) => {
    throw new Error(`Error ${error}`);
  },
);

export const getGenres = createAsyncThunk('getGenres', async () => {
  return await axios.get(api);
});

const initialState = {
  data: [],
  loading: false,
  error: false,
};

const getGenresSlice = createSlice({
  name: 'getGenres',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getGenres.pending, (state) => {
      state.data = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getGenres.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getGenresSlice.reducer;
