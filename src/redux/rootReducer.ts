import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import walletReducer from './walletSlice';

const persistConfig = {
  key: 'WALLET',
  storage,
  whiteList: ['walletReducer'],
};

const rootReducer = combineReducers({
  wallet: walletReducer,
});

export default persistReducer(persistConfig, rootReducer);
