import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

//Slices
//import { commentsSlice } from './slices/commentsSlice';
import { activitiesSlice } from './slices/activitiesSlices';

//We need a "makeStore" to avoid making the state global and instead create a new state in each request (needed for the Next JS app folder architecture)
const makeStore = () => {
  return configureStore({
    reducer: {
      activities: activitiesSlice.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
