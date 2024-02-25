import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../../config/api';
import { api } from '../../../components/helpers/interceptors';

const api_url = API_URLS.user;

export const getUser = createAsyncThunk('getUser', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(api_url);
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

const getUserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    clearDataUser: (state, action) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getUser.pending, (state) => {
      state.data = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearDataUser } = getUserSlice.actions;
export default getUserSlice.reducer;
