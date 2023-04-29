import {useState} from 'react';
import Context from './src/state/Context';
import MainScreen from './src/screens/MainScreen';

/** Purpose: Context Setup
Doing:
  - 

To-do:
 - 
  
ST NOTES:
 - 

LT Notes:
 - 
  */

const App = () => {
  const [globalState, setGlobalState] = useState({
    isSettingsDrawerOpen: false,
    isDeviceDrawerOpen: false,
  });
  return (
    <Context.Provider
      value={{
        globalState,
        setGlobalState,
      }}>
      <MainScreen />
    </Context.Provider>
  );
};

export default App;
