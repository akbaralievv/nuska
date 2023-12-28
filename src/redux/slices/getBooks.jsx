import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../config/api';

const api = API_URLS.library;

export const getBooks = createAsyncThunk('getBooks', async () =>
{
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
  }
});

export const getOneBook = createAsyncThunk(
  "getOneBook",
  async function (api, { dispatch, rejectWithValue })
  {
    try {
      const response = await fetch(api);
      if (response.status === 200) {
        const records = await response.json();
        return records;
      }
      else {
        throw Error(`Error: ${response.status}`);
      }
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
    finally {

    }
  }
)
const initialState = {
  data: [],
  info: null,
  loading: false,
  error: false,
};

const getBooksSlice = createSlice({
  name: 'booksSlice',
  initialState,
  extraReducers: (builder) =>
  {
    builder.addCase(getBooks.fulfilled, (state, action) =>
    {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getBooks.pending, (state) =>
    {
      state.data = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getBooks.rejected, (state, action) =>
    {
      state.data = [];
      state.loading = false;
      state.error = action.error.message;
    });
    // oneBook
    builder.addCase(getOneBook.fulfilled, (state, action) =>
    {
      state.loading = false;
      state.info = action.payload;
    })
    builder.addCase(getOneBook.rejected, (state, action) =>
    {
      state.error = action.payload;
      state.loading = false;
    })
    builder.addCase(getOneBook.pending, (state, action) =>
    {
      state.loading = true;
    })
  },
});

export default getBooksSlice.reducer;
