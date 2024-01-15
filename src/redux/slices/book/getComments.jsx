import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import API_URLS from '../../../config/api';
import { api } from '../../../components/helpers/interceptors';

const api_url = API_URLS.commentList;

export const getComments = createAsyncThunk('getComments', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(api_url + id);
    const data = response.data;
    return data;
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

const getCommentsSlice = createSlice({
  name: 'CommentsSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getComments.pending, (state) => {
      state.data = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getComments.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getCommentsSlice.reducer;
