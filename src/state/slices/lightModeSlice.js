import {initalState} from '../config/initialState';
import {createSlice} from '@reduxjs/toolkit';
import {changeMode} from '../../utils/changeMode';

export const lightModeSlice = createSlice({
  name: 'lightMode',
  initialState: initalState.lightMode,
  reducers: {
    incrementLightMode(state, action) {
      changeMode(state, 'increment');
    },
    decrementLightMode(state, action) {
      changeMode(state, 'decrement');
    },
  },
  // extraReducers: {}, //using builder callback from now on
});

export const {incrementLightMode, decrementLightMode} = lightModeSlice.actions;

export const lightModeReducer = lightModeSlice.reducer;
