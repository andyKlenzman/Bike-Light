import {bleManager} from './bluetoothManager';
import {extractWriteWithoutResponseChar} from './extractWriteWithoutResponseChar';
import {sortConnectedDevicesFirst} from './sortConnectedDevicesFirst';

/*
Connect to BT device, update state.

Doing:
  - Ensure connectedDevices state updates when a device connects or disconnects

Check: 
  - Ensure that the render item says connected
  - See if sorting function works once able to connect to devices

To-do:
  - How does BT connection work while interacting with the UI 
  - Find out why global BT state did not update until a manual rerender
  - Add a timeout to the connection process

ST NOTES:
  - updated Connected devices is blank, even though we already added wims, need to figure that out. 

LT Notes:
  - 

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
    const writeWithoutResponseChar = await extractWriteWithoutResponseChar(
      deviceData,
    );

    // Check if the device is already connected.
    let updatedConnectedDevices = btState.connectedDevices;
    console.log(
      'updatedConnectedDevices before checking if it is a duplicate: ',
      updatedConnectedDevices,
    );
    console.log('device being connected to: ', device.id);
    let isDuplicate = updatedConnectedDevices.some(connectedDevice => {
      return connectedDevice.deviceID === device.id;
    });

    // Step 4 - If the device is unique, add it's characteristics to the array of connected devices.
    if (!isDuplicate) {
      updatedConnectedDevices = [
        ...updatedConnectedDevices,
        writeWithoutResponseChar,
      ];

      //Step 5 - Sort array of device so connected devices appear at the top of the array of devices
      let sortedScannedDevices = btState.scannedDevices;
      sortedScannedDevices.sort(
        sortConnectedDevicesFirst(updatedConnectedDevices),
      );
      setBtState({...btState, connectedDevices: updatedConnectedDevices});
      console.log(
        'connectedDevices',
        updatedConnectedDevices,
        btState.connectedDevices,
      );

      //Step 6 - Set up a listener, so if the device disconnects, remove it from connectedDevices and sort connected to top of array of devices.

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
    setBtState({...btState, isLoading: ''});
  } catch (e) {
    setBtState({...btState, isLoading: ''});
    console.log('Connection error: ', e);
  }
};
