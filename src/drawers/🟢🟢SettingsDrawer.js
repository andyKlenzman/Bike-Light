import {View, TouchableOpacity} from 'react-native';

import SettingsMain from '../components/🟣🟣🟣SettingsMain';

import {useDispatch} from 'react-redux';
import {DrawerStyles} from './DrawerStyles';

const SettingsDrawer = () => {
  return (
    <View style={DrawerStyles.drawerContainer}>
      <TouchableOpacity style={DrawerStyles.overlay} />
      <View style={DrawerStyles.leftDrawer}>
        <SettingsMain />
      </View>
    </View>
  );
};

export default SettingsDrawer;
