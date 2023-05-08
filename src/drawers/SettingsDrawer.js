import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import Context from '../state/Context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Dimensions} from 'react-native';

const SettingsDrawer = () => {
  const {drawerState, setDrawerState} = useContext(Context);
  const screenWidth = Dimensions.get('window').width;
  const leftDrawerX = useSharedValue(-screenWidth);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: leftDrawerX.value}],
    };
  });

  useEffect(() => {
    leftDrawerX.value = withTiming(
      drawerState.isSettingsDrawerOpen ? 0 : -screenWidth,
      {duration: 200},
    );
  }, [drawerState.isSettingsDrawerOpen]);

  return (
    <Animated.View style={[styles.drawerContainer, animatedStyles]}>
      <TouchableOpacity
        style={styles.overlay}
        onPress={() =>
          setDrawerState({...drawerState, isSettingsDrawerOpen: false})
        }
      />
      <View style={styles.leftDrawer}>
        <Text style={styles.content}>Settings Content</Text>
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
