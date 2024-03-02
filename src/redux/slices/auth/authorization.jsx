import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../../config/api';
import { setRefreshToken, setAccessToken } from '../../../components/helpers/tokens';

const api = API_URLS.authorization;

export const authorization = createAsyncThunk(
  'authorization',
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(api, body);
      const data = await response.data;
      handleSuccessfulSignIn(data.access, data.refresh);
      return 'Сиз ийгиликтүү кирдиңиз';
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        return rejectWithValue(error.response.data.detail);
      }
      return rejectWithValue('Кирүү учурунда белгисиз ката кетти');
    }
  },
);

const handleSuccessfulSignIn = (accessToken, refreshToken) => {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
};

const initialState = {
  data: '',
  loading: false,
  error: false,
};

const authorizationSlice = createSlice({
  name: 'authorizationSlice',
  initialState,
  reducers: {
    clearDataLogin: (state) => {
      state.data = '';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authorization.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(authorization.pending, (state) => {
      state.data = '';
      state.loading = true;
      state.error = false;
    });
    builder.addCase(authorization.rejected, (state, action) => {
      state.data = '';
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearDataLogin } = authorizationSlice.actions;
export default authorizationSlice.reducer;
