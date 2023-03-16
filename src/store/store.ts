import { configureStore } from '@reduxjs/toolkit';

import campaign from './campaign-slice/campaign-slice';

export const store = configureStore({
  reducer: {
    campaign,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
