import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenMenu: false,
  isAuth: false,
  isOpenModal: false,
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
    setIsOpenModal: (state, action) => {
      state.isOpenModal = action.payload;
    },
  },
});

export const { setIsOpenMenu, setIsAuth, setIsOpenModal } = isTrueSlice.actions;
export default isTrueSlice.reducer;
