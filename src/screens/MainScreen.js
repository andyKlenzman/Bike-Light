import {StyleSheet, View} from 'react-native';
import NavButtons from '../components/🟣🟣🟣 NavButtons';
import SettingsDrawer from '../drawers/SettingsDrawer';
import DeviceDrawer from '../drawers/DeviceDrawer';
import ReanimatedPractice from '../components/🟣🟣🟣 Animation';
import {useEffect} from 'react';
import {bleManager} from '../utils/Bluetooth/bluetoothManager';
import {useDispatch} from 'react-redux';
import {
  fetchBluetoothState,
  setIsBluetoothOn,
} from '../state/slices/bluetoothSlice';
const MainScreen = () => {
  const dispatch = useDispatch();

  // Tells the app if the phones bluetooth is on or off
  useEffect(() => {
    dispatch(fetchBluetoothState());
  }, []);

  bleManager.onStateChange(state => {
    dispatch(setIsBluetoothOn(state));
  });

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
