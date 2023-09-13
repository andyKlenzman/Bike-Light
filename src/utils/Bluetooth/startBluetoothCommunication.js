import {sendDataToBluetooth} from './sendDataToBluetooth';
import {transformSensorDataForBluetooth} from '../transformSensorDataForBluetooth';
import {setIsSendingSignal} from '../../state/slices/bluetoothSlice';
import KeepAwake from 'react-native-keep-awake';
import {changeCurtainStateAndContent} from '../../state/slices/curtainSlice';
import {curtainVals} from '../../state/config/curtainState';
/*
sends sensor data to peripheral bluetooth
*/

let runBluetooth = false;
export const startBluetoothCommunication = async (
  dispatch,
  lightModeKey,
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

    dispatch(setIsSendingSignal(true));
  

    //toggles UI button
    runBluetooth = true; //toggles while loop
    KeepAwake.activate(); //keeps screen awake while sending data to avoid app going to background mode

    while (runBluetooth) {
      try {
        const transformedData = transformSensorDataForBluetooth(
          lightModeKey,
          RotationSensor,
        );

        await sendDataToBluetooth(transformedData, connectedDevices[0]); //
        // await sleep(1000);
      } catch (error) {
        console.error('Error occurred while sending data to Bluetooth:', error);
        runBluetooth = false;
        stopBluetoothCommunication(dispatch);
      }
    }
  } catch (error) {
    console.error(
      'Something went wrong in startBluetoothCommunication.js',
      error,
    );
    stopBluetoothCommunication(dispatch);
  }
};

export const stopBluetoothCommunication = dispatch => {
  runBluetooth = false; // turn off while loop
  KeepAwake.deactivate(); // allow screen to sleep
  dispatch(setIsSendingSignal(false)); // tell the rest of the app that communication has stopped
};
