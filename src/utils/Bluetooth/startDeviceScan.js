import {bleManager} from './bluetoothManager';
import {
  addScannedDevice,
  setScannedDevices,
} from '../../state/slices/bluetoothSlice';

/*
 * Thunk that scans for connectable and unique bluetooth devices and stores them in an array of objects
 */

export const startDeviceScan = async (dispatch, scannedDevices, connectedDevices) => {
  let updatedScannedDevices = scannedDevices;
  bleManager.startDeviceScan(null, null, (error, discoveredDevice) => {
    if (error) {
      console.error('Error in startDeviceScan.js. Try again : ', error);
      return;
    }
    // filters devices that are duplicates, unconnectable, and or already connected
    if (discoveredDevice.isConnectable) {
      let isDuplicate = false;

      isDuplicate = updatedScannedDevices.some(item => {
        return item.id === discoveredDevice.id;
      });
      isConnected = connectedDevices.some(item => {
        return item.id === discoveredDevice.id;
      });
      console.log('isDuplicate & isConnected in startDeviceScan: ', isDuplicate, isConnected);
      if (!isDuplicate && !isConnected) {
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

// setTimeout(() => {
//   bleManager.stopDeviceScan();
// }, 3000);
