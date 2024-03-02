import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../../config/api';
import { setRefreshToken, setAccessToken, setUser } from '../../../components/helpers/tokens';

const api = API_URLS.register;

export const register = createAsyncThunk('register', async (body, { rejectWithValue }) => {
  try {
    const response = await axios.post(api, body);
    const data = await response.data;
    const user = JSON.stringify(data.user);
    handleSuccessfulSignIn(data.tokens.access, data.tokens.refresh, user);
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      return rejectWithValue(error.response.data.error);
    }
    return rejectWithValue('Каттоо учурунда белгисиз ката кетти');
  }
});

const handleSuccessfulSignIn = (accessToken, refreshToken, user) => {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
  setUser(user);
};

const initialState = {
  data: {},
  loading: false,
  error: false,
};

const registerSlice = createSlice({
  name: 'registerSlice',
  initialState,
  reducers: {
    clearDataRegister: (state) => {
      state.data = {};
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(register.pending, (state) => {
      state.data = {};
      state.loading = true;
      state.error = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.data = {};
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearDataRegister } = registerSlice.actions;
export default registerSlice.reducer;
