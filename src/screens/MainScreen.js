import {StyleSheet, View} from 'react-native';
import NavButtons from '../components/🟣🟣🟣 NavButtons';
import SettingsDrawer from '../drawers/SettingsDrawer';
import DeviceDrawer from '../drawers/DeviceDrawer';
import ReanimatedPractice from '../components/🟣🟣🟣 ReanimatedPractice';

/*
Check: 

Doing:
 

To-do:
  - Style bluetooth paring process
  - Plan BT structure, (how to abstract pairing, writing data functions, context, etc.)
  - load BT data into context
  - Test BT Functionality (with set interval) (will performance lag if readSensors is called twice in app, better to try to load it into context again now that I know it needs the whole obj)

ST NOTES:

  */

const MainScreen = () => {


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
