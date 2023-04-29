import {StyleSheet, View} from 'react-native';
import NavButtons from '../components/🟣🟣🟣 NavButtons';
import SettingsDrawer from '../drawers/SettingsDrawer';
import DeviceDrawer from '../drawers/DeviceDrawer';
import ReanimatedPractice from '../components/🟣🟣🟣 ReanimatedPractice';

/*
Check: 
 - Clean up proj (did I break anything)
 - Check BT (once i've installed BLE PLX), lots of debugging to do.
Doing:
    - implement all sensors in practice

To-do:
  - Initial BT structure.
  - Test BT Functionality (with set interval)
  - Install BLE PLX
  - begin implementation of BT (call function into bt, will it work)

ST NOTES:
 - 
 - WAIT!! it doesn't need to be passed as props, just call read sensors to BT / animated componetns and it should work.
 - realized passing this data as a function works better than use context. Only upcoming issue I can imagine is that the data gets fucked when reading it in BT and animation, but that seems unlikely. 
LT Notes:
 - call readSensors in BT and the other and see if they run okay. If it has a dip in performance, consider revisitng useContext to centralize the source of data instead of calling two straeas. I wonder how it will run....
  */

const MainScreen = () => {
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     console.log('setInterval running',);
  //   }, 1000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  return (
    <View style={styles.container}>
      <ReanimatedPractice />
      <NavButtons />
      <SettingsDrawer />
      <DeviceDrawer />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
