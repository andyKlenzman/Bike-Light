/*
 * Scans for connectable and unique bluetooth devices and stores them in an array of objects
 */
import {bleManager} from './bluetoothManager';

export const startDeviceScan = async (btState, setBtState) => {
  let updatedScannedDevices = [];
  bleManager.startDeviceScan(null, null, (error, discoveredDevice) => {
    if (error) {
      console.log('Scan error', error);
      return;
    }
    // filters devices that are duplicates and not connectable
    if (discoveredDevice.isConnectable) {
      let isDuplicate = false;
      if (btState.scannedDevices) {
        isDuplicate = updatedScannedDevices.some(item => {
          return item.id === discoveredDevice.id;
        });
      }
      if (!isDuplicate) {
        updatedScannedDevices = [...updatedScannedDevices, discoveredDevice];
        setBtState({...btState, scannedDevices: updatedScannedDevices});
      }
    }
  });
  setTimeout(() => {
    bleManager.stopDeviceScan();
  }, 3000);
};
