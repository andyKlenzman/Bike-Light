import {BleManager} from 'react-native-ble-plx';

export const bleManager = new BleManager({
  restoreStateIdentifier: 'bleManagerRestoredState',
  restoreStateFunction: (bleRestoredState) => {
    if (bleRestoredState == null) {
      // BleManager was constructed for the first time.
      console.log('NULL BT STATE');
    } else {
      console.log('BT STATE RESTORED', bleRestoredState);

      // BleManager was restored. Check `bleRestoredState.connectedPeripherals` property.
    }
  },
});
