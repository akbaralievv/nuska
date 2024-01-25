import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../../config/api';
import { setRefreshToken, setAccessToken, setUser } from '../../../components/helpers/tokens';
import { api } from '../../../components/helpers/interceptors';

const api_url = API_URLS.change_password;

export const postNewPassword = createAsyncThunk(
  'newPassword',
  async (body, { rejectWithValue }) => {
    try {
      const response = await api.post(api_url, body);
      const data = await response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.email[0]);
      }
      return rejectWithValue('Каттоо учурунда белгисиз ката кетти');
    }
  },
);

const initialState = {
  data: '',
  loading: false,
  error: false,
  email: '',
};

const newPasswordSlice = createSlice({
  name: 'newPasswordSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(postNewPassword.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(postNewPassword.pending, (state) => {
      state.data = '';
      state.loading = true;
      state.error = false;
    });
    builder.addCase(postNewPassword.rejected, (state, action) => {
      state.data = '';
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default newPasswordSlice.reducer;
