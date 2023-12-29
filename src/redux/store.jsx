import { configureStore } from '@reduxjs/toolkit';

import isTrue from './slices/isTrue';
import getBooks from './slices/getBooks';
import getGenres from './slices/getGenres';
import changeTheme from './slices/changeTheme';
import getBestsellingBooks from './slices/getBestsellingBooks';
import getAuthors from './slices/getAuthors';
import register from './slices/auth/register';
import authorization from './slices/auth/authorization';

export const store = configureStore({
  reducer: {
    isTrue,
    getBooks,
    getGenres,
    changeTheme,
    getBestsellingBooks,
    getAuthors,
    register,
    authorization,
  },
});
