import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {
  startBluetoothCommunication,
  stopBluetoothCommunication,
} from '../utils/Bluetooth/startBluetoothCommunication';
import {useContext} from 'react';
import Context from '../state/Context';
const SettingsMain = () => {
  const {btState} = useContext(Context);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={async () =>
          await startBluetoothCommunication(btState.connectedDevices)
        }>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => stopBluetoothCommunication()}>
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>
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
