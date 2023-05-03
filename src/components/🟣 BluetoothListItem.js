import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import { connectToDevice } from '../utils/Bluetooth/connectToDevice';


export const RenderScannedItem = ({item, btState, setBtState}) => {

  let isConnected = btState.connectedDevices.some(device => {
    return device.deviceID === item.id;
  });

  const backgroundColor = item.id === btState.isLoading ? 'grey' : 'blue';
  const color = 'white';
  const connectionStatus =
    item.id === btState.isLoading
      ? 'Loading'
      : isConnected
      ? 'Connected'
      : 'Not Connected';

  return (
    <BluetoothListItem
      item={item}
      connectionStatus={connectionStatus}
      onPress={() => connectToDevice(item, btState, setBtState)}
      backgroundColor={backgroundColor}
      textColor={color}
    />
  );
};

export const BluetoothListItem = ({
  item,
  connectionStatus,
  onPress,
  backgroundColor,
  textColor,
}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>
      {item.name ? item.name : item.id} {connectionStatus}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 15,
  },
  button: {
    backgroundColor: '#1E6738',
  },
});
