import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useEffect, useCallback} from 'react';
import EmptyList from '../utils/EmptyList';
import {RenderScannedBluetoothItem} from './🟢🟢RenderBluetoothListItem';
import {bleManager} from '../utils/Bluetooth/bluetoothManager';
import {startDeviceScan} from '../utils/Bluetooth/startDeviceScan';
import {useDispatch, useSelector} from 'react-redux';
import {setScannedDevices} from '../state/slices/bluetoothSlice';
import {setAppStatus} from '../state/slices/appStatusSlice';
import {appStatusCodes} from '../state/initialState';
export const BluetoothEnabledScreen = () => {
  const dispatch = useDispatch();
  const scannedDevices = useSelector(state => state.bluetooth.scannedDevices);
  const connectedDevices = useSelector(
    state => state.bluetooth.connectedDevices,
  );
  const allDevices = [...connectedDevices, ...scannedDevices];
  const openDrawer = useSelector(state => state.drawer.openDrawer);
  const isDeviceDrawerOpen = openDrawer === 'right';

  useEffect(() => {
    if (isDeviceDrawerOpen) {
      dispatch(setAppStatus(appStatusCodes.scanForDevice));
    }
  }, [isDeviceDrawerOpen]);
  // runs and stops scan automatically when app opens or closes, starts animation
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
        style={styles.list}
        renderItem={({item}) => <RenderScannedBluetoothItem item={item} />}
        ListEmptyComponent={EmptyList}
        inverted
        reverse={true} //could be bad if have more than 5 lightbenders, but that is not likely and the app prob cpuldnt handle that much communication anyways
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {},
});
