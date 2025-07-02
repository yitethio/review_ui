import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

import institutionReducer from './institutionSlice';
import reviewReducer from './reviewSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
   
    institutions: institutionReducer,
    reviews: reviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;