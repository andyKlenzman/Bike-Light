import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  startBluetoothCommunication,
  stopBluetoothCommunication,
} from '../utils/Bluetooth/startBluetoothCommunication';
import {useSelector, useDispatch} from 'react-redux';
import readSensors from '../utils/Sensors';

const SettingsMain = () => {
  const dispatch = useDispatch();
  const connectedDevices = useSelector(
    state => state.bluetooth.connectedDevices,
  );
  const isSendingSignal = useSelector(state => state.bluetooth.isSendingSignal);

  const {
    RotationSensor,
    AccelerometerSensor,
    GyroscopeSensor,
    GravitySensor,
    MagneticSensor,
  } = readSensors();

  return (
    <View style={styles.container}>
      {isSendingSignal ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => stopBluetoothCommunication(dispatch)}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await startBluetoothCommunication(
              connectedDevices,
              dispatch,
              RotationSensor,
              AccelerometerSensor,
              GyroscopeSensor,
              GravitySensor,
              MagneticSensor,
            );
          }}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SettingsMain;
const styles = StyleSheet.create({
  // styles for a button to enable scanning that fit with our navButtons
  button: {
    backgroundColor: 'black',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    position: 'absolute',
    bottom: 0,
    shadowColor: '#00c3ff',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    left: '0%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  container: {
    flex: 1,
  },
});
