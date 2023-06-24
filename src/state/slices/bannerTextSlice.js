import {initalState} from '../initialState';
import {createSlice} from '@reduxjs/toolkit';


export const bannerTextSlice = createSlice({
  name: 'bannerText',
  initialState: initalState.bannerText,
  reducers: {
    changeText(state, action) {
      state.text = action.payload;
    },
  },
  // extraReducers: {}, //using builder callback from now on
});

export const {changeText} = bannerTextSlice.actions;

export const bannerTextReducer = bannerTextSlice.reducer;
