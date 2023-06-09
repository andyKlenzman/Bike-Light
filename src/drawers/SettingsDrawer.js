import React, {useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Dimensions} from 'react-native';
import SettingsMain from '../components/🟣🟣🟣SettingsMain';

import {useSelector, useDispatch} from 'react-redux';
import {toggleSettingsDrawer} from '../state/slices/drawerSlice';

const SettingsDrawer = () => {
  const dispatch = useDispatch();

  // update UI state
  const handleToggleSettingsDrawer = () => {
    dispatch(toggleSettingsDrawer());
  };

  // Query UI state
  const isSettingsDrawerOpen = useSelector(
    state => state.drawer.isSettingsDrawerOpen,
  );

  const screenWidth = Dimensions.get('window').width;
  const leftDrawerX = useSharedValue(-screenWidth);

  useEffect(() => {
    leftDrawerX.value = withTiming(isSettingsDrawerOpen ? 0 : -screenWidth, {
      duration: 200,
    });
  }, [isSettingsDrawerOpen]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: leftDrawerX.value}],
    };
  });

  return (
    <Animated.View style={[styles.drawerContainer, animatedStyles]}>
      <TouchableOpacity
        style={styles.overlay}
        onPress={handleToggleSettingsDrawer}
      />
      <View style={styles.leftDrawer}>
        <SettingsMain />
      </View>
    </Animated.View>
  );
};

export default SettingsDrawer;

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

  leftDrawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '50%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
