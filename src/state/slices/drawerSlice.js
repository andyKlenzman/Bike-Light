import {initalState} from '../initialState';
import {createSlice} from '@reduxjs/toolkit';
export const drawerSlice = createSlice({
  name: 'drawer',
  initialState: initalState.drawer,
  reducers: {
    changeDrawer(state, action) {
      state.openDrawer = action.payload;
    },
  },
  // extraReducers: {}, //using builder callback from now on
});

export const {changeDrawer} = drawerSlice.actions;

export const drawerReducer = drawerSlice.reducer;
