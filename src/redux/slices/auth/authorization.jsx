import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import API_URLS from '../../../config/api';
import { setRefreshToken, setAccessToken, setUser } from '../../../components/helpers/tokens';

const api = API_URLS.authorization;

export const authorization = createAsyncThunk('authorization', async (body) => {
  try {
    const response = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    const user = JSON.stringify(data.user);
    handleSuccessfulSignIn(data.tokens.access, data.tokens.refresh, user);
    return data.user;
  } catch (error) {
    console.error('Error fetching books:', error);
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

const authorizationSlice = createSlice({
  name: 'authorizationSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(authorization.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(authorization.pending, (state) => {
      state.data = {};
      state.loading = true;
      state.error = false;
    });
    builder.addCase(authorization.rejected, (state, action) => {
      state.data = {};
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default authorizationSlice.reducer;
