import {initalState} from '../initialState';
import {createSlice} from '@reduxjs/toolkit';
import {incrementThroughObject} from '../../utils/incrementThroughObject';
import {decrementThroughObject} from '../../utils/decrementThroughObject';

export const interactionModeSlice = createSlice({
  name: 'interactionMode',
  initialState: initalState.interactionMode,
  reducers: {
    incrementInteractionMode(state, action) {
      incrementThroughObject(state);
    },
    decrementInteractionMode(state, action) {
      decrementThroughObject(state);
    },
  },
  // extraReducers: {}, //using builder callback from now on
});

export const {incrementInteractionMode, decrementInteractionMode} =
  interactionModeSlice.actions;

export const interactionModeReducer = interactionModeSlice.reducer;
