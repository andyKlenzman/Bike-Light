import {initalState} from '../config/initialState';
import {createSlice} from '@reduxjs/toolkit';
export const curtainSlice = createSlice({
  name: 'curtain',
  initialState: initalState.curtain,
  reducers: {
    changeCurtainState(state, action) {
      state.isOpen = action.payload;
    },
  },
  // extraReducers: {}, //using builder callback from now on
});

export const {changeCurtainState} = curtainSlice.actions;

export const curtainReducer = curtainSlice.reducer;
