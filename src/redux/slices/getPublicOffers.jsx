import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../config/api';

const api = API_URLS.public_offers;

export const getPublicOffers = createAsyncThunk('getPublicOffers', async () => {
  try {
    const response = await axios.get(api);
    const data = response.data;
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

const getPublicOffersSlice = createSlice({
  name: 'getPublicOffers',
  initialState,
  reducers: {
    clearDataPublicOffers: (state, action) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPublicOffers.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getPublicOffers.pending, (state) => {
      state.data = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getPublicOffers.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearDataPublicOffers } = getPublicOffersSlice.actions;
export default getPublicOffersSlice.reducer;
