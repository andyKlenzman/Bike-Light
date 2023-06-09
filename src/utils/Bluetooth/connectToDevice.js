import {bleManager} from './bluetoothManager';
import {extractWriteCharacteristic} from './extractWriteCharacteristic';
import {sortConnectedDevicesFirst} from './sortConnectedDevicesFirst';
import {
  setIsLoading,
  setConnectedDevices,
  deleteScannedDevice,
} from '../../state/slices/bluetoothSlice';
/*
Connect to BT device, sorts array so connected are at top, filters duplicates, handles UI state changes, and loads BT device datsa to state.
*/

export const connectToDevice = async (
  device,
  dispatch,
  connectedDevices,
  scannedDevices,
) => {
  console.log(`Connecting to ${device.name ? device.name : device.id}`);
  try {
    dispatch(setIsLoading(device.id));

    //  Connect to device and return device data, or return an error after timeout
    const deviceDataPromise = bleManager.connectToDevice(device.id);

    const deviceData = await Promise.race([
      deviceDataPromise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Connection timeout')), 10000),
      ),
    ]);

    // Extract writeWithoutResponseCharacteristic
    // I can condense these two functions together and do this all in one step.
    await bleManager.discoverAllServicesAndCharacteristicsForDevice(
      deviceData.id,
    );
    const writeCharacteristic = await extractWriteCharacteristic(deviceData);
    if (!writeCharacteristic) throw new Error('Service not found');

    // If the device is unique, add it's characteristics to the array of connected devices.

    const updatedConnectedDevices = connectedDevices;
    const newConnectedDeviceData = {
      id: writeCharacteristic.deviceID,
      serviceUUID: writeCharacteristic.UUID,
      characteristicUUID: writeCharacteristic.characteristicUUID,
      name: writeCharacteristic.name,
    };

    if (!isDuplicate) {
      updatedConnectedDevices = [
        ...updatedConnectedDevices,
        newConnectedDeviceData,
      ];

      dispatch(setConnectedDevices(updatedConnectedDevices));
      dispatch(deleteScannedDevice(newConnectedDeviceData.id))

      // Set up a listener, so if the device disconnects, remove it from connectedDevices and sort connected to top of array of devices.
      bleManager.onDeviceDisconnected(device.id, async () => {
        try {
          updatedConnectedDevices = connectedDevices;
          updatedConnectedDevices.filter((connectedDevice, index, arr) => {
            if (connectedDevice.deviceID === device.id) {
              arr.splice(index, 1);
              return true;
            }
          });
          dispatch(setConnectedDevices(updatedConnectedDevices));
        } catch (error) {
          console.error(error);
        }
      });
    }

    dispatch(setIsLoading(''));
  } catch (e) {
    dispatch(setIsLoading(''));
    console.log('Connection error: ', e);
  }
};
