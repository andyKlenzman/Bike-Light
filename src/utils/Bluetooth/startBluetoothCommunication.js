import {sendDataToBluetooth} from './sendDataToBluetooth';
import readSensors from '../Sensors';

let intervalID;

export const startBluetoothCommunication = async connectedDevices => {
  console.log("devices", connectedDevices);
  intervalID = setInterval(() => {
    if (!connectedDevices) {
      console.log('connect to device ');
      clearInterval(intervalID);
    } else {
      console.log('RotationSensor.segrewgrewgrewgrensor.value.yaw: ');
      console.log(connectedDevices);
      let data = 'hey';

      sendDataToBluetooth(data, connectedDevices[0]);
    }
  }, 1000);
};

export const stopBluetoothCommunication = () => {
  clearInterval(intervalID);
};
