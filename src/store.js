import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './reducers/admin'
import storeReducer from './reducers/stores'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['isLoggedIn', 'name', 'email', 'createdAt', 'updatedAt'],
  debug: true,
  version: 1,
  migrate: (state, version) => {
    console.log('Migration running', state, version)
    return Promise.resolve(state)
  }
};

const persistedReducer = persistReducer(persistConfig, adminReducer);

export const store = configureStore({
  reducer: {
    admin: persistedReducer,
    store : storeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);