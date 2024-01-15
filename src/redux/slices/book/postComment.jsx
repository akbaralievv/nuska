import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import API_URLS from '../../../config/api';
import { api } from '../../../components/helpers/interceptors';

const api_url = API_URLS.createComment;

export const postComment = createAsyncThunk(
  'postComment',
  async ({ id, string }, { rejectWithValue }) => {
    try {
      const response = await api.post(api_url + id, {
        comment: string,
      });
      const data = response.data;
      return data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue('Белгисиз ката кетти');
    }
  },
);

const initialState = {
  data: [],
  info: null,
  loading: false,
  error: false,
};

const postCommentSlice = createSlice({
  name: 'CommentSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(postComment.pending, (state) => {
      state.data = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(postComment.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default postCommentSlice.reducer;
