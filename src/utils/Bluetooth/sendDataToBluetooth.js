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
    const jsonString = JSON.stringify(data)
    const base64Data = encode(jsonString);


    // going to test if I can use this function instead so I can go with storing less information in the state and make sure it iss serializavane
    // const response = await device.writeWithResponse(base64Data);
    const response = await bleManager.writeCharacteristicWithResponseForDevice()(base64Data);
    // console.log('SENT   ', data.rotX);
  } catch (error) {
    throw error;
  }
};
