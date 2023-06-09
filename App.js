import {useState} from 'react';
import Context from './src/state/Context';
import MainScreen from './src/screens/MainScreen';
import {Provider} from 'react-redux';
import {store} from './src/state/store';
const App = () => {
  const [drawerState, setDrawerState] = useState({
    isSettingsDrawerOpen: false,
    isDeviceDrawerOpen: false,
  });

  const [btState, setBtState] = useState({
    isBluetoothOn: false,
    connectedDevices: [],
    isLoading: '',
    scannedDevices: [],
  });

  return (
    <Provider store={store}>
      <Context.Provider
        value={{
          drawerState,
          setDrawerState,
          btState,
          setBtState,
        }}>
        <MainScreen />
      </Context.Provider>
    </Provider>
  );
};

export default App;
