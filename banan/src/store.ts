import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { automationApi } from './services/automation';
import { runnerApi } from './services/runner';
import appReducer from './slices/appSlice';

export const store = configureStore({
  reducer: {
    [automationApi.reducerPath]: automationApi.reducer,
    [runnerApi.reducerPath]: runnerApi.reducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(automationApi.middleware)
      .concat(runnerApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
