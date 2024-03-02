import { createSlice } from '@reduxjs/toolkit';

const persistedTheme = localStorage.getItem('theme');
const initialState = {
  theme: persistedTheme
    ? JSON.parse(persistedTheme)
    : {
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
      localStorage.setItem('theme', JSON.stringify(state.theme));
    },
  },
});

export const { setTheme } = changeThemeSlice.actions;
export default changeThemeSlice.reducer;
