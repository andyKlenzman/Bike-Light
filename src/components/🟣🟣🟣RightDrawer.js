import {View} from 'react-native';
import {DrawerStyles} from '../styles/DrawerStyles';
import BluetoothPairing from './🟢🟢RenderBluetoothScreen';
import {useDispatch} from 'react-redux';
import {ListItem} from './🟡ListItem';
const RightDrawer = () => {
  const dispatch = useDispatch();

  return (
    <View style={DrawerStyles.drawerContainer}>
      <View style={DrawerStyles.drawer}>
        <BluetoothPairing />
        {/* <ListItem icon="plus" type="purchase" title="Purchase lights" center /> */}
      </View>
    </View>
  );
};

export default RightDrawer;
