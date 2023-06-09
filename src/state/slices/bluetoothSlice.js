import {initalState} from '../initialState';
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createReducer,
} from '@reduxjs/toolkit';
import {bleManager} from '../../utils/Bluetooth/bluetoothManager';

// const bluetoothAdapter = createEntityAdapter();

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

// export const saveNewTodo = createAsyncThunk('todos/saveNewTodo', async text => {
//   const initialTodo = {text};
//   const response = await client.post('/fakeApi/todos', {todo: initialTodo});
//   return response.todo;
// });

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
} = bluetoothSlice.actions;

export const bluetoothReducer = bluetoothSlice.reducer;
