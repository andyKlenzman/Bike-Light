import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useEffect, useCallback} from 'react';
import Context from '../state/Context';
import EmptyList from '../utils/EmptyList';
import {RenderScannedItem} from './🟡 BluetoothListItem';
import {bleManager} from '../utils/Bluetooth/bluetoothManager';
import {startDeviceScan} from '../utils/Bluetooth/startDeviceScan';
import {useDispatch, useSelector} from 'react-redux';
import {setScannedDevices} from '../state/slices/bluetoothSlice';

export const BluetoothEnabledScreen = () => {
  const dispatch = useDispatch();
  const scannedDevices = useSelector(state => state.bluetooth.scannedDevices);
  const connectedDevices = useSelector(
    state => state.bluetooth.connectedDevices,
  );
  const allDevices = [...connectedDevices, ...scannedDevices];
  const openDrawer = useSelector(state => state.drawer.openDrawer);
  const isDeviceDrawerOpen = openDrawer === 'right';

  // runs and stops scan automatically when app opens or closes
  useEffect(() => {
    if (isDeviceDrawerOpen) {
      startDeviceScan(dispatch, scannedDevices, connectedDevices);
    } else {
      dispatch(setScannedDevices([]));
      bleManager.stopDeviceScan();
    }
    return () => {
      bleManager.stopDeviceScan();
    };
  }, [isDeviceDrawerOpen, connectedDevices]);

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.values(allDevices)}
        extraData={[allDevices]}
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
