import {bleManager} from './bluetoothManager';
import {extractWriteCharacteristic} from './extractWriteCharacteristic';
import {sortConnectedDevicesFirst} from './sortConnectedDevicesFirst';

/*
Connect to BT device, sorts array so connected are at top, filters duplicates, handles UI state changes, and loads BT device data to state.
*/

export const connectToDevice = async (device, btState, setBtState) => {
  console.log(`Connecting to ${device.name ? device.name : device.id}`);
  try {
    // Set loading state
    setBtState({...btState, isLoading: device.id});

    //  Connect to device and return device data
    const deviceData = await bleManager.connectToDevice(device.id);

    // Extract writeWithoutResponseCharacteristic
    await bleManager.discoverAllServicesAndCharacteristicsForDevice(
      deviceData.id,
    );
    const writeCharacteristic = await extractWriteCharacteristic(deviceData);

    // Check if the device is already connected.
    let updatedConnectedDevices = btState.connectedDevices;

    let isDuplicate = updatedConnectedDevices.some(connectedDevice => {
      return connectedDevice.deviceID === device.id;
    });

    // If the device is unique, add it's characteristics to the array of connected devices.
    if (!isDuplicate) {
      updatedConnectedDevices = [
        ...updatedConnectedDevices,
        writeCharacteristic,
      ];

      //Sort array of device so connected devices appear at the top of the array of devices
      let sortedScannedDevices = btState.scannedDevices;
      sortedScannedDevices.sort(
        sortConnectedDevicesFirst(updatedConnectedDevices),
      );

      // Set up a listener, so if the device disconnects, remove it from connectedDevices and sort connected to top of array of devices.
      bleManager.onDeviceDisconnected(device.id, () => {
        updatedConnectedDevices = btState.connectedDevices;
        updatedConnectedDevices.filter((connectedDevice, index, arr) => {
          if (connectedDevice.deviceID === device.id) {
            arr.splice(index, 1);
            return true;
          }
        });
        setBtState({...btState, connectedDevices: updatedConnectedDevices});
        sortedScannedDevices.sort(
          sortConnectedDevicesFirst(updatedConnectedDevices),
        );
      });
    }
    setBtState({
      ...btState,
      connectedDevices: updatedConnectedDevices,
      isLoading: '',
    });
  } catch (e) {
    setBtState({...btState, isLoading: ''});
    console.log('Connection error: ', e);
  }
};
