import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {connectToDevice} from '../utils/Bluetooth/connectToDevice';

export const RenderScannedItem = ({item, btState, setBtState}) => {
  let isConnected = btState.connectedDevices.some(device => {
    return device.deviceID === item.id;
  });

  const backgroundColor = item.id === btState.isLoading ? '#3B3B3D' : '#1C1C1E';
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
  <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={[styles.item, {backgroundColor}]}>
    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>{item.name ? item.name : item.id}</Text>
    <Text style={styles.subtitle}>{connectionStatus}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
    backgroundColor: '#1B1B1B'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    fontSize: 15,
    backgroundColor: '#1C1C1E',
    marginBottom: 10,
    borderRadius: 8,
  },
});