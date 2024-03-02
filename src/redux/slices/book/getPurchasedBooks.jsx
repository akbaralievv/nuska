import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../../../components/helpers/interceptors';
import API_URLS from '../../../config/api';

const api_url = API_URLS.purchased_books;

export const getPurchasedBooks = createAsyncThunk(
  'getPurchasedBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(api_url);
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

const getPurchasedBooksSlice = createSlice({
  name: 'PurchasedBooksSlice',
  initialState,
  reducers: {
    clearDataPurchasedBooks: (state, action) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPurchasedBooks.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getPurchasedBooks.pending, (state) => {
      state.data = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getPurchasedBooks.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearDataPurchasedBooks } = getPurchasedBooksSlice.actions;
export default getPurchasedBooksSlice.reducer;
