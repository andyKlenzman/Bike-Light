import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import NavButtons from '../components/NavButtons';
import SettingsDrawer from '../drawers/SettingsDrawer';
import DeviceDrawer from '../drawers/DeviceDrawer';
import Context from '../state/Context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';



const MainScreen = () => {
  const {globalState} = useContext(Context);
  console.log(globalState.isSettingsDrawerOpen);
  return (
    <View>
      <NavButtons />
      {globalState.isSettingsDrawerOpen && <SettingsDrawer />}
      {globalState.isDeviceDrawerOpen && <DeviceDrawer />}
    </View>
  );
};

export default MainScreen;

// const styles = StyleSheet.create({});
