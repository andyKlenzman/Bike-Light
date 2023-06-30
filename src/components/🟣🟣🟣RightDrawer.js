import {View, TouchableOpacity} from 'react-native';
import { DrawerStyles } from '../styles/DrawerStyles';
import BluetoothPairing from './🟢🟢RenderBluetoothScreen';
import {useDispatch} from 'react-redux';

const RightDrawer = () => {
  const dispatch = useDispatch();

  return (
    <View style={DrawerStyles.drawerContainer}>
      <View style={DrawerStyles.drawer}>
        <BluetoothPairing />
      </View>
    </View>
  );
};

export default RightDrawer;
