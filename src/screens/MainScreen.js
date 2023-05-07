import {StyleSheet, View} from 'react-native';
import NavButtons from '../components/🟣🟣🟣 NavButtons';
import SettingsDrawer from '../drawers/SettingsDrawer';
import DeviceDrawer from '../drawers/DeviceDrawer';
import ReanimatedPractice from '../components/🟣🟣🟣 ReanimatedPractice';
import {useContext, useEffect} from 'react';
import Context from '../state/Context';
import {bleManager} from '../utils/Bluetooth/bluetoothManager';
/*
Check: 


Doing:
 

To-do:
- arcitecture for sending signals to BT device, keeping in mind mult devices, settings mode, animations w sneosrs, etc`

ST NOTES:

  */

const MainScreen = () => {
  const {btState, setBtState} = useContext(Context);

  useEffect(() => {
    const getBleState = async () => {
      const state = await bleManager.state();
      setBtState({...btState, isBluetoothOn: state});
    };
    getBleState().catch(err => {
      console.error('Error catching bluetooth state: ', err);
    });
  }, []);
  bleManager.onStateChange(state => {
    setBtState({...btState, isBluetoothOn: state});
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
