import { configureStore } from '@reduxjs/toolkit';
import persistReducer from './rootReducer';

const store = configureStore({
  reducer: persistReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
