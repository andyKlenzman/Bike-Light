import {configureStore} from '@reduxjs/toolkit';
import {drawerReducer} from './slices/drawerSlice';
import {bluetoothReducer} from './slices/bluetoothSlice';
import {appStatusReducer} from './slices/appStatusSlice';
export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    bluetooth: bluetoothReducer,
    appStatus: appStatusReducer,
  },

});
