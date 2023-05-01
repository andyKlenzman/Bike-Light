import {useState, useEffect} from 'react';
import Context from './src/state/Context';
import MainScreen from './src/screens/MainScreen';
import {bleManager} from './src/utils/Bluetooth/bluetoothManager';
/** Purpose: Context Setup
Doing:
 - refactor Drawer context, BT context, to be seperate in the context. 

To-do:
  - Adding device BT state updates to highest level of the app. 
  - refactor BTpairing to read context for global state.
  --- May redesign Global state to have muleiple portions: Drawer state, BT state, etc.
  
ST NOTES:
 - 

LT Notes:
 - 
  */

const App = () => {
  const [drawerState, setDrawerState] = useState({
    isSettingsDrawerOpen: false,
    isDeviceDrawerOpen: false,
  });

  const [btState, setBtState] = useState({
    isBluetoothOn: false,
    connectedDevices: [],
  });

  //to be abstracted 

  // useEffect(() => {
  //   const getBleState = async () => {
  //     const state = await bleManager.state();
  //     setBtState(state);
  //   };
  //   getBleState().catch(err => {
  //     console.error('Error catching bluetooth state: ', err);
  //   });
  // }, []);

  // bleManager.onStateChange(state => {
  //   console.log('State change local : ', state);
  //   setBtState(state);
  // });

  return (
    <Context.Provider
      value={{
        drawerState,
        setDrawerState,
        btState,
        setBtState,
      }}>
      <MainScreen />
    </Context.Provider>
  );
};

export default App;
