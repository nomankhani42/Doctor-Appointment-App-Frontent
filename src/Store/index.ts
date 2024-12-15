// store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web

 import userReducer from './Slices/User/UserSlice.ts';
 import DoctorReducer from './Slices/User/DoctorSlice.ts';
 import AppointmentSlice from './Slices/User/AppointmentSlice.ts'

// Configure persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // Only persist the user 
};

const rootReducer = combineReducers({
    user: userReducer,
    doctor:DoctorReducer,
    appointment:AppointmentSlice
   
  });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
