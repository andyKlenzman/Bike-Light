import {sendDataToBluetooth} from './sendDataToBluetooth';
import readSensors from '../Sensors';
import {transformSensorDataForBluetooth} from '../transformSensorDataForBluetooth';
import { sleep } from '../sleep';
/*
facilitates bluetooth communication, reads sensors
*/
let timeoutID;

let runBluetooth = false;
export const startBluetoothCommunication = async (
  connectedDevices,
  setIsSendingSignals,
  isSendingSignals,
  RotationSensor,
  AccelerometerSensor,
  GyroscopeSensor,
  GravitySensor,
  MagneticSensor,
) => {
  try {
    if (connectedDevices.length === 0)
      throw new Error(
        'No device found. Connect to Bluetooth device to send data.',
      );
    setIsSendingSignals(true); //toggles UI button
    runBluetooth = true;

    while (runBluetooth) {
      try {
        const data = transformSensorDataForBluetooth(
          RotationSensor,
          AccelerometerSensor,
          GyroscopeSensor,
          GravitySensor,
          MagneticSensor,
        );

        await sendDataToBluetooth(data, connectedDevices[0]);
        // await sleep(1000);
      } catch (error) {
        console.error('Error occurred while sending data to Bluetooth:', error);
        runBluetooth = false;
        stopBluetoothCommunication(setIsSendingSignals);
      }
    }
    //toggles button

    // I wonder if set interval is causing the delay, maybe a loop would be better
  } catch (error) {
    setIsSendingSignals(false);

    console.error(
      'Something went wrong in startBluetoothCommunication.js',
      error,
    );
    stopBluetoothCommunication(setIsSendingSignals);
  }
};

export const stopBluetoothCommunication = setIsSendingSignals => {
  runBluetooth = false;
  setIsSendingSignals(false);
};

// intervalID = setInterval(async () => {
//   try {
//     const data = transformSensorDataForBluetooth(
//       RotationSensor,
//       AccelerometerSensor,
//       GyroscopeSensor,
//       GravitySensor,
//       MagneticSensor,
//     );
//     await sendDataToBluetooth(data, connectedDevices[0]);
//   } catch (error) {
//     console.error('Error occurred while sending data to Bluetooth:', error);
//     stopBluetoothCommunication(setIsSendingSignals);
//   }
// }, 1);

// clearInterval(intervalID);

// let intervalID;
