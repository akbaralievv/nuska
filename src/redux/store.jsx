import { configureStore } from '@reduxjs/toolkit';

import isTrue from './slices/isTrue';

export const store = configureStore({
  reducer: { isTrue },
});
