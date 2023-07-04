import {initalState} from '../initialState';
import {createSlice} from '@reduxjs/toolkit';
import {incrementThroughObject} from '../../utils/incrementThroughObject';
import {decrementThroughObject} from '../../utils/decrementThroughObject';

export const lightModeSlice = createSlice({
  name: 'lightMode',
  initialState: initalState.lightMode,
  reducers: {
    incrementLightMode(state, action) {
      incrementThroughObject(state);
    },
    decrementLightMode(state, action) {
      decrementThroughObject(state);
    },
  },
  // extraReducers: {}, //using builder callback from now on
});

export const {incrementLightMode, decrementLightMode} = lightModeSlice.actions;

export const lightModeReducer = lightModeSlice.reducer;
