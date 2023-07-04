import {StyleSheet, Text, View} from 'react-native';
import NavButtons from '../components/🔴🔴🔴🔴NavButtons';
import Drawers from '../components/🔴🔴🔴🔴Drawers';

import AppStatus from '../components/🔴🔴🔴🔴AppStatus';
import {useEffect} from 'react';
import {bleManager} from '../utils/Bluetooth/bluetoothManager';
import {useDispatch} from 'react-redux';
import {
  fetchBluetoothState,
  setIsBluetoothOn,
} from '../state/slices/bluetoothSlice';
import Header from '../components/🔴🔴🔴🔴Header';
import {Curtain} from '../components/🔴🔴🔴🔴Curtain';

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
      <Header />
      <Curtain />
      <Drawers />
      <AppStatus />
      <NavButtons />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  textContainer: {
    position: 'absolute',
    top: -5,
    minWidth: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
    zIndex: 7,
    opacity: 0.5,
  },
  text: {
    color: 'grey',
    fontSize: 50,
  },
});
