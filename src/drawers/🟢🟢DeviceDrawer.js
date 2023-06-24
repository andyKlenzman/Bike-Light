import { View, TouchableOpacity} from 'react-native';
import {DrawerStyles} from './DrawerStyles';
import BluetoothPairing from '../components/🟢🟢BluetoothPairing';
const DeviceDrawer = () => {
  return (
    <View style={DrawerStyles.drawerContainer}>
      <TouchableOpacity style={DrawerStyles.overlay} />
      <View style={DrawerStyles.rightDrawer}>
        <BluetoothPairing />
      </View>
    </View>
  );
};

export default DeviceDrawer;
