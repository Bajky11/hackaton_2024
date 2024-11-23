import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { automationApi } from './services/automation';
import { runnerApi } from './services/runner';
import appReducer from './slices/app/appReducer';
import { sasApi } from '@/services/sas';
import { Middleware } from 'redux';
import { notificationsApi } from '@/services/notifications';

const loggerMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  console.log('Dispatching action:', action);
  const result = next(action);
  console.log('Updated state:', storeAPI.getState());
  return result;
};

export const store = configureStore({
  reducer: {
    [automationApi.reducerPath]: automationApi.reducer,
    [runnerApi.reducerPath]: runnerApi.reducer,
    [sasApi.reducerPath]: sasApi.reducer,
    app: appReducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(automationApi.middleware)
      .concat(runnerApi.middleware)
      .concat(sasApi.middleware)
      .concat(loggerMiddleware)
      .concat(notificationsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
