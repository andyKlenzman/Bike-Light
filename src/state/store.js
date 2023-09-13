import {configureStore} from '@reduxjs/toolkit';
import {drawerReducer} from './slices/drawerSlice';
import {bluetoothReducer} from './slices/bluetoothSlice';
import {appStatusReducer} from './slices/appStatusSlice';
import {interactionModeReducer} from './slices/interactionModeSlice';
import {lightModeReducer} from './slices/lightModeSlice';
import {curtainReducer} from './slices/curtainSlice';
import {introReducer} from './slices/introSlice';

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    curtain: curtainReducer,
    bluetooth: bluetoothReducer,
    appStatus: appStatusReducer,
    interactionMode: interactionModeReducer,
    lightMode: lightModeReducer,
    intro: introReducer,
  },
});
