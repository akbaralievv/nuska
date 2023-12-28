import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import API_URLS from '../../config/api';

const api = API_URLS.authors;

axios.interceptors.response.use(
    (response) =>
    {
        if (response) {
            return response;
        }
        throw new Error('No data in response');
    },
    (error) =>
    {
        throw new Error(`Error ${error}`);
    },
);

export const getAuthors = createAsyncThunk('getAuthors', async () =>
{
    return await axios.get(api);
});

const initialState = {
    authors: [],
    loading: false,
    error: false,
};

const getAuthorsSlice = createSlice({
    name: 'getAuthors',
    initialState,
    extraReducers: (builder) =>
    {
        builder.addCase(getAuthors.fulfilled, (state, action) =>
        {
            state.authors = action.payload;
            state.loading = false;
            state.error = false;
        });
        builder.addCase(getAuthors.pending, (state) =>
        {
            state.authors = [];
            state.loading = true;
            state.error = false;
        });
        builder.addCase(getAuthors.rejected, (state, action) =>
        {
            state.authors = [];
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default getAuthorsSlice.reducer;
