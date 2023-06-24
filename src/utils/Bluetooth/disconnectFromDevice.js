import {bleManager} from './bluetoothManager';

export const disconnectFromDevice = async (device, btState, setBtState) => {
  console.log(`Disconnecting from ${device.name ? device.name : device.id}`);
  try {
    const deviceDisconnectPromise = await bleManager.cancelDeviceConnection(
      device.id,
    );
  } catch (error) {
    console.error('Error disconnecting from device:', error);
  }
};
