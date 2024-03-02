import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../../config/api';

const api = API_URLS.library;

export const getBooks = createAsyncThunk('getBooks', async (jenre_id, { rejectWithValue }) => {
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
});

export const getOneBook = createAsyncThunk(
  'getOneBook',
  async function (api, { dispatch, rejectWithValue }) {
    try {
      const response = await fetch(api);
      if (response.status === 200) {
        const records = await response.json();
        return records;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
    }
  },
);
const initialState = {
  data: [],
  info: null,
  loading: false,
  error: false,
  oneBookLoad: false,
  oneBookError: false,
};

const getBooksSlice = createSlice({
  name: 'booksSlice',
  initialState,
  reducers: {
    clearDataBooks: (state, action) => {
      state.data = [];
    },
    clearDataInfo: (state, action) => {
      state.info = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getBooks.pending, (state) => {
      state.data = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getBooks.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.error.message;
    });
    // oneBook
    builder.addCase(getOneBook.fulfilled, (state, action) => {
      state.oneBookLoad = false;
      state.info = action.payload;
      state.oneBookError = false;
    });
    builder.addCase(getOneBook.rejected, (state, action) => {
      state.oneBookError = action.payload;
      state.oneBookLoad = false;
    });
    builder.addCase(getOneBook.pending, (state, action) => {
      state.oneBookLoad = true;
      state.oneBookError = false;
      state.info = null;
    });
  },
});

export const { clearDataBooks, clearDataInfo } = getBooksSlice.actions;
export default getBooksSlice.reducer;
