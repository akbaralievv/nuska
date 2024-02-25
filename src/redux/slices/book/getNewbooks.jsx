import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../../config/api';

const api = API_URLS.newbooks;

export const getNewbooks = createAsyncThunk(
  'getNewbooks',
  async (jenre_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(api + `${jenre_id ? '?jenre_id=' + jenre_id : ''}`);
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

const getNewbooksSlice = createSlice({
  name: 'NewbooksSlice',
  initialState,
  reducers: {
    clearDataNewBooks: (state, action) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNewbooks.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getNewbooks.pending, (state) => {
      state.data = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getNewbooks.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearDataNewBooks } = getNewbooksSlice.actions;
export default getNewbooksSlice.reducer;
