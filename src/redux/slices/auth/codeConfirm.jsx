import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../../config/api';
import { setRefreshToken, setAccessToken, setUser } from '../../../components/helpers/tokens';

const api = API_URLS.code_confirm;

export const codeConfirm = createAsyncThunk('codeConfirm', async (body, { rejectWithValue }) => {
  try {
    const response = await axios.post(api, body);
    const data = await response.data;
    handleSuccessfulSignIn(data.tokens.access, data.tokens.refresh);
    return data.message;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.detail);
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
  data: '',
  loading: false,
  error: false,
};

const codeConfirmSlice = createSlice({
  name: 'codeConfirmSlice',
  initialState,
  reducers: {
    clearDataCodeConfirm: (state) => {
      state.data = '';
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(codeConfirm.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(codeConfirm.pending, (state) => {
      state.data = '';
      state.loading = true;
      state.error = false;
    });
    builder.addCase(codeConfirm.rejected, (state, action) => {
      state.data = '';
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearDataCodeConfirm } = codeConfirmSlice.actions;
export default codeConfirmSlice.reducer;
