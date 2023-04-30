import {StyleSheet, View} from 'react-native';
import NavButtons from '../components/🟣🟣🟣 NavButtons';
import SettingsDrawer from '../drawers/SettingsDrawer';
import DeviceDrawer from '../drawers/DeviceDrawer';
import ReanimatedPractice from '../components/🟣🟣🟣 ReanimatedPractice';

/*
Check: 

Doing:
 

To-do:


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
