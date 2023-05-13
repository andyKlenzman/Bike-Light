import {bleManager} from './bluetoothManager';

/*
sends data over bt

Notes 
- How will connected devices or multilpe connected devices be handled?
- I will build the most basic thing, then move up from there. 
*/
export const sendDataToBluetooth = async (data, device) => {
  const Buffer = require('buffer').Buffer;
  const buffer = Buffer.from(data, 'utf-8');

  bleManager.writeCharacteristicWithResponseForDevice(
    device.id,
    device.serviceUUID,
    device.characteristicUUID,
    buffer,
  );

  console.log('data sent');
  console.log(
    data,
    device.id,
    device.serviceUUID,
    device.characteristicUUID,
    buffer,
  );
};
