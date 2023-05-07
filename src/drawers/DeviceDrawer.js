import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import Context from '../state/Context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Dimensions} from 'react-native';
import BluetoothMain from '../components/🟣🟣🟣 BluetoothMain';
const DeviceDrawer = () => {
  const {drawerState, setDrawerState} = useContext(Context);
  const screenWidth = Dimensions.get('window').width;
  const rightDrawerX = useSharedValue(screenWidth);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: rightDrawerX.value}],
    };
  });

  useEffect(() => {
    rightDrawerX.value = withTiming(
      drawerState.isDeviceDrawerOpen ? 0 : screenWidth,
      {duration: 200},
    );
  }, [drawerState.isDeviceDrawerOpen]);

  return (
    <Animated.View style={[styles.drawerContainer, animatedStyles]}>
      <TouchableOpacity
        style={styles.overlay}
        onPress={() =>
          setDrawerState({...drawerState, isDeviceDrawerOpen: false})
        }
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
