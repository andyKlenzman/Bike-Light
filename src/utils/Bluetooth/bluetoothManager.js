import {BleManager} from 'react-native-ble-plx';

export const bleManager = new BleManager({
  restoreStateIdentifier: 'bleManagerRestoredState',
  restoreStateFunction: (bleRestoredState) => {
    if (bleRestoredState == null) {
      // BleManager was constructed for the first time.
      console.log('IN BLE MANAGER: NULL BT STATE');
    } else {
      console.log('IN BLE MANAGER: BT STATE RESTORED', bleRestoredState);
      //do I need to redeclare state here in order to keep shit up and running?

      // when in suspended mode, this quese the events. 

      // BleManager was restored. Check `bleRestoredState.connectedPeripherals` property.

      //checkout source coed to see how background is extended with API 
    }

  },
});


/**
 * 
 * can notify user when it disconnects?
 */