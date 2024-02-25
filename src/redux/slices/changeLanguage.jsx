import { createSlice } from '@reduxjs/toolkit';

const persistedLang = localStorage.getItem('language');

const initialState = {
  language: persistedLang ?? 'Кыргызча',
};

const changeLanguageSlice = createSlice({
  name: 'changeTheme',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem('language', state.language);
    },
  },
});

export const { setLanguage } = changeLanguageSlice.actions;
export default changeLanguageSlice.reducer;
