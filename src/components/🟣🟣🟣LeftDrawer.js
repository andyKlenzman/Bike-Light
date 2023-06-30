import {View, TouchableOpacit, Text} from 'react-native';
import { DrawerStyles } from '../styles/DrawerStyles';

const LeftDrawer = () => {
  return (
    <View style={DrawerStyles.drawerContainer}>
      <View style={DrawerStyles.drawer}>
        <Text>Settings</Text>
      </View>
    </View>
  );
};

export default LeftDrawer;
