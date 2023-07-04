import {Text, View, StyleSheet, FlatList} from 'react-native';
import {useEffect, useState} from 'react';
import EmptyList from './🟡EmptyList';
import {RenderScannedBluetoothItem} from './🟢🟢RenderScannedBluetoothItem';
import {bleManager} from '../utils/Bluetooth/bluetoothManager';
import {startDeviceScan} from '../utils/Bluetooth/startDeviceScan';
import {useDispatch, useSelector} from 'react-redux';
import {setScannedDevices} from '../state/slices/bluetoothSlice';
import {ListItem} from './🟡ListItem';
import ItemSeperator from './🟡ItemSeperator';
import PlaceholderItem from './PlaceholderItem';
import { PurchaseTile } from './🟡PurchaseTile';
export const BluetoothEnabledScreen = () => {
  const dispatch = useDispatch();
  const scannedDevices = useSelector(state => state.bluetooth.scannedDevices);
  const connectedDevices = useSelector(
    state => state.bluetooth.connectedDevices,
  );
  const isDeviceAvailable =
    scannedDevices.length > 0 && connectedDevices.length > 0;
  const allDevices = [...connectedDevices, ...scannedDevices];
  const openDrawer = useSelector(state => state.drawer.openDrawer);
  const isDeviceDrawerOpen = openDrawer === 'right';

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
      <PurchaseTile />
      <ItemSeperator />

      <FlatList
        data={Object.values(allDevices)}
        extraData={[allDevices]}
        keyExtractor={item => item.id}
        style={styles.list}
        renderItem={({item}) => <RenderScannedBluetoothItem item={item} />}
        ListEmptyComponent={PlaceholderItem}
        inverted
        scrollEnabled={false}
        ItemSeparatorComponent={ItemSeperator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  list: {
    // backgroundColor: 'red',
    flexGrow: 0,
  },
});
