import {initalState} from '../config/initialState';
import {createSlice} from '@reduxjs/toolkit';
export const curtainSlice = createSlice({
  name: 'curtain',
  initialState: initalState.curtain,
  reducers: {
    changeCurtainState(state, action) {
      state.state = action.payload;
    },
    changeCurtainContent(state, action) {
      state.content = action.payload;
    },
    changeCurtainStateAndContent(state, action) {
      state.state = action.payload.state;
      state.content = action.payload.content;
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
