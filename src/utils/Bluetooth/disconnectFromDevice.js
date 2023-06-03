import {bleManager} from './bluetoothManager';
import {removeData} from '../AsyncStorage/removeData';

export const disconnectFromDevice = async (device, btState, setBtState) => {
  console.log(`Disconnecting from ${device.name ? device.name : device.id}`);
  try {
    const deviceDisconnectPromise = await bleManager.cancelDeviceConnection(
      device.id,
    );
    await removeData('connectedDevices');
  } catch (error) {
    console.error('Error disconnecting from device:', error);
    await removeData('connectedDevices');
  }
};
