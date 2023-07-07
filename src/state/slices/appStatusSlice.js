import {initalState} from '../config/initialState';
import {createSlice} from '@reduxjs/toolkit';

// determines
export const appStatusSlice = createSlice({
  name: 'appStatus',
  initialState: initalState.appStatus,
  reducers: {
    setAppStatus(state, action) {
      state.status = action.payload;
    },
    setAppStatusWithButton(state, action) {
      state.status = action.payload.status;
      state.highlightedButton = action.payload.button;
    },
    setAppStatusAndClearButton(state, action) {
      state.status = action.payload;
      state.highlightedButton = '';
    },
  },
});

export const {
  setAppStatus,
  setAppStatusAndClearButton,
  setAppStatusWithButton,
} = appStatusSlice.actions;

export const appStatusReducer = appStatusSlice.reducer;
