import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { automationApi } from './services/automation';
import { runnerApi } from './services/runner';
import appReducer from './slices/appSlice';
import { sasApi } from '@/services/sas';

export const store = configureStore({
  reducer: {
    [automationApi.reducerPath]: automationApi.reducer,
    [runnerApi.reducerPath]: runnerApi.reducer,
    [sasApi.reducerPath]: sasApi.reducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(automationApi.middleware)
      .concat(runnerApi.middleware)
      .concat(sasApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
