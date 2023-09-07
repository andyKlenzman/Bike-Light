import {initalState} from '../config/initialState';
import {createSlice} from '@reduxjs/toolkit';
import {loadStoredData} from '../asyncThunks/loadStoreData';
// determines
export const introSlice = createSlice({
  name: 'intro',
  initialState: initalState.intro,
  reducers: {
    setIntroStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadStoredData.fulfilled, (state, action) => {
      state.isViewed = action.payload;
    });
  },
});

export const {setIntroStatus} = introSlice.actions;

export const introReducer = introSlice.reducer;
