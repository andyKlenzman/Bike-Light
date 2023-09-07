import {createAsyncThunk} from '@reduxjs/toolkit';
import {AsyncStorage} from 'react-native';
import {useDispatch} from 'react-redux';
import {setIntroStatus} from '../slices/introSlice';
export const loadStoredData = createAsyncThunk(
  'myReducer/loadStoredData',
  async (_, {dispatch}) => {
    try {
      const data = await AsyncStorage.getItem('myData');
      return data ? JSON.parse(data) : false;
      //this needs to be false until it is saved to true.
    } catch (error) {
      throw error;
    }
  },
);
