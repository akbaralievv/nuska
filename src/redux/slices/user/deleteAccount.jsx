import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../../config/api';
import { api } from '../../../components/helpers/interceptors';

const api_url = API_URLS.delete_account;

export const deleteAccount = createAsyncThunk('deleteAccount', async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(api_url + id);
    const data = response.data;
    return data.user;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      return rejectWithValue(error.response.data.error);
    }
    return rejectWithValue('Белгисиз ката кетти');
  }
});

const initialState = {
  data: [],
  info: null,
  loading: false,
  error: false,
};

const deleteAccountSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    clearDataDeleteUser: (state, action) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteAccount.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(deleteAccount.pending, (state) => {
      state.data = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(deleteAccount.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearDataDeleteUser } = deleteAccountSlice.actions;
export default deleteAccountSlice.reducer;
