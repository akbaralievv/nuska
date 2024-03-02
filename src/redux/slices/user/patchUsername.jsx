import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../../config/api';
import { api } from '../../../components/helpers/interceptors';

const api_url = API_URLS.patch_username;

export const patchUsername = createAsyncThunk('patchUsername', async (obj, { rejectWithValue }) => {
  try {
    const response = await api.patch(api_url, obj);
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

const patchUsernameSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    clearDataPatchUser: (state, action) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(patchUsername.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(patchUsername.pending, (state) => {
      state.data = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(patchUsername.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearDataPatchUser } = patchUsernameSlice.actions;
export default patchUsernameSlice.reducer;
