import { configureStore } from '@reduxjs/toolkit';

import isTrue from './slices/isTrue';
import getBooks from './slices/book/getBooks';
import getGenres from './slices/getGenres';
import changeTheme from './slices/changeTheme';
import getBestsellingBooks from './slices/book/getBestsellingBooks';
import getAuthors from './slices/getAuthors';
import register from './slices/auth/register';
import authorization from './slices/auth/authorization';
import getNewbooks from './slices/book/getNewbooks';
import getUser from './slices/user/getUser';
import getFavoriteBooks from './slices/book/getFavoriteBooks';
import postFavoriteBook from './slices/book/postFavoriteBook';
import getComments from './slices/book/getComments';
import postComment from './slices/book/postComment';
import forgoutPassword from './slices/auth/forgoutPassword';
import codeConfirm from './slices/auth/codeConfirm';

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
    getNewbooks,
    getUser,
    postFavoriteBook,
    getFavoriteBooks,
    getComments,
    postComment,
    forgoutPassword,
    codeConfirm,
  },
});
