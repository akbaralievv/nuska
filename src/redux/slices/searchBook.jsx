import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
};

const searchBookSlice = createSlice({
  name: 'searchBook',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearch } = searchBookSlice.actions;
export default searchBookSlice.reducer;
