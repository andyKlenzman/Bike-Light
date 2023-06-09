import {configureStore} from '@reduxjs/toolkit';
import {drawerReducer} from './slices/drawerSlice';
import { bluetoothReducer } from './slices/bluetoothSlice';
export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    bluetooth: bluetoothReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mutatePromptMiddleware)
});
