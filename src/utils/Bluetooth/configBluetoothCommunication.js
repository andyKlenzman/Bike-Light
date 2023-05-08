// write a js function that reads essentuial bluetooth data from its parameters and calls snedDataToBluetooth with a setInterval that takes a variable that is the data to be sent
import readSensors from '../Sensors';
import {sendDataToBluetooth} from './sendDataToBluetooth';

export const configBluetoothCommunication = async (
  bleManager,
  connectedDevices,
) => {
  const intervalID = setInterval(() => {
    
    console.log(
      'RotationSensor.sensor.value.yaw: ',
      RotationSensor.sensor.value.yaw,
    );
  }, 1000);
};
