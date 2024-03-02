import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../../config/api';
import { setRefreshToken, setAccessToken, setUser } from '../../../components/helpers/tokens';

const api = API_URLS.reset_password;

export const forgoutPassword = createAsyncThunk(
  'forgoutPassword',
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(api, body);
      const data = await response.data;
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.email[0]);
      }
      return rejectWithValue('Каттоо учурунда белгисиз ката кетти');
    }
  },
);

const handleSuccessfulSignIn = (accessToken, refreshToken, user) => {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
  setUser(user);
};

const initialState = {
  data: '',
  loading: false,
  error: false,
  email: '',
};

const forgoutPasswordSlice = createSlice({
  name: 'forgoutPasswordSlice',
  initialState,
  reducers: {
    clearDataforgoutPassword: (state) => {
      state.data = '';
      state.error = '';
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(forgoutPassword.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(forgoutPassword.pending, (state) => {
      state.data = '';
      state.loading = true;
      state.error = false;
    });
    builder.addCase(forgoutPassword.rejected, (state, action) => {
      state.data = '';
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearDataforgoutPassword, setEmail } = forgoutPasswordSlice.actions;
export default forgoutPasswordSlice.reducer;
