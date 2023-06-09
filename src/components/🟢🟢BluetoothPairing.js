import {View, StyleSheet} from 'react-native';
import BluetoothDisabledScreen from './🟢🟢BluetoothDisabledScreen';
import {BluetoothEnabledScreen} from './🟢🟢BluetoothEnabledScreen';
import {useSelector} from 'react-redux';

const BluetoothPairing = () => {
  const isBluetoothOn = useSelector(state => state.bluetooth.isBluetoothOn);

  return (
    <View>
      {isBluetoothOn !== 'PoweredOn' && <BluetoothDisabledScreen />}

      {isBluetoothOn === 'PoweredOn' && <BluetoothEnabledScreen />}
    </View>
  );
};

const styles = StyleSheet.create({});

export default BluetoothPairing;
