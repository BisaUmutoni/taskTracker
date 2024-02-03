import { configureStore } from '@reduxjs/toolkit'

import boardtaskslice from './boardtaskslice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {authReducer, task: boardtaskslice},
})