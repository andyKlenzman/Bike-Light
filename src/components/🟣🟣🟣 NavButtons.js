import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Context from '../state/Context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const NavButtons = () => {
  const {globalState, setGlobalState} = useContext(Context);
  const deviceButtonX = useSharedValue(-60);
  const settingsButtonX = useSharedValue(0);

  const animatedStylesDeviceButton = useAnimatedStyle(() => {
    return {
      transform: [{translateX: deviceButtonX.value}],
    };
  });

  const animatedStylesSettingsButton = useAnimatedStyle(() => {
    return {
      transform: [{translateX: settingsButtonX.value}],
    };
  });

  useEffect(() => {
    deviceButtonX.value = withTiming(
      globalState.isDeviceDrawerOpen || globalState.isSettingsDrawerOpen
        ? 100
        : -60,
      {duration: 200},
    );

    settingsButtonX.value = withTiming(
      globalState.isDeviceDrawerOpen || globalState.isSettingsDrawerOpen
        ? -100
        : 0,
      {duration: 200},
    );
  }, [globalState.isDeviceDrawerOpen, globalState.isSettingsDrawerOpen]);

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStylesSettingsButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setGlobalState({...globalState, isSettingsDrawerOpen: true})
          }>
          <Icon name="cog" size={30} color="#00c3ff" style={styles.icon} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={animatedStylesDeviceButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setGlobalState({...globalState, isDeviceDrawerOpen: true})
          }>
          <Icon
            name="bluetooth"
            size={30}
            color="#00c3ff"
            style={styles.icon}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default NavButtons;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 45,
  },
  button: {
    backgroundColor: 'black',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#00c3ff',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
});
