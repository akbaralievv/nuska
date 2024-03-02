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
import getComments from './slices/book/getComments';
import postComment from './slices/book/postComment';
import forgoutPassword from './slices/auth/forgoutPassword';
import codeConfirm from './slices/auth/codeConfirm';
import changePassword from './slices/auth/changePassword';
import getRecommendedBooks from './slices/book/getRecommendedBooks';
import getAuthorBooks from './slices/book/getAuthorBooks';
import changeLanguage from './slices/changeLanguage';
import deleteAccount from './slices/user/deleteAccount';
import patchUsername from './slices/user/patchUsername';
import searchBook from './slices/searchBook';
import getPurchasedBooks from './slices/book/getPurchasedBooks';

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
    getComments,
    postComment,
    forgoutPassword,
    codeConfirm,
    changePassword,
    getRecommendedBooks,
    getAuthorBooks,
    changeLanguage,
    deleteAccount,
    patchUsername,
    searchBook,
    getPurchasedBooks,
  },
});
