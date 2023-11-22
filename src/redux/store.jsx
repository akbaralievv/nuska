import { configureStore } from '@reduxjs/toolkit';

import isTrue from './slices/isTrue';
import getBooks from './slices/getBooks';
import getGenres from './slices/getGenres';

export const store = configureStore({
  reducer: {
    isTrue,
    getBooks,
    getGenres,
  },
});
