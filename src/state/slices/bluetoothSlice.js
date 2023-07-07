import {initalState} from '../config/initialState';
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createReducer,
} from '@reduxjs/toolkit';
import {bleManager} from '../../utils/Bluetooth/bluetoothManager';

export const fetchBluetoothState = createAsyncThunk(
  'bluetooth/fetchBluetoothState',
  async () => {
    try {
      const response = await bleManager.state();
      return response;
    } catch (error) {
      throw new Error('Failed to fetch Bluetooth state');
    }
  },
);

//this is way too many reducers, too much to maintain... break it up into general BT/microcontroller next time, or find a way to simllify, but as a rule of thumb, this is too much, even though it doesnt seem like it when writing it in the moment. I don't want to maintain this code

const bluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState: initalState.bluetooth,
  reducers: {
    setIsBluetoothOn(state, action) {
      state.isBluetoothOn = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    addScannedDevice(state, action) {
      state.scannedDevices.push(action.payload);
    },
    setScannedDevices(state, action) {
      state.scannedDevices = action.payload;
    },
    deleteScannedDevice(state, action) {
      const deviceId = action.payload;

      const updateScannedDevices = state.scannedDevices.filter(
        device => device.id !== deviceId,
      );
      state.scannedDevices = updateScannedDevices;
    },
    setConnectedDevices(state, action) {
      state.connectedDevices = action.payload;
    },
    deleteConnectedDevice(state, action) {
      const deviceId = action.payload;

      const updateConnectedDevices = state.connectedDevices.filter(
        device => device.id !== deviceId,
      );
      state.connectedDevices = updateConnectedDevices;
    },
    setIsSendingSignal(state, action) {
      state.isSendingSignal = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchBluetoothState.fulfilled, (state, action) => {
      state.isBluetoothOn = action.payload;
    });
  },
});

export const {
  setIsBluetoothOn,
  setIsLoading,
  addScannedDevice,
  setScannedDevices,
  setConnectedDevices,
  toggleIsSendingSignal,
  deleteScannedDevice,
  setIsSendingSignal,
  deleteConnectedDevice,
} = bluetoothSlice.actions;

export const bluetoothReducer = bluetoothSlice.reducer;
