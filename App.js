import React, {useState} from 'react';

import Context from './src/state/Context';
import MainScreen from './src/screens/MainScreen';

const App = () => {
  const [globalState, setGlobalState] = useState({
    isSettingsDrawerOpen: false,
    isDeviceDrawerOpen: false,
  });

  return (
    <Context.Provider value={{globalState, setGlobalState}}>
      <MainScreen />
    </Context.Provider>
  );
};

export default App;

/** Purpose: Context Setup

Doing:
  - Import and setup reanimated (deep dive to avoid breaking, how are depencdecneis added to iOS. Also animations could make or break this app. Try to understand )

To-do:
  - Add Easing Animations to drawer and icons
  - Style the drawers 
  - Implement motion sensors and some initial visual/state feedback on the main screen
  - Bluetooth
  - Send data over BT
  
ST NOTES:
 - 

LT Notes:
 - Background Functionality
 - Changeability with limitations in updating microcontroller
 - Stark flat animation style
  */
