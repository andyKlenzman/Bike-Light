import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {
  startBluetoothCommunication,
  stopBluetoothCommunication,
} from '../utils/Bluetooth/startBluetoothCommunication';
import {useContext, useState} from 'react';
import Context from '../state/Context';
import readSensors from '../utils/Sensors';

const SettingsMain = () => {
  const {btState} = useContext(Context);
  const [isSendingSignals, setIsSendingSignals] = useState(false);
  const {
    RotationSensor,
    AccelerometerSensor,
    GyroscopeSensor,
    GravitySensor,
    MagneticSensor,
  } = readSensors();
  // passing isSendingSignals state to communication functions, so can cleanup the formatting of the button if there is an error
  return (
    <View style={styles.container}>
      {isSendingSignals ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => stopBluetoothCommunication(setIsSendingSignals)}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await startBluetoothCommunication(
              btState.connectedDevices,
              setIsSendingSignals,
              isSendingSignals,
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
