import {bleManager} from './bluetoothManager';
import {setScannedDevices} from '../../state/slices/bluetoothSlice';

/*
 * Thunk that scans for connectable and unique bluetooth devices and stores them in an array of objects
 */

export const startDeviceScan = (dispatch, scannedDevices, connectedDevices) => {
  let updatedScannedDevices = scannedDevices;
  let updatedConnectedDevices = connectedDevices;
  bleManager.startDeviceScan(null, null, (error, discoveredDevice) => {
    if (error) {
      console.error('Error in startDeviceScan.js. Try again : ', error);
      return;
    }
    // filters devices that are duplicates, unconnectable, and or already connected
    if (discoveredDevice.isConnectable) {
      let isDuplicate = false;
      let isConnected = false;
      let isAuthorizedDevice = false;

      isDuplicate = updatedScannedDevices.some(item => {
        return item.id === discoveredDevice.id;
      });
      isConnected = updatedConnectedDevices.some(item => {
        return item.id === discoveredDevice.id;
      });
      isAuthorizedDevice = discoveredDevice.name === 'Lightbender';

      if (!isDuplicate && !isConnected && isAuthorizedDevice) {
        //device data ensures only needed data is being added to state in a serialized state
        const deviceData = {
          id: discoveredDevice.id,
          name: discoveredDevice.name,
        };

        updatedScannedDevices = [...updatedScannedDevices, deviceData];
        dispatch(setScannedDevices(updatedScannedDevices));
      }
    }
  });
};

/**
 *
 *
 *
 * Some pseud code
 *
 * scan device{
 * add to array
 * }
 * if(array changes ){
 * perform cleaning functions like checking against connected and duplicates, then push to state. }
 *
 *
 * create an action which will do the cleaning, triggered when start device scan triggers a useEffect by adding to the array
 */
