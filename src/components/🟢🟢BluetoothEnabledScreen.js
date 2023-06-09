import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useEffect} from 'react';
import Context from '../state/Context';
import EmptyList from '../utils/EmptyList';
import {RenderScannedItem} from './🟡 BluetoothListItem';
import {bleManager} from '../utils/Bluetooth/bluetoothManager';
import {startDeviceScan} from '../utils/Bluetooth/startDeviceScan';
import {useDispatch, useSelector} from 'react-redux';
import {setScannedDevices} from '../state/slices/bluetoothSlice';

export const BluetoothEnabledScreen = () => {
  const scannedDevices = useSelector(state => state.bluetooth.scannedDevices);
  const connectedDevices = useSelector(state => state.bluetooth.connectedDevices);
  const isDeviceDrawerOpen = useSelector(
    state => state.drawer.isDeviceDrawerOpen,
  );
  const dispatch = useDispatch();

  // runs and stops scan automatically when app opens or closes
  useEffect(() => {
    if (isDeviceDrawerOpen) {
      startDeviceScan(dispatch, scannedDevices);
    } else {
      dispatch(setScannedDevices([])); //clears scanned devices so user gets up to date results
      bleManager.stopDeviceScan();
    }
  }, [isDeviceDrawerOpen]);

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.values(connectedDevices)}
        extraData={[connectedDevices]}
        keyExtractor={item => item.id}
        style={{marginBottom: 70}}
        renderItem={({item}) => <RenderScannedItem item={item} />}
        ListEmptyComponent={EmptyList}
      />
      <Text>Scanned</Text>
      <FlatList
        data={Object.values(scannedDevices)}
        extraData={[scannedDevices]}
        keyExtractor={item => item.id}
        style={{marginBottom: 0}}
        renderItem={({item}) => <RenderScannedItem item={item} />}
        ListEmptyComponent={EmptyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    position: 'absolute',
    bottom: 0,
    shadowColor: '#00c3ff',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    left: '30%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  container: {
    flex: 1,
  },
});
