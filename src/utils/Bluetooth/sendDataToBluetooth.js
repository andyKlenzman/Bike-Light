import {bleManager} from './bluetoothManager';
import {encode} from 'base-64';

/*
sends data over bt, propogates error to caller
*/

export const sendDataToBluetooth = async (data, device) => {
  try {
    if (!device)
      throw new Error(
        'No device found. Connect to Bluetooth device to send data.',
      );
    if (!data)
      throw new Error('No motion data found. Restart app and try again');

    const base64Data = encode(data.rotX);
    const response = await device.writeWithResponse(base64Data);
    console.log('SENT   ', data.rotX);
  } catch (error) {
    console.error('Error in sendDataToBluetooth', error);
  }
};
