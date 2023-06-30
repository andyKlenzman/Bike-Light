import {initalState} from '../initialState';
import {createSlice} from '@reduxjs/toolkit';
//needs to cancel if there is another status update, or if another call appStatus with delau is created.
//could read out the promise of asyncThunk and call the abort method, but would rather have all the logic in this file, not in UI
//can use a cancellation token at execution of the Timeout, which would always give priority to set Immeditate
// dispatch to setAppStatus incside of here.

export const appStatusSlice = createSlice({
  name: 'appStatus',
  initialState: initalState.appStatus,
  reducers: {
    setAppStatus(state, action) {
      state.status = action.payload;
    },
    
  },


});

export const {setAppStatus, setCancellationToken} = appStatusSlice.actions;

export const appStatusReducer = appStatusSlice.reducer;
