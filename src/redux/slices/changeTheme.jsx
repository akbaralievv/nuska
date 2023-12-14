import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: {
    key: 'light',
    currentThemeColor: {
      color: '#000',
    },
  },
};

const changeThemeSlice = createSlice({
  name: 'changeTheme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme.key = action.payload.key;
      state.theme.currentThemeColor.color = action.payload.color;
    },
  },
});

export const { setTheme } = changeThemeSlice.actions;
export default changeThemeSlice.reducer;
