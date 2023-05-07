import {Text, View, Button, StyleSheet, FlatList} from 'react-native';
import {useContext} from 'react';
import Context from '../state/Context';
import BluetoothDisabledScreen from './BluetoothDisabledScreen';
import {BluetoothEnabledScreen} from './BluetoothEnabledScreen';
/*
  User flow and mechanics for BT device connection. Can handle multiple devices. 

Doing:
  - Style BT UI

Check: 

To-do:
  - Add a timeout to connecting to BT device.
  - Address performance issues with updating global bt state.

  - Develop Signal Communications

ST NOTES:

LT Notes:
  - 
  - 
*/

const BluetoothPairing = () => {
  const {btState} = useContext(Context);
  const Buffer = require('buffer').Buffer;

  return (
    <View>
      {btState.isBluetoothOn !== 'PoweredOn' && <BluetoothDisabledScreen />}

      {btState.isBluetoothOn === 'PoweredOn' && <BluetoothEnabledScreen />}
    </View>
  );
};

const styles = StyleSheet.create({});

export default BluetoothPairing;
