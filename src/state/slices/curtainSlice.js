import {initalState} from '../config/initialState';
import {createSlice} from '@reduxjs/toolkit';
export const curtainSlice = createSlice({
  name: 'curtain',
  initialState: initalState.curtain,
  reducers: {
    changeCurtainState(state, action) {
      state.position = action.payload;
    },
    changeCurtainContent(state, action) {
      state.contentType = action.payload.contentType;
    },
    changeCurtainStateAndContent(state, action) {
      state.position = action.payload.position;
      state.contentType = action.payload.contentType;
    },
  },
  // extraReducers: {}, //using builder callback from now on
});

export const {
  changeCurtainState,
  changeCurtainStateAndContent,
  changeCurtainContent,
} = curtainSlice.actions;

export const curtainReducer = curtainSlice.reducer;
