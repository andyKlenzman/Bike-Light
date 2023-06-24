import {configureStore} from '@reduxjs/toolkit';
import {drawerReducer} from './slices/drawerSlice';
import {bluetoothReducer} from './slices/bluetoothSlice';
import {bannerTextReducer} from './slices/bannerTextSlice';
export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    bluetooth: bluetoothReducer,
    bannerText: bannerTextReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mutatePromptMiddleware)
});
