import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenMenu: false,
};

const isTrueSlice = createSlice({
  name: 'isTrue',
  initialState,
  reducers: {
    setIsOpenMenu: (state, action) => {
      state.isOpenMenu = action.payload;
    },
  },
});

export const { setIsOpenMenu } = isTrueSlice.actions;
export default isTrueSlice.reducer;
