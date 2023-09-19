import {initalState} from '../config/initialState';
import {createSlice} from '@reduxjs/toolkit';
export const faqContainerSlice = createSlice({
  name: 'faqContainer',
  initialState: initalState.faqContainer,
  reducers: {
    controlIsOpen(state, action) {
      state.isOpen = action.payload;
    },
  },
});

export const {controlIsOpen} = faqContainerSlice.actions;

export const faqContainerReducer = faqContainerSlice.reducer;
