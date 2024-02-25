import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenMenu: false,
  isAuth: false,
  isOpenModal: false,
  isForgoutPassword: false,
  isConfirmCode: false,
  isLogout: false,
  isChangePassword: false,
  isFavorites: false,
  isOpenModalMain: false,
  isDetailCard: false,
};

const isTrueSlice = createSlice({
  name: 'isTrue',
  initialState,
  reducers: {
    setIsOpenMenu: (state, action) => {
      state.isOpenMenu = action.payload;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setIsLogout: (state, action) => {
      state.isLogout = action.payload;
    },
    setIsOpenModal: (state, action) => {
      state.isOpenModal = action.payload;
    },
    setIsOpenModalMain: (state, action) => {
      state.isOpenModalMain = action.payload;
    },
    setIsForgoutPassword: (state, action) => {
      state.isForgoutPassword = action.payload;
    },
    setIsConfirmCode: (state, action) => {
      state.isConfirmCode = action.payload;
    },
    setIsChangePassword: (state, action) => {
      state.isChangePassword = action.payload;
    },
    setIsFavorites: (state, action) => {
      state.isFavorites = action.payload;
    },
    setIsDetailCard: (state, action) => {
      state.isDetailCard = action.payload;
    },
  },
});

export const {
  setIsOpenMenu,
  setIsLogout,
  setIsAuth,
  setIsOpenModal,
  setIsForgoutPassword,
  setIsConfirmCode,
  setIsChangePassword,
  setIsFavorites,
  setIsOpenModalMain,
  setIsDetailCard,
} = isTrueSlice.actions;
export default isTrueSlice.reducer;
