// store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { automationApi } from './services/automation';
import { runnerApi } from './services/runner';
import appReducer from './slices/appSlice';

// Konfigurace pro `redux-persist`
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: {
    [automationApi.reducerPath]: automationApi.reducer,
    [runnerApi.reducerPath]: runnerApi.reducer,
    app: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(automationApi.middleware)
      .concat(runnerApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
