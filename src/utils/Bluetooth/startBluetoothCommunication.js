import {sendDataToBluetooth} from './sendDataToBluetooth';
import {transformSensorDataForBluetooth} from '../transformSensorDataForBluetooth';
import {setIsSendingSignal} from '../../state/slices/bluetoothSlice';
import {sleep} from '../sleep';
/*
facilitates bluetooth communication, reads sensors
*/

let runBluetooth = false;
export const startBluetoothCommunication = async (
  dispatch,
  connectedDevices,
  RotationSensor,
  AccelerometerSensor,
  GyroscopeSensor,
  GravitySensor,
  MagneticSensor,
) => {
  try {
    if (connectedDevices.length === 0) {
      throw new Error(
        'No device found. Connect to Bluetooth device to send data.',
      );
    }

    dispatch(setIsSendingSignal(true)); //toggles UI button
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
        stopBluetoothCommunication(dispatch);
      }
    }
    //toggles button

    // I wonder if set interval is causing the delay, maybe a loop would be better
  } catch (error) {
    console.error(
      'Something went wrong in startBluetoothCommunication.js',
      error,
    );
    stopBluetoothCommunication(dispatch);
  }
};

export const stopBluetoothCommunication = dispatch => {
  runBluetooth = false;
  dispatch(setIsSendingSignal(false));
};
