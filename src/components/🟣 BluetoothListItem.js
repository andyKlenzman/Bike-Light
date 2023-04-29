import {Text, TouchableOpacity} from 'react-native';

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
