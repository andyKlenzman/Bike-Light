import {initalState} from '../initialState';
import {createSlice} from '@reduxjs/toolkit';
export const drawerSlice = createSlice({
  name: 'drawer',
  initialState: initalState.drawer,
  reducers: {
    toggleDeviceDrawer(state, action) {
      state.isDeviceDrawerOpen = !state.isDeviceDrawerOpen;
    },
    toggleSettingsDrawer(state, action) {
      state.isSettingsDrawerOpen = !state.isSettingsDrawerOpen;
    },
  },
  // extraReducers: {}, //using builder callback from now on
});

export const {toggleDeviceDrawer, toggleSettingsDrawer} = drawerSlice.actions;

export const drawerReducer = drawerSlice.reducer;
