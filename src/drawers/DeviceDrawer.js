import React, {useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Dimensions} from 'react-native';
import BluetoothMain from '../components/🟣🟣🟣 BluetoothMain';
import {useSelector, useDispatch} from 'react-redux';
import {toggleDeviceDrawer} from '../state/slices/drawerSlice';

const DeviceDrawer = () => {
  const screenWidth = Dimensions.get('window').width;
  const rightDrawerX = useSharedValue(screenWidth);
  const dispatch = useDispatch();

  // update UI state
  const handleToggleDeviceDrawer = () => {
    dispatch(toggleDeviceDrawer());
  };

  // Query UI state
  const isDeviceDrawerOpen = useSelector(
    state => state.drawer.isDeviceDrawerOpen,
  );

  // animate drawer on state change
  useEffect(() => {
    rightDrawerX.value = withTiming(isDeviceDrawerOpen ? 0 : screenWidth, {
      duration: 200,
    });
  }, [isDeviceDrawerOpen]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: rightDrawerX.value}],
    };
  });

  return (
    <Animated.View style={[styles.drawerContainer, animatedStyles]}>
      <TouchableOpacity
        style={styles.overlay}
        onPress={handleToggleDeviceDrawer}
      />
      <View style={styles.rightDrawer}>
        <BluetoothMain />
      </View>
    </Animated.View>
  );
};

export default DeviceDrawer;

const styles = StyleSheet.create({
  drawerContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  rightDrawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: '75%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
